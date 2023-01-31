import { useEffect, useState } from 'react';
import { Form, Avatar, Button, Input, DatePicker, Row, Col, message, Upload } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import { ROW_GUTTER } from 'constants/ThemeConstant';
import Flex from 'components/shared-components/Flex';
import moment from 'moment';
import api from 'api';
import Jwt from 'services/jwt';
import ImageService from 'services/image';

const EditProfile = () => {
	const admin = Jwt.getAdmin();
	const [avatar, setAvatar] = useState('');
	const [loaded, setLoaded] = useState(false);
	const [submit, setSubmit] = useState(false);
	const [submitAvatar, setSubmitAvatar] = useState(false);

	useEffect(() => {
		setAvatar(admin.avatar);
		setLoaded(true);
	}, [admin.avatar])

	const onFinish = values => {
		const payload = {
			nickname: values.nickname,
			personalInfo: {
				name: values.name,
				furigana: values.furigana,
				phoneNumber: values.phoneNumber,
				birthday: values.birthday.toString()
			},
		}
		setSubmit(true);
		api.adminProfile.updateProfile(admin.id, payload)
			.then(res => {
				setSubmit(false);
				Jwt.setAdmin(res.data);
				message.success("プロフィールを更新しました!");
			})
			.catch(err => {
				setSubmit(false);
				message.error("失敗しました。");
			})
	};

	const onUploadAavater = async (e) => {
		setSubmitAvatar(true);
		ImageService.getBase64(e.file.originFileObj, async (base64) => {
			const { data } = await ImageService.upload(base64);
			const user = Jwt.getAdmin();
			const res = await api.adminProfile.updateProfile(user.id, { avatar: data.uri })
			Jwt.setAdmin(res.data);
			window.location.reload();
		})
	};

	if (!loaded) return null;
	return (
		<>
			<Flex alignItems="center" mobileFlex={false} className="text-center text-md-left">
				<Avatar size={90} src={avatar} icon={<UserOutlined />} />
				<div className="ml-3 mt-md-0 mt-3 position-relative">
					<Upload onChange={onUploadAavater} showUploadList={false} customRequest={() => { return; }}>
						<Button
							type="primary" shape="circle"
							icon={<EditOutlined />}
							style={{
								position: 'absolute',
								bottom: -40,
								right: -5,
							}}
							loading={submitAvatar}
						/>
					</Upload>
				</div>
			</Flex>
			<div className="mt-4">
				<Form
					name="basicInformation"
					layout="vertical"
					initialValues={
						{
							'nickname': admin.nickname,
							'name': admin.personalInfo?.name,
							'furigana': admin.personalInfo?.furigana,
							'birthday': moment(admin.personalInfo?.birthday),
							'phoneNumber': admin.personalInfo?.phoneNumber,
						}
					}
					onFinish={onFinish}
				>
					<Row>
						<Col xs={24} sm={24} md={24} lg={16}>
							<Row gutter={ROW_GUTTER}>
								<Col xs={24} sm={24} md={24}>
									<Form.Item
										label="ユーザー名"
										name="nickname"
										rules={[
											{
												required: true,
												message: 'この項目は必須です！',
											},
										]}
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={12}>
									<Form.Item
										label="お名前"
										name="name"
										rules={[
											{
												required: true,
												message: 'この項目は必須です！',
											},
										]}
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={12}>
									<Form.Item
										label="フリガナ"
										name="furigana"
										rules={[
											{
												required: true,
												message: 'この項目は必須です！'
											},
										]}
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={12}>
									<Form.Item
										label="電話番号"
										name="phoneNumber"
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={12}>
									<Form.Item
										label="生年月日"
										name="birthday"
									>
										<DatePicker className="w-100" />
									</Form.Item>
								</Col>
							</Row>
							<Button type="primary" htmlType="submit"
								loading={submit}
							>
								更新
							</Button>
						</Col>
					</Row>
				</Form>
			</div>
		</>
	)
}

export default EditProfile
