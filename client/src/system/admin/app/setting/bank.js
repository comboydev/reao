import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { Form, Button, Input, Row, Col, message } from 'antd';
import Jwt from 'services/jwt';
import adminProfile from 'api/admin/profile';

const Bank = () => {
	const admin = Jwt.getAdmin();
	const history = useHistory();

	const [submit, setSubmit] = useState(false);
	const [bank_info, setBankInfo] = useState({});
	const [loaded, setLoaded] = useState(false);
	const [form] = Form.useForm();

	useEffect(()=>{
		adminProfile.getBankInfo(admin._id)
		.then(res => {
			setBankInfo(res.data);
			setLoaded(true);
		})
		.catch(err => {
			message.error("失敗しました。", ()=>{
				history.push("/admin/setting/edit-profile");
			})
		})
	}, [admin._id, history])

	const onFinish = async values => {
		setSubmit(true);
		try {
			const { data } = await adminProfile.updateBankInfo(admin._id, { ...values })
			if(data.status_code === 200){
				message.success(data.message);
			} else {
				message.error(data.message);
			}
		} catch {
			message.error('エラーか発生しました。')
		}
		setSubmit(false);
	};

	if(!loaded) return null;
	return (
		<>
			<h2 className="mb-4">Bank</h2>
			<Row >
				<Col xs={24} sm={24} md={24} lg={18}>
					<Form
						name="changePasswordForm"
						layout="vertical"
						form={form}
						onFinish={onFinish}
						initialValues={
							{ 
								bankName: bank_info?.bankName,
								bankCode: bank_info?.bankCode,
								bankBranch: bank_info?.bankBranch,
								bankBranchCode: bank_info?.bankBranchCode,
								bankAccountNumber: bank_info?.bankAccountNumber,
								bankAccountName: bank_info?.bankAccountName,
							}
						}
					>
						<Row gutter={16}>
							<Col xs={24} sm={24} md={12}>
								<Form.Item
									label="金融機関名:"
									name="bankName"
									rules={[{ 
										required: true,
										message: 'この項目は必須です!' 
									}]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={12}>
								<Form.Item
									label="銀行コード:"
									name="bankCode"
									rules={[{ 
										required: true,
										message: 'この項目は必須です!' 
									}]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={12}>
								<Form.Item
									label="支店名:"
									name="bankBranch"
								>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={12}>
								<Form.Item
									label="支店番号"
									name="bankBranchCode"
								>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={12}>
								<Form.Item
									label="口座番号:"
									name="bankAccountNumber"
									rules={[{ 
										required: true,
										message: 'この項目は必須です!' 
									}]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={12}>
								<Form.Item
									label="口座名義人:"
									name="bankAccountName"
									rules={[{ 
										required: true,
										message: 'この項目は必須です!' 
									}]}
								>
									<Input />
								</Form.Item>
							</Col>
						</Row>
							
						<Button 
							type="primary" 
							htmlType="submit"
							loading={submit}	
						>
							更新
						</Button>
					</Form>
				</Col>
			</Row>
		</>
	)
}

export default Bank
