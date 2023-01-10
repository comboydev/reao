import React, { useState } from 'react'
import { Form, Button, Input, Row, Col, message } from 'antd';
import adminAuth from 'api/admin/auth';
import Jwt from 'services/jwt';

const Password = () => {
	const [submit, setSubmit] = useState(false);
	const changePasswordFormRef = React.createRef();

	const onFinish = async values => {
		setSubmit(false);
		let admin = Jwt.getAdmin();
		let req = {
			email: admin.email,
			password: values.password,
			newPassword: values.newPassword
		}
		const { data } = await adminAuth.changePassword(req);
		if(data.status_code === 200){
			message.success(data.message);
		} else {
			message.error(data.message)
		}
		setSubmit(false);
		onReset();
	};

	const onReset = () => {
		changePasswordFormRef.current.resetFields();
	};

	return (
	<Row >
		<Col xs={24} sm={24} md={24} lg={12}>
			<Form
				name="changePasswordForm"
				layout="vertical"
				ref={changePasswordFormRef}
				onFinish={onFinish}
			>
				<Form.Item
					label="現在のパスワード"
					name="password"
					rules={[{ 
						required: true,
						message: 'この項目は必須です!' 
					}]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item
					label="新しいパスワード"
					name="newPassword"
					rules={[{ 
						required: true,
						message: 'この項目は必須です!' 
					}]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item
					label="新しいパスワード再入力"
					name="confirmPassword"
					rules={
						[
							{ 
								required: true,
								message: 'この項目は必須です!' 
							},
							({ getFieldValue }) => ({
								validator(rule, value) {
									if (!value || getFieldValue('newPassword') === value) {
										return Promise.resolve();
									}
									return Promise.reject('パスワードが一致しません!');
								},
							}),
						]
					}
				>
					<Input.Password />
				</Form.Item>
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
	)
}

export default Password
