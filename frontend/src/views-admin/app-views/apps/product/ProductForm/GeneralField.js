import React, { useEffect, useState } from 'react'
import { Input, Row, Col, Card, Form, Upload, InputNumber, message, Select,  Button } from 'antd';
import { ImageSvg } from 'assets/svg/icon';
import CustomIcon from 'components/util-components/CustomIcon'
import { LoadingOutlined,  PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
const { Option } = Select;

const rules = {
	name: [
		{
			required: true,
			message: 'Required',
		}
	],
	grade: [
		{
			required: true,
			message: 'Required',
		}
	],
	description: [
		{
			required: true,
			message: 'Required',
		}
	],
	price: [
		{
			required: true,
			message: 'Required',
		}
	],
	refPrice: [		
		{
			required: true,
			message: 'Required',
		}
	],
	numberOfCoins: [
		{
			required: true,
			message: 'Required',
		}
	],
	minNumberOfCoins: [
		{
			required: true,
			message: 'Required'
		}
	],
	taxRate: [		
		{
			required: true,
			message: 'Required',
		}
	]
}

const imageUploadProps = {
  	name: 'file',
	listType: "picture-card",
	showUploadList: false,
  	action: process.env.REACT_APP_API_URL + '/api/admin/file'
}

const beforeUpload = file => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 5;
  if (!isLt2M) {
    message.error('Image must smaller than 5MB!');
  }
  return isJpgOrPng && isLt2M;
}

const grades = [
	'',
	'PF 66★ ULTRA CAMEO',
	'PR65 CAMEO'
];
const tags = ['Cotton', 'Nike', 'Sales', 'Sports', 'Outdoor', 'Toys', 'Hobbies' ]


const GeneralField = ({ coin_images, addCoinImage, removeCoinImage, handleUploadChange}) => {
	
	return(
	<Row gutter={16}>
		<Col xs={24} sm={24} md={17}>
			<Card title="Coin Info">
				<Form.Item name="name" label="コイン名" rules={rules.name}>
					<Input placeholder="Coin Name" />
				</Form.Item>
				<Form.Item name="grade" label="グレード" rules={rules.grade}>
					{/* <Input placeholder="Grade" /> */}
					<Select className="w-100" placeholder="Grade">
						{
							grades.map(elm => (
								<Option key={elm} value={elm}>{elm}</Option>
							))
						}
					</Select>
				</Form.Item>
				<Form.Item name="description" label="説明" rules={rules.description}>
					<Input.TextArea rows={4} placeholder="Description" />
				</Form.Item>
			</Card>
			<Card title="Pricing">
				<Row gutter={16}>
					<Col xs={24} sm={24} md={12}>
						<Form.Item name="refPrice" label="参考取引価格" rules={rules.refPrice}>
							<InputNumber
								className="w-100"
								value={0}
								formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								parser={value => value.replace(/\￥\s?|(,*)/g, '')}
							/>
						</Form.Item>
					</Col>
					<Col xs={24} sm={24} md={12}>
						<Form.Item name="numberOfCoins" label="発行枚数（枚）" rules={rules.numberOfCoins}>
							<InputNumber placeholder='Number of coins'
								className='w-100'
								min={100}
								step={100}
							/>
						</Form.Item>
					</Col>
					
					<Col xs={24} sm={24} md={12}>
						<Form.Item name="price" label="オーナー権価格" rules={rules.price}>
						<InputNumber
							className="w-100"
							formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							parser={value => value.replace(/\￥\s?|(,*)/g, '')}
							step = {5000}
							min = {5000}
						/>
						</Form.Item>
					</Col>

					<Col xs={24} sm={24} md={12}>
						<Form.Item name="minNumberOfCoins" label="最低購入可能口数（枚）" rules={rules.minNumberOfCoins}>
							<InputNumber placeholder='Minimum number of coins' 
								className='w-100'
								step={5}
								min={5}
							/>
						</Form.Item>
					</Col>
				
					<Col xs={24} sm={24} md={12}>
						<Form.Item name="taxRate" label="Tax rate" rules={rules.taxRate}>
							<InputNumber
								className="w-100"
								min={0}
								max={100}
								formatter={value => `${value}%`}
								parser={value => value.replace('%', '')}
							/>
						</Form.Item>
					</Col>
				</Row>
			</Card>
		</Col>
		<Col xs={24} sm={24} md={7}>
			{
				coin_images.map((image, index) => (
				<Card key={index} title={index === 0 && 'Coin images'}>
					{
						index > 0 &&
						<MinusCircleOutlined 
							style={{ position: 'absolute', top:'5px', right: '5px'}} 
							onClick={() => { removeCoinImage(index)}} 
						/>
					}
					<Dragger 
						{...imageUploadProps} 
						beforeUpload={beforeUpload} 
						onChange={e=> handleUploadChange(e, index)}
						
					>
						{
							image.uri ? 
							<img src={image.uri} alt="avatar" className="img-fluid" /> 
							: 
							<div>
								<CustomIcon className="display-3" svg={ImageSvg}/>
								<p>Click or drag coin image to upload</p>
							</div>
						}
					</Dragger>
				</Card>
			))}
		
			<Button type="dashed" onClick={addCoinImage} className="w-100">
				<PlusOutlined /> Add Image
			</Button>
		</Col>
	</Row>
	);
}

export default GeneralField
