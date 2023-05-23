import {
	Input, Row, Col, Card, Form, Upload, InputNumber, message, Button
} from 'antd';
import { ImageSvg } from 'assets/svg/icon';
import CustomIcon from 'components/util-components/CustomIcon'
import { PlusOutlined, MinusCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { imageUri } from 'services/image';

const { Dragger } = Upload;
const EDIT_MODE = 'edit';

const GeneralField = ({ mode, coinImages, addCoinImage, removeCoinImage, handleUploadChange }) => {
	const rules = {
		required: [
			{
				required: true,
				message: 'この項目は必須です!',
			}
		],
	}

	const imageUploadProps = {
		name: 'file',
		listType: "picture-card",
		showUploadList: false,
		maxCount: 5,
		customRequest: () => {
			return;
		}
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

	return (
		<Row gutter={16}>
			<Col xs={24} sm={24} md={17}>
				<Card>
					<Form.Item name="name" label="コイン名" rules={rules.required}>
						<Input placeholder="Coin Name" />
					</Form.Item>
					<Form.Item name="grade" label="グレード" rules={rules.required}>
						<Input placeholder="Grade" />
					</Form.Item>
					<Form.Item name="coinDescription" label="コインの説明" rules={rules.required}>
						<Input.TextArea rows={4} placeholder="Describe Coin" />
					</Form.Item>
					<Form.Item name="gradeDescription" label="グレードの説明" rules={rules.required}>
						<Input.TextArea rows={4} placeholder="Describe Grade" />
					</Form.Item>
				</Card>
				<Card>
					<Row gutter={16}>
						<Col xs={24} sm={24} md={12}>
							<Form.Item name="refPrice" label="参考取引価格" rules={rules.required}>
								<InputNumber placeholder='Reference price'
									className="w-100"
									min={1}
									step={1}
									addonBefore="￥"
									formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={12}>
							<Form.Item name="totalSupply" label="発行枚数" rules={rules.required}>
								<InputNumber placeholder='Amount'
									className='w-100'
									min={1}
									step={1}
									addonBefore="枚"
									formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
									disabled={mode === EDIT_MODE ? true : false}
								/>
							</Form.Item>
						</Col>
					</Row>
				</Card>
			</Col>
			<Col xs={24} sm={24} md={7}>
				{
					coinImages.map((image, index) => (
						<Card key={index} title={index === 0 && 'Images'}>
							{
								index > 0 &&
								<MinusCircleOutlined
									style={{ position: 'absolute', top: '5px', right: '5px' }}
									onClick={() => { removeCoinImage(index) }}
								/>
							}
							<Dragger
								{...imageUploadProps}
								beforeUpload={beforeUpload}
								onChange={e => handleUploadChange(e, index)}
							>
								{
									image.uri ?
										<img src={imageUri(image.uri)} alt="avatar" className="img-fluid" />
										: (
											!image.loading ?
												<div>
													<CustomIcon className="display-3" svg={ImageSvg} />
													<p>Click or drag coin image to upload</p>
												</div>
												:
												<div>
													<CustomIcon className="display-3" svg={ImageSvg} />
												</div>
										)
								}
								{
									image.loading &&
									<LoadingOutlined className="d-block mt-2" />
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
