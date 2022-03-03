import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from "react-router-dom"
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import ProductListData from "assets/data/product-list.data.json"

const { TabPane } = Tabs;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const ADD = 'ADD'
const EDIT = 'EDIT'

const ProductForm = props => {

	const { mode = ADD, param } = props
	const history = useHistory();
	const location = useLocation();

	const [form] = Form.useForm();
	const [coin_images, setCoinImages] = useState([{uri: ''}]);
	const [submit_loading, setSubmitLoading] = useState(false);


	useEffect(() => {
    	if(mode === EDIT) {
			console.log('is edit')
			console.log('props', props)
			const { id } = param
			const produtId = parseInt(id)
			const productData = ProductListData.filter( product => product.id === produtId)
			const product = productData[0]
			form.setFieldsValue({
				// comparePrice: 0.00,
				// cost: 0.00,
				// taxRate: 6,
				// description: 'There are many variations of passages of Lorem Ipsum available.',
				// category: product.category,
				// name: product.name,
				// price: product.price
			});
			setCoinImages(product.image)
		} else if(mode === ADD){
			form.setFieldsValue({
				minNumberOfCoins: 10,
				taxRate: 10,
				price: 10000
			})
		}
  	}, [form, mode, param, props]);


	const addCoinImage = () => {
		let arr = coin_images;
		arr.push({ uri: ''});
		history.push(location.pathname);
	}

	const removeCoinImage = (index) => {
		let arr = coin_images;
		arr.splice(index);
		setCoinImages(arr);
		history.push(location.pathname);
	}

	const handleUploadChange = (info, idx) => {
		getBase64(info.file.originFileObj, imageUrl =>{
			let arr = coin_images;
			arr[idx].uri = imageUrl;
			setCoinImages(arr);
		});
		history.push(location.pathname);
	};

	const onClear = () => {
		window.location.reload();
	}

	const onSubmit = () => {
		setSubmitLoading(true)
		form.validateFields().then(values => {
			console.log(values);
			setTimeout(() => {
				setSubmitLoading(false)
				if(mode === ADD) {
					message.success(`Created ${values.name} to product list`);
				}
				if(mode === EDIT) {
					message.success(`Product saved`);
				}
			}, 1500);
		}).catch(info => {
			setSubmitLoading(false)
			console.log('info', info)
			message.error('Please enter all required field ');
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
					weightUnit: 'kg'
				}}
			>
				<PageHeaderAlt className="border-bottom" overlap>
					<div className="container">
						<Flex className="py-2" mobileFlex={false} justifyContent="between" alignItems="center">
							<h2 className="mb-3">{mode === 'ADD'? 'Add New Product' : `Edit Product`} </h2>
							<div className="mb-3">
								<Button className="mr-2" onClick={onClear}>Clear</Button>
								<Button type="primary" onClick={onSubmit} htmlType="submit" loading={submit_loading} >
									{mode === 'ADD'? 'Add' : `Save`}
								</Button>
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
						{/* <TabPane tab="Variation" key="2">
							<VariationField />
						</TabPane> */}
						{/* <TabPane tab="Shipping" key="3">
							<ShippingField />
						</TabPane> */}
					</Tabs>
				</div>
			</Form>
		</>
	)
}

export default ProductForm
