import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import { Row, Col, Card, Avatar, Button, Tag, Image, message, Popconfirm, Collapse, Table, Tooltip, Divider, Tabs, Radio } from 'antd';
import { Icon } from 'components/util-components/Icon'
import {
	MailOutlined,
	CalendarOutlined,
	UserOutlined,
	EyeOutlined,
} from '@ant-design/icons';
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import AvatarStatus from 'components/shared-components/AvatarStatus';
import moment from 'moment';

import adminUser from 'api/admin/user';
import adminRewardGroup from 'api/admin/rewardGroup';
import userProfile from 'api/user/profile';
import userRewardGroup from 'api/user/rewardGroup';

const { TabPane } = Tabs;
const { Panel } = Collapse;

const STATUS = [
	{ color: 'volcano', title: '未' },
	{ color: 'blue', title: '申請中' },
	{ color: 'cyan', title: '済み' },
]

const Profile = (props) => {
	const history = useHistory();
	const [userData, setUserData] = useState();
	const [submit_identity, setSubmitIdentity] = useState(false);
	const [rewardGroups, setRewardGroups] = useState([]);
	const [tear, setTear] = useState({
		tear1: [],
		tear2: [],
		tear3: [],
		tear4: [],
		tear5: []
	})

	useEffect(() => {
		async function fetchData() {
			try {
				let res = await adminUser.getOne(props.match.params.id)
				setUserData(res.data)

				res = await userProfile.getPartners(props.match.params.id)
				setTear(res.data);

				res = await adminRewardGroup.get();
				setRewardGroups(res.data.rewardGroups);
			} catch (err) {
				message.error('エラーが発生しました!', () => {
					history.push('/admin/users');
				});
			}
		}
		fetchData()
	}, [props.match.params.id, history])


	const columns = [
		{
			title: '名前',
			dataIndex: 'name',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus src={record.avatar} name={record.nickname} subTitle={record.email} />
				</div>
			),
		},
		{
			title: '紹介者',
			dataIndex: 'introducer',
			render: introducer => (
				<a href={'/admin/users/' + introducer?._id}>{introducer?.email}</a>
			),
		},
		{
			title: '本人確認',
			dataIndex: 'identityVerified',
			render: identityVerified => (
				<Tag className="text-capitalize"
					color={STATUS[identityVerified + 1].color}>
					{STATUS[identityVerified + 1].title}
				</Tag>
			),
		},
		{
			title: 'メール認証',
			dataIndex: 'emailVerified',
			render: emailVerified => (
				<Tag className="text-capitalize"
					color={!emailVerified ? 'volcano' : 'cyan'}>
					{!emailVerified ? '未' : '済み'}
				</Tag>
			),
		},
		{
			title: '登録日',
			dataIndex: 'created_at',
			render: created_at => (
				<span>{moment(created_at).format("MM/DD/YYYY")} </span>
			),
			sorter: (a, b) => moment(a.created_at) - moment(b.created_at)
		},
		{
			title: '',
			dataIndex: '_id',
			render: _id => (
				<div className="text-right d-flex justify-content-end">
					<Tooltip title="View">
						<Button type="primary" className="mr-2" icon={<EyeOutlined />} onClick={() => window.location.href = ("/admin/users/" + _id)} size="small" />
					</Tooltip>
				</div>
			)
		}
	];

	const handleVerifyIdentity = () => {
		setSubmitIdentity(true);
		adminUser.setConfirm(props.match.params.id)
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

	// const handleDisableAccount = () => {
	// 	setSubmitDisabled(true);
	// 	adminUser.setDisable(props.match.params.id)
	// 	.then(res => {
	// 		setSubmitDisabled(false);
	// 		setUserData(res.data);
	// 		message.success('アカウントを停止しました。')
	// 	})
	// 	.catch(err => {
	// 		setSubmitDisabled(false);
	// 		message.error('失敗しました。');
	// 	})
	// }


	const handleChangeRewardGroup = async (e) => {
		try {
			let res = await userRewardGroup.update(userData._id, { rewardGroup: e.target.value })
			setUserData(res.data)
		} catch (err) {
			message.error(err.toString())
		}
	}

	const rewardGroupColumns = [
		{
			title: 'Group',
			dataIndex: 'name',
			render: (_, elm) => {
				if (tear.tear1.length + tear.tear2.length + tear.tear3.length + tear.tear4.length + tear.tear5.length > 0)
					return <span><Radio value={elm._id}> {elm.name} </Radio></span>
				else return <span> {elm.name} </span>
			},
			sorter: {
				compare: (a, b) => {
					a = a.name.toLowerCase();
					b = b.name.toLowerCase();
					return a > b ? -1 : b > a ? 1 : 0;
				},
			},
		},
		{
			title: 'Tear1',
			dataIndex: 'tear1',
			render: tear1 => <span> {tear1} %</span>,
			sorter: (a, b) => a.tear1 - b.tear1,
		},
		{
			title: 'Tear2',
			dataIndex: 'tear2',
			render: tear2 => <span> {tear2} %</span>,
			sorter: (a, b) => a.tear2 - b.tear2,
		}, {
			title: 'Tear3',
			dataIndex: 'tear3',
			render: tear3 => <span> {tear3} %</span>,
			sorter: (a, b) => a.tear3 - b.tear3,
		}, {
			title: 'Tear4',
			dataIndex: 'tear4',
			render: tear4 => <span> {tear4} %</span>,
			sorter: (a, b) => a.tear4 - b.tear4,
		}, {
			title: 'Tear5',
			dataIndex: 'tear5',
			render: tear5 => <span> {tear5} %</span>,
			sorter: (a, b) => a.tear5 - b.tear5,
		},
	];


	if (!userData) return null;
	return (
		<>
			<PageHeaderAlt cssClass="bg-primary" overlap>
				<Col sm={24} md={18} lg={16} xl={12} className="ml-sm-5">
					<div className="d-sm-flex">
						<div className="rounded p-2 mx-auto text-center">
							<Avatar size={100} src={userData.avatar} icon={<UserOutlined />} />
						</div>
						<div className="ml-sm-4 my-auto w-100">
							<Row className="mb-2 text-center text-sm-left">
								<Col xs={8} className="text-right text-sm-left">
									<Icon type={UserOutlined} className="text-primary font-size-md" />
									<span className="text-muted ml-2">ユーザー名:</span>
								</Col>
								<Col xs={16}>
									<span className="font-weight-semibold">{userData.nickname}</span>
								</Col>
							</Row>
							<Row className="mb-2 text-center text-sm-left">
								<Col xs={8} className="text-right text-sm-left">
									<Icon type={MailOutlined} className="text-primary font-size-md" />
									<span className="text-muted ml-2">Email:</span>
								</Col>
								<Col xs={16}>
									<span className="font-weight-semibold">{userData.email}</span>
								</Col>
							</Row>
							<Row className='text-center text-sm-left'>
								<Col xs={8} className="text-right text-sm-left">
									<Icon type={CalendarOutlined} className="text-primary font-size-md" />
									<span className="text-muted ml-2">登録日:</span>
								</Col>
								<Col xs={16}>
									<span className="font-weight-semibold">{moment(userData.created_at).format('YYYY年 MM月 DD日')}</span>
								</Col>
							</Row>
						</div>
					</div>
				</Col>
			</PageHeaderAlt>
			<Tabs defaultActiveKey="1" style={{ marginTop: 100 }}>
				<TabPane tab="個人情報" key="1">
					<Row gutter={16}>
						<Col xs={24} sm={24} md={14}>
							<Card title='身分証' className='pt-3 h-100' style={{ minHeight: '250px' }}>
								{
									userData.warrant
										? <Image src={userData.warrant} />
										: <Tag className="text-capitalize mt-3 mt-md-0"
											style={{
												position: 'absolute',
												left: '50%',
												top: '50%',
												transform: 'translate(-50%, -50%)'
											}}
										>未提出です。</Tag>
								}
							</Card>
						</Col>
						<Col xs={24} sm={24} md={10}>
							<Tag className="text-capitalize mt-3 mt-md-0"
								color={STATUS[userData.identityVerified + 1].color}>
								本人確認{STATUS[userData.identityVerified + 1].title}
							</Tag>
							<Tag className="text-capitalize"
								color={!userData.emailVerified ? 'volcano' : 'cyan'}>
								{!userData.emailVerified ? 'メール認証未' : 'メール認証済み'}
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
											loading={submit_identity}
										>
											本人確認を承認する
										</Button>
									</Popconfirm>
								}
							</Card>
							<Card title="Setting" className='mb-0'>
								<Button className='w-100 mb-3' onClick={() => {
									history.push({
										pathname: `/admin/mail/compose`,
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
				</TabPane>

				<TabPane tab="アフィリエイト" key="2">
					<Card title="報酬グループの選択">
						<Radio.Group onChange={handleChangeRewardGroup} value={userData.rewardGroup?._id} className="w-100">
							<Table columns={rewardGroupColumns} dataSource={rewardGroups} rowKey="_id" />
						</Radio.Group>
					</Card>
					<Divider />
					<Card title="紹介者ユーザー一覧">
						<Collapse defaultActiveKey={['1']} >
							<Panel key="1" header="TEAR 1" extra={`報酬: ${userData.rewardGroup?.tear1 ? userData.rewardGroup?.tear1 + '%' : '---'}　　　${tear.tear1.length}人`}>
								<Table columns={columns} dataSource={tear.tear1} rowKey="_id" scroll={{ x: 800 }} />
							</Panel>
							<Panel key="2" header="TEAR 2" extra={`報酬: ${userData.rewardGroup?.tear1 ? userData.rewardGroup?.tear2 + '%' : '---'}　　　${tear.tear2.length}人`}>
								<Table columns={columns} dataSource={tear.tear2} rowKey="_id" scroll={{ x: 800 }} />
							</Panel>
							<Panel key="3" header="TEAR 3" extra={`報酬: ${userData.rewardGroup?.tear1 ? userData.rewardGroup?.tear3 + '%' : '---'}　　　${tear.tear3.length}人`}>
								<Table columns={columns} dataSource={tear.tear3} rowKey="_id" scroll={{ x: 800 }} />
							</Panel>
							<Panel key="4" header="TEAR 4" extra={`報酬: ${userData.rewardGroup?.tear1 ? userData.rewardGroup?.tear4 + '%' : '---'}　　　${tear.tear4.length}人`}>
								<Table columns={columns} dataSource={tear.tear4} rowKey="_id" scroll={{ x: 800 }} />
							</Panel>
							<Panel key="5" header="TEAR 5" extra={`報酬: ${userData.rewardGroup?.tear1 ? userData.rewardGroup?.tear5 + '%' : '---'}　　　${tear.tear5.length}人`}>
								<Table columns={columns} dataSource={tear.tear5} rowKey="_id" scroll={{ x: 800 }} />
							</Panel>
						</Collapse>
					</Card>
				</TabPane>
			</Tabs>
		</>
	)
}

export default Profile
