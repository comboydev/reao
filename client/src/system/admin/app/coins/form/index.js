import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex';
import Loading from "components/shared-components/Loading";
import GeneralField from './general';
import ImageService from 'services/image';
import { getContract } from 'contracts/hooks';
import Token from 'contracts/services/token';
import api from 'api';

const { TabPane } = Tabs;
const CREATE_MODE = 'create'
const EDIT_MODE = 'edit'

const CoinForm = ({ mode = CREATE_MODE, param }) => {
	const [form] = Form.useForm();
	const [loaded, setLoaded] = useState(false);
	const [token, setToken] = useState();
	const [coinImages, setCoinImages] = useState([{ uri: '', loading: false }]);
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	useEffect(() => {
		if (mode === EDIT_MODE) {
			const { id } = param
			async function fetch() {
				const token = await Token.getToken(id);
				setToken(token);
				form.setFieldsValue({ ...token });
				setCoinImages(token.images.map(image => ({ uri: image, loading: false })));
				setLoaded(true);
			}
			fetch();
		}
	}, [form, mode, param]);

	const addCoinImage = () => {
		if (coinImages.length >= 5) {
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
			ImageService.getBase64(e.file.originFileObj, async (base64) => {
				const { data } = await ImageService.upload(base64);
				let images = coinImages;
				images[idx] = { uri: data.uri, loading: false }
				setCoinImages([...images]);
			})
		} catch (err) {
			message.error('エラーが発生しました。');
		}
	};

	const onSubmit = () => {
		const images = []
		coinImages.forEach(image => {
			if (image.uri) images.push(image.uri)
		})
		if (images.length === 0) {
			message.error('1枚以上の画像を入力してください');
			return false;
		}

		form.validateFields()
			.then(async (values) => {
				setLoading(true);
				values = {
					...values,
					images: images,
				}

				try {
					if (mode === EDIT_MODE) {
						await api.adminCoin.update(token.uri, values);
						history.push(`/admin/coins/detail/${token.tokenId}`);
					} else if (mode === CREATE_MODE) {
						// Add Coin
						const { data } = await api.adminCoin.create(values);
						try {
							const nftContract = await getContract('AQCT1155');
							const tx = await nftContract.mint(data.coin.id, values.totalSupply);
							await tx.wait();
							history.push(`/admin/coins/owned`);
						}
						catch (err) {
							console.log(err);
							setLoading(false);
							await api.adminCoin.deleteBatch([data.coin.id]);
							message.error("Minting Failed");
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

	if (mode === EDIT_MODE && !loaded) return <Loading cover="page" />
	return (
		<>
			<Form
				layout="vertical"
				form={form}
				name="advanced_search"
				className="ant-advanced-search-form"
			>
				<PageHeaderAlt className="border-bottom" overlap>
					<div className="container">
						<Flex className="py-2" mobileFlex={false} justifyContent="between" alignItems="center">
							<h2 className="mb-3">{mode === CREATE_MODE ? '新規発行' : `コイン編集`} </h2>
							<div className="mb-3">
								<Button type="primary mx-2"
									onClick={onSubmit}
									htmlType="submit"
									loading={loading}
								>
									{mode === CREATE_MODE ? 'Create' : `Save`}
								</Button>
							</div>
						</Flex>
					</div>
				</PageHeaderAlt>
				<div className="container">
					<Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
						<TabPane tab="General" key="1">
							<GeneralField
								mode={mode}
								coinImages={coinImages}
								addCoinImage={addCoinImage}
								removeCoinImage={removeCoinImage}
								handleUploadChange={handleUploadChange}
							/>
						</TabPane>
					</Tabs>
				</div>
			</Form>
		</>
	)
}

export default CoinForm
