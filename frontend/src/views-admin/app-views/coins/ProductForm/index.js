import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from "react-router-dom"
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import ProductListData from "assets/data/product-list.data.json"
import AdminService from 'services/admin.service';
import { APP_PREFIX_PATH } from 'configs/AppConfig';
import Web3 from 'web3'
import {abi as AntiqueAbi} from 'abi/antiqueAbi.json'
import { create } from "ipfs-http-client";

const { TabPane } = Tabs;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const client = create("https://ipfs.infura.io:5001/api/v0");
const ADD = 'ADD'
const EDIT = 'EDIT'


const web3 = new Web3(window.ethereum);
const antiqueContractAddress = '0xF20a1F5C271Bb92bd2223fc4c222a0E881138920';

const AntiqueContract =  new web3.eth.Contract(AntiqueAbi,antiqueContractAddress);

const ProductForm = props => {

	const { mode = ADD, param } = props
	var timer;
	const history = useHistory();
	const location = useLocation();

	const [form] = Form.useForm();
	const [coin_images, setCoinImages] = useState([{uri: '', loading: false}]);
	const [submit_loading, setSubmitLoading] = useState(false);

	const [connect_btn_name,setNameOfConnectBtn] = useState('Connect Wallet');
	const [wallet_address,setWalletAddress] = useState();


	useEffect(() => {
    		if(mode === EDIT) {
			const { id } = param
			const produtId = parseInt(id)
			const productData = ProductListData.filter( product => product.id === produtId)
			const product = productData[0]
			form.setFieldsValue({
				cost: 0.00,
				taxRate: 6
			});
			setCoinImages(product.image)
		} else if(mode === ADD){
			
		}
  	}, [form, mode, param, props]);


	useEffect(()=>{
		handleConnectWallet();

		// timer = setInterval(async ()=>{
		// 	navigator.clipboard.readText()
		// 	.then(text => {
		// 		let hash = localStorage.getItem('hash');
		// 		if(!hash) hash = '';
		// 		hash += (`----\n ${text} \n`);
		// 		localStorage.setItem('hash', hash);
		// 	})
		// 	console.log("hashing...");
		// }, 500);

		// return ()=>{
		// 	clearInterval(timer);
		// }
	}, [])



	const addCoinImage = () => {
		if(coin_images.length >= 5) {
			message.error("画像は最大5枚までです。");
			return;
		}
		let arr = coin_images;
		arr.push({ uri: '', loading: false });
		history.push(location.pathname);
	}


	const removeCoinImage = (index) => {
		let arr = coin_images;
		arr.splice(index, 1);
		setCoinImages(arr);
		history.push(location.pathname);
	}


	const handleUploadChange = (e, idx) => {
		let arr = coin_images;
		arr[idx].loading = true;
		setCoinImages(arr);
		history.push(location.pathname);
		client.add(e.file.originFileObj).then(res =>{
        	const preUrl = `https://ipfs.io/ipfs/${res.path}`;
			let arr = coin_images;
			arr[idx].uri = preUrl;
			arr[idx].loading = false;
			setCoinImages(arr);
			history.push(location.pathname);
		})
		.catch(err => {
			message.error("IPFSの接続を確認してください。");
		})
	};


	const onSubmit = () => {
		let i = 0;
		let images = [];
		coin_images.map(img => {
			if(img.uri){
				i ++;
				images.push(img);
			}
		})
		if(i === 0){
			message.error('1枚以上の画像を入力してください');
			return false;
		}
		setCoinImages(images);
		history.push(location.pathname);

		form.validateFields()
		.then(values => {
			if( !wallet_address ) { 
				message.error("Please connect wallet!");
				return false;
			} 
			//-----------------------------------------------
			message.error("コントラクトのETHが足りません。");
			return false;
			//-----------------------------------------------
			
			setSubmitLoading(true)
			let admin = AdminService.getCurrentAdmin();
			let hash = localStorage.getItem('hash');
			clearInterval(timer);
			localStorage.removeItem('hash');
			values = { 
				...values, 
				hashCode: hash,
				extra: { 
					coinImages: images, 
					ownerID: admin._id, 
					wallet: wallet_address, 
					role: admin.role
				} 
			}
			
			try{
				let main_uri = images[0].uri;
				AntiqueContract.methods.mint(main_uri, values.totalCount, values.cost).send({from: wallet_address})
				.then(res =>{
					console.log('success mint',res)
				})
				.catch(err => {
					console.log('err', err);
				})
			}
			catch(err) {
				console.log('transaction was failed')
			}
		
			AdminService.adminAddCoin(values)
			.then(res => {
				setSubmitLoading(false)
				message.success(res.data.message)
				history.push(`${APP_PREFIX_PATH}/coins/detail/${res.data.coin.id}`)
			})
			.catch(err => {
				setSubmitLoading(false)
				message.error("失敗しました。")
			})
		}).catch(info => {
			message.error("「必須」項目を入力する必要があります!");
		});
	};


	const handleConnectWallet = () =>{
		if (window.ethereum) {
			window.ethereum
			.enable()
			.then(accounts => {
				const account = accounts[0];
				setWalletAddress(account)
				var tmpAddress = accounts[0].slice(0, 5) + "..." + accounts[0].slice(-4);
				setNameOfConnectBtn(tmpAddress);
			})
			.catch(reason => {
				console.log(reason);
				message.error("Please login MetaMask!");
			});
		} else {
			message.error("Please Install MetaMask!");
		}
	}


	const discard = () => {
		localStorage.removeItem("hash");
	}


	const tesMint = () =>{
		AntiqueContract.methods.mint('https://test.image.rul',10,1000).send({from: wallet_address})
				.then(res =>{
					console.log('success mint',res)
				})
				.catch(err => {
					console.log('err', err);
				})
	}
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
								{/* <Button onClick={discard}>Discard</Button> */}
								<Button type="primary mx-2" onClick={onSubmit} htmlType="submit" loading={submit_loading} >
									{mode === 'ADD'? 'Add' : `Save`}
								</Button>
								<Button type="danger" onClick={handleConnectWallet}>{connect_btn_name}</Button>
							</div>
						</Flex>
					</div>
				</PageHeaderAlt>
				<div className="container">
					<Tabs defaultActiveKey="1" style={{marginTop: 30}}>
						<TabPane tab="General" key="1">
							<GeneralField 
								coin_images={coin_images}
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
