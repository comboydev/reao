import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex';
import Loading from "components/shared-components/Loading";
import GeneralField from './general';
import { getContract } from 'contracts/hooks';
import TokenService from 'contracts/services/token';
import axios from "axios";

const { TabPane } = Tabs;

const CREATE_MODE = 'create'
const EDIT_MODE = 'edit'

const pinataApiKey = '9f777d5fc7f5824afc3c';
const pinataApiSecret = 'bcf45d4db9bb9fc0454d18dd6e26a4fd4afb2f4c1156519762117f94bdfb8a60';

const CoinForm = ({ mode = CREATE_MODE, param }) => {
	const history = useHistory();
	const [form] = Form.useForm();
	const [loaded, setLoaded] = useState(false);
	const [token, setToken] = useState();
	const [coinImages, setCoinImages] = useState([{ uri: '', loading: false }]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (mode === EDIT_MODE) {
			const { id } = param
			async function fetch() {
				const token = await TokenService.getToken(id);
				setToken(token);
				form.setFieldsValue({
					...token,
					gradeName: token.grade.name,
					gradeDescription: token.grade.description,
				});
				setCoinImages(token.images.map(image => ({ uri: image, loading: false })));
				setLoaded(true);
			}
			fetch();
		}
	}, [form, mode, param]);

	const handleAddCoinImage = () => {
		if (coinImages.length >= 5) {
			message.error("画像は最大5枚までです。");
			return;
		}
		setCoinImages([...coinImages, { uri: '', loading: false }]);
	}

	const handleRemoveCoinImage = (index) => {
		coinImages.splice(index, 1);
		setCoinImages([...coinImages]);
	}

	const handleUploadCoinImage = async (e, idx) => {
		let images = coinImages;
		images[idx] = { loading: true }
		setCoinImages([...images]);
		try {
			const formData = new FormData();
			formData.append('file', e.file.originFileObj);

			const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
			const response = await axios.post(url, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					'pinata_api_key': pinataApiKey,
					'pinata_secret_api_key': pinataApiSecret,
				},
			});

			const uri = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
			let images = coinImages;
			images[idx] = { uri, loading: false }
			setCoinImages([...images]);
		} catch (err) {
			message.error('エラーが発生しました。');
		}
	};

	const handleUpdateTokenURI = async (uri) => {
		if (uri === token.uri) {
			message.warning('URIの変更か必須です。');
			return;
		}
		setLoading(true)
		const nftContract = await getContract('AQCT1155');
		const tx = await nftContract.setUri(token.tokenId, uri);
		await tx.wait();
		setLoaded(false);
		history.push(`/admin/coins/detail/${token.tokenId}`);
	}

	const handleSubmit = () => {
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
				const metadata = {
					name: values.name,
					description: values.description,
					image: images[0],
					extra: {
						images: images,
						grade: {
							name: values.gradeName,
							description: values.gradeDescription
						},
						ref_price: values.refPrice,
					}
				}

				const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
				const response = await axios.post(url, metadata, {
					headers: {
						'Content-Type': 'application/json',
						'pinata_api_key': pinataApiKey,
						'pinata_secret_api_key': pinataApiSecret,
					},
					pinataMetadata: { name: 'metadata.json' },
				});
				const uri = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

				try {
					const nftContract = await getContract('AQCT1155');
					if (mode === EDIT_MODE) {
						const tx = await nftContract.setUri(token.tokenId, uri);
						await tx.wait();
						history.push(`/admin/coins/detail/${token.tokenId}`);
					} else if (mode === CREATE_MODE) {
						const tx = await nftContract.mint(uri, values.totalSupply);
						await tx.wait();
						history.push(`/admin/coins/owned`);
					}
				} catch (err) {
					console.log(err);
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
									onClick={handleSubmit}
									htmlType="submit"
									loading={loading}
								>
									{mode === CREATE_MODE ? '新規発行' : `編集`}
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
								loading={loading}
								coinImages={coinImages}
								handleAddCoinImage={handleAddCoinImage}
								handleRemoveCoinImage={handleRemoveCoinImage}
								handleUploadCoinImage={handleUploadCoinImage}
								handleUpdateTokenURI={handleUpdateTokenURI}
							/>
						</TabPane>
					</Tabs>
				</div>
			</Form>
		</>
	)
}

export default CoinForm
