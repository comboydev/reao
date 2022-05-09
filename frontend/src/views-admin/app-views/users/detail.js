import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import { Row, Col, Card, Avatar, Button, Tag, Image, message, Popconfirm } from 'antd';
import { Icon } from 'components/util-components/Icon'
import { 
	MailOutlined,
	PhoneOutlined,
	UserOutlined
} from '@ant-design/icons';
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import moment from 'moment';

import AdminService from 'services/admin.service';


const STATUS = [
	{
		color: 'volcano',
		title: '本人確認未'
	},
	{
		color: 'blue',
		title: '本人確認申請中'
	},
	{
		color: 'cyan',
		title: '本人確認済み'
	}
]


const  Profile = (props) => {

	const avatarSize = 150;
	const history = useHistory();
	const [userData, setUserData] = useState();
	const [submit_identity, setSubmitIdentity] = useState(false);
	const [submit_disabled, setSubmitDisabled] = useState(false);


	useEffect(()=>{
		AdminService.adminGetUserOne(props.match.params.id)
		.then(res => {
			setUserData(res.data);
		})
		.catch(err => {
			message.error('失敗しました。', ()=>{
				history.push('/admin/users');
			});
		});
	}, [])

	const handleVerifyIdentity = () => {
		setSubmitIdentity(true);
		AdminService.adminConfirmIdentity(props.match.params.id)
		.then(res => {
			setSubmitIdentity(false);
			setUserData(res.data);
			message.success('本人確認を承認しました！')
		})
		.catch(err => {
			setSubmitIdentity(false);
			message.error('失敗しました。');
		})
	}

	const handleDisableAccount = () => {
		setSubmitDisabled(true);
		AdminService.adminDisableAccount(props.match.params.id)
		.then(res => {
			setSubmitDisabled(false);
			setUserData(res.data);
			message.success('アカウントを停止しました。')
		})
		.catch(err => {
			setSubmitDisabled(false);
			message.error('失敗しました。');
		})
	}
	
	if( !userData ) return null;
	return (
		<>
			<PageHeaderAlt background="/img/others/img-12.jpg" cssClass="bg-primary" overlap>
				<div className="container text-center">
					<div className="py-5 my-md-5">
					</div>
				</div>
			</PageHeaderAlt>
			<div className="container my-4">
				<Card>
					<Col sm={24} md={16} className="mx-auto">
						<div className="d-sm-flex">
							<div className="rounded p-2 shadow-sm mx-auto text-center" style={{'marginTop': '-3.5rem', 'maxWidth': `${avatarSize}`}}>
								<Avatar shape="square" size={avatarSize} src={ userData.avatar } />
							</div>
							<div className="ml-sm-4 mt-4 mt-sm-3 w-100">
								<Row className="mb-2 text-center text-sm-left"> 
									<Col xs={8} className="text-right text-sm-left">
										<Icon type={UserOutlined} className="text-primary font-size-md"/>
										<span className="text-muted ml-2">ニック名:</span>
									</Col>
									<Col xs={16}>
										<span className="font-weight-semibold">{userData.nickname}</span>
									</Col>
								</Row>
								<Row className="mb-2 text-center text-sm-left"> 
									<Col xs={8} className="text-right text-sm-left">
										<Icon type={MailOutlined} className="text-primary font-size-md"/>
										<span className="text-muted ml-2">Email:</span>
									</Col>
									<Col xs={16}>
										<span className="font-weight-semibold">{userData.email}</span>
									</Col>
								</Row>
								<Row className='text-center text-sm-left'> 
									<Col xs={8} className="text-right text-sm-left">
										<Icon type={PhoneOutlined} className="text-primary font-size-md"/>
										<span className="text-muted ml-2">登録日:</span>
									</Col>
									<Col xs={16}>
										<span className="font-weight-semibold">{moment(userData.created_at).format('YYYY年 MM月 DD日')}</span>
									</Col>
								</Row>
							</div>
						</div>
					</Col>
				</Card>
				<Row gutter={16}>
					<Col xs={24} sm={24} md={14}>
						<Card title='身分証' className='pt-3 h-100' style={{ minHeight: '250px' }}>
							{
								userData.warrant
									?	<Image src={userData.warrant} />
									:	<Tag className ="text-capitalize mt-3 mt-md-0"
											style={{ 
												position:'absolute',
												left: '50%',
												top: '50%',
												transform: 'translate(-50%, -50%)'
											 }}
										>未提出です。</Tag>
							}
						</Card>			
					</Col>
					<Col xs={24} sm={24} md={10}>
						<Tag className ="text-capitalize mt-3 mt-md-0" 
								color={STATUS[userData.identityVerified + 1].color}>
								{STATUS[userData.identityVerified + 1].title}
						</Tag>
						<Tag className ="text-capitalize" 
								color={ !userData.emailVerified ? 'volcano' : 'cyan'}>
								{ !userData.emailVerified ? 'メール認証未' : 'メール認証済み'}
						</Tag>
						{/* <Tag className ="text-capitalize" 
								color={ !userData.actived ? 'volcano' : 'cyan'}>
								{ !userData.actived ? 'Blocked' : 'Active'}
						</Tag> */}
						<Card title='個人情報' className='py-3 mt-3'>
							<Row> 
								<Col xs={8}>
									<span className="text-muted">お名前:</span>
								</Col>
								<Col xs={16} className="text-center">
									<span className="font-weight-semibold">{userData.personalInfo?.name}</span>
								</Col>
							</Row>
							<Row className="mt-3"> 
								<Col xs={8}>
									<span className="text-muted">フリガナ:</span>
								</Col>
								<Col xs={16} className="text-center">
									<span className="font-weight-semibold text-center">{userData.personalInfo?.furigana}</span>
								</Col>
							</Row>
							<Row className="mt-3"> 
								<Col xs={8}>
									<span className="text-muted">電話番号:</span>
								</Col>
								<Col xs={16} className="text-center">
									<span className="font-weight-semibold text-center">{userData.personalInfo?.phoneNumber}</span>
								</Col>
							</Row>
							<Row className="mt-3"> 
								<Col xs={8}>
									<span className="text-muted">生年月日:</span>
								</Col>
								<Col xs={16} className="text-center">
									{
										userData.personalInfo?.birthday &&
										<span className="font-weight-semibold text-center">{moment(userData.personalInfo?.birthday).format('YYYY年 MM月 DD日')}</span>
									}
								</Col>
							</Row>
							<Row className="mt-3"> 
								<Col xs={8}>
									<span className="text-muted">都道府県:</span>
								</Col>
								<Col xs={16} className="text-center">
									<span className="font-weight-semibold text-center">{userData.personalInfo?.locationProvince}</span>
								</Col>
							</Row>
							<Row className="mt-3"> 
								<Col xs={8}>
									<span className="text-muted">市区町村:</span>
								</Col>
								<Col xs={16} className="text-center">
									<span className="font-weight-semibold text-center">{userData.personalInfo?.locationCity}</span>
								</Col>
							</Row>
							<Row className="mt-3"> 
								<Col xs={8}>
									<span className="text-muted text-center">それ以降の住所:</span>
								</Col>
								<Col xs={16} className="text-center">
									<span className="font-weight-semibold text-center">{userData.personalInfo?.extra}</span>
								</Col>
							</Row>
							{
								userData.identityVerified === 0 &&
								<Popconfirm
									title="本当に承認しますか？"
									onConfirm={handleVerifyIdentity}
									okText="YES"
									cancelText="NO"
								> 
									<Button 
										className="mt-4 w-100" type="primary"
										loading = {submit_identity}
									>
										本人確認を承認する
									</Button>
								</Popconfirm>
							}
						</Card>
						<Card title="Setting" className='mb-0'>
							<Button className='w-100 mb-3' onClick={()=>{
								history.push({
									pathname:`/admin/mail/compose`, 
									state: { mail: userData }
								});
							}}>
								メッセージを送信
							</Button>
							{/* <Popconfirm
								title="本当に停止しますか？"
								onConfirm={handleDisableAccount}
								okText="YES"
								cancelText="NO"
								disabled = {!userData.actived}
							> 
								<Button 
									className='w-100'
									loading = {submit_disabled}
								>
									アカウントを停止する
								</Button>
							</Popconfirm> */}
						</Card>
					</Col>
				</Row>
			</div>
		</>
	)
}

export default Profile
