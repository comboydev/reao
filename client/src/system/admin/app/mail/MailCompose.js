import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import adminMail from 'api/admin/mail';

const MailCompose = (props) => {
	const history = useHistory();
	const [form] = Form.useForm();
	const [submit, setSubmit] = useState(false);

	const back = () => {
		props.history.goBack()
	}

	const onFinish = () => {
		form.validateFields()
		.then(values => {
			let obj = {
				...values, 
				...history.location.state
			}
			setSubmit(true);
			adminMail.reply(obj)
			.then(res => {
				setSubmit(false);
				message.success("メッセージを送信しました!")
				history.push("/admin/mail/inbox");
			})
			.catch(err => {
				setSubmit(false);
				message.error("メッセージ送信に失敗しました。")
			})
		})
	}


	return (
		<div className="mail-compose">
			<h4 className="mb-4">新規作成 ( New Message )</h4>
			<Form  
				name="mail" 
				onFinish={onFinish} 
				form={form}
				initialValues={{
					to: history.location.state?.mail.email,
					subject: history.location.state?.mail.title,
					content: ""
				}}
			>
				<Form.Item name="to" 
					rules={[
						{
							required: true,
							message: 'この項目は必須です!',
						},
						{ 
							type: 'email',
							message: '有効なメールアドレスを入力してください。'
						}
					]}>
					<Input placeholder="To:"/>
				</Form.Item>

				<Form.Item name="subject" 
					rules={[{
						required: true,
						message: 'この項目は必須です!',
					}]}>
					<Input placeholder="Subject:"/>
				</Form.Item>

				<Form.Item name="content"
					rules={[{
						required: true,
						message: 'この項目は必須です!',
					}]}>
					<Input.TextArea rows={10} placeholder="Content" />
				</Form.Item>
				<Form.Item>
					<div className="text-right">
						<Button className="mr-2" onClick={back}>
							Back
						</Button>
						<Button type="primary" 
							htmlType="submit"
							loading = {submit}
						>
							Send
						</Button>
					</div>
				</Form.Item>
			</Form> 
		</div>
	)

}

export default MailCompose
