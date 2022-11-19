import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import { APP_PREFIX_PATH } from 'configs/AppConfig';
import { ethers } from "ethers";
import AntiqueAbi from 'abi/antiqueAbi.json'
import Utils from 'utils';
import AdminService from 'services/admin.service';
import ImageService from 'services/image.service';

const { TabPane } = Tabs;
const ADD = 'ADD'
const EDIT = 'EDIT'

const provider = new ethers.providers.Web3Provider(window.ethereum);
const antiqueContractAddress = '0xF20a1F5C271Bb92bd2223fc4c222a0E881138920';
const AntiqueContract =  new ethers.Contract(antiqueContractAddress, AntiqueAbi.abi, provider);

const ProductForm = ({ mode = ADD, param }) => {
	const [form] = Form.useForm();
	const [coinImages, setCoinImages] = useState([{uri: '', loading: false}]);
	const [loading, setLoading] = useState(false);

	const [connectBtnName, setConnectBtnName] = useState('Connect Wallet');
	const [walletAddress,setWalletAddress] = useState();

	useEffect(() => {
    	if(mode === EDIT) {
			const { id } = param
			async function getCoin() {
				const { data } = await AdminService.adminGetCoin(id);
				form.setFieldsValue({ ...data });
				const images = [data.mainImage, ...data.refImages];
				setCoinImages(images.map(image => ({ uri: image, loading: false})));
			}
			getCoin();
		}
  	}, [form, mode, param]);

	useEffect(()=>{
		connectToMetamask();
	})

	const connectToMetamask = async () =>{
		if (window.ethereum) {
			try {
				const accounts = await provider.send("eth_requestAccounts", []);
				const account = accounts[0];
				setWalletAddress(account);
				setConnectBtnName(account.slice(0, 5) + "..." + account.slice(-4));
			}
			catch(reason) {
				console.log(reason);
				message.error("Please login MetaMask!");
			};
		} else {
			message.error("Please Install MetaMask!");
		}
	}

	const addCoinImage = () => {
		if(coinImages.length >= 5) {
			message.error("画像は最大5枚までです。");
			return;
		}
		setCoinImages([...coinImages, { uri: '', loading: false }]);
	}

	const removeCoinImage = (index) => {
		coinImages.splice(index, 1);
		setCoinImages([...coinImages]);
	}

	const handleUploadChange = (e, idx) => {
		let images = coinImages;
		images[idx] = { loading: true }
		setCoinImages([...images]);
		try {
			Utils.getBase64(e.file.originFileObj, async (base64) => {
				const { data } = await ImageService.upload(base64);
				let images = coinImages;
				images[idx] = {uri: data.uri, loading: false}
				setCoinImages([...images]);
			})
		} catch (err) {
			message.error('エラーが発生しました。');
		}
	};

	const onSubmit = () => {
		const images = []
		coinImages.forEach(image => {
			if(image.uri) images.push(image)
		})
		if(images.length === 0){
			message.error('1枚以上の画像を入力してください');
			return false;
		}

		form.validateFields()
		.then(async (values) => {
			if( !walletAddress ) { 
				message.error("Please connect wallet!");
				return false;
			}
			setLoading(true)
			let admin = AdminService.getCurrentAdmin();
			values = { 
				...values,
				extra: {
					coinImages: images, 
					ownerID: admin._id, 
					wallet: walletAddress, 
					role: admin.role
				}
			}
			
			try {
				if (mode === EDIT) {
					const res = await AdminService.adminUpdateCoin(param.id, values);
					window.location.href = `${APP_PREFIX_PATH}/coins/detail/${res.data.coin.id}`;
				} else if(mode === ADD) {
					// Add Coin
					try{
						let mainUri = images[0].uri;
						await AntiqueContract.methods.mint(mainUri, values.totalCount, values.cost).send({from: walletAddress})
						const res = await AdminService.adminAddCoin(values);
						window.location.href = `${APP_PREFIX_PATH}/coins/detail/${res.data.coin.id}`;
					}
					catch (err) {
						console.log('minting was failed')
					}
				}
			} catch (err) {
				setLoading(false);
				message.error("失敗しました。");
			}
		}).catch(() => {
			message.error("「必須」項目を入力する必要があります!");
		});
	};

	return (
		<>
			<Form
				layout="vertical"
				form={form}
				name="advanced_search"
				className="ant-advanced-search-form"
				initialValues={{
					heightUnit: 'cm',
					widthUnit: 'cm',
					weightUnit: 'kg',
					taxRate: 10,
					refPrice: 1000000,
					cost: 10000,
					totalCount: 100
				}}
			>
				<PageHeaderAlt className="border-bottom" overlap>
					<div className="container">
						<Flex className="py-2" mobileFlex={false} justifyContent="between" alignItems="center">
							<h2 className="mb-3">{mode === 'ADD'? 'Add Coin' : `Edit Coin`} </h2>
							<div className="mb-3">
								<Button type="primary mx-2" onClick={onSubmit} htmlType="submit" loading={loading} >
									{mode === 'ADD'? 'Add' : `Save`}
								</Button>
								<Button type="danger" onClick={connectToMetamask}>{connectBtnName}</Button>
							</div>
						</Flex>
					</div>
				</PageHeaderAlt>
				<div className="container">
					<Tabs defaultActiveKey="1" style={{marginTop: 30}}>
						<TabPane tab="General" key="1">
							<GeneralField 
								coinImages={coinImages}
								addCoinImage = {addCoinImage}
								removeCoinImage = {removeCoinImage}
								handleUploadChange={handleUploadChange}
							/>
						</TabPane>
					</Tabs>
				</div>
			</Form>
		</>
	)
}

export default ProductForm
