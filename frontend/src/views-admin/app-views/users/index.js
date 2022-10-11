import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { Card, Table, Tag, Tooltip, message, Button,  Input, Select, Popconfirm } from 'antd';
import { 
	EyeOutlined, 
	SearchOutlined,
	DeleteOutlined
 } from '@ant-design/icons';
import moment from 'moment';
import UserView from './UserView';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import Flex from 'components/shared-components/Flex'
import AdminService from "services/admin.service";
import utils from 'utils'

const { Option } = Select


const STATUS = [
	{
		color: 'volcano',
		title: '未'
	},
	{
		color: 'blue',
		title: '申請中'
	},
	{
		color: 'cyan',
		title: '済み'
	}
];

const userStatusList = [
	{ key: 'all', label: 'All', value: -1},
	{ key: 'identityVerified',   label: '本人確認未', value: -1 },
	{ key: 'identityVerified',   label: '本人確認申請中', value: 0 },
	{ key: 'identityVerified',   label: '本人確認済み', value: 1 },
	{ key: 'emailVerified',label: 'メール認証未', value: false },
	{ key: 'emailVerified',label: 'メール認証済み', value: true },
	// { key: 'actived',         label: 'Actived', value: 1 },
	// { key: 'actived',         label: 'Blocked', value: 0 },
]


export const UserList = () => {
	
	const [users, setUsers] = useState();
	const [list, setList] = useState()
	const [userProfileVisible, setUserProfileVisible] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);

	const [searchKey, setSearchKey] = useState('');
	const [indexSelectBox, setIndexOfSelectBox] = useState(0);


	useEffect(()=>{
		AdminService.adminGetUsers()
		.then(res=>{
			setUsers(res.data.users);
		})
		.catch(()=>{
			message.error("エラーが発生しました。")
		})
	}, [])


	const showUserProfile = userInfo => {
		setUserProfileVisible(true);
		setSelectedUser(userInfo);
	};
	
	const closeUserProfile = () => {
		setUserProfileVisible(false);
		setSelectedUser(null);
	}

	const deleteUser = async (id) => {
		try {
			let res = await AdminService.adminDeleteUser(id);
			let { status_code, users } = res.data;
			if (status_code === 200) {
				setUsers(users);
				message.success("ユーザーを削除しました!")
			} else {
				message.warning(res.data.message)
			}
		}
		catch(err) {
			message.error("エラーが発生しました。")
		}
	}

	const tableColumns = [
		{
			title: '名前',
			dataIndex: 'name',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus src={record.avatar} name={record.nickname} subTitle={record.email}/>
				</div>
			),
			sorter: {
				compare: (a, b) => {
					a = a.email.toLowerCase();
					  b = b.email.toLowerCase();
					return a > b ? -1 : b > a ? 1 : 0;
				},
			},
		},
		{
			title: '紹介者',
			dataIndex: 'introducer',
			render: introducer => (
				<Link to={'/admin/users/' + introducer?._id}>{ introducer?.email }</Link>
			),
			sorter: {
				compare: (a, b) => {
					a = a.email.toLowerCase();
					  b = b.email.toLowerCase();
					return a > b ? -1 : b > a ? 1 : 0;
				},
			},
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
			title: '本人確認',
			dataIndex: 'identityVerified',
			render: identityVerified => (
				<Tag className ="text-capitalize" 
					color={STATUS[identityVerified + 1].color}>
						{STATUS[identityVerified + 1].title}
				</Tag>
			),
			sorter: {
				compare: (a, b) => a.identityVerified - b.identityVerified,
			},
		},
		{
			title: 'メール認証',
			dataIndex: 'emailVerified',
			render: emailVerified => (
				<Tag className ="text-capitalize" 
					color={ !emailVerified ? 'volcano' : 'cyan'}>
						{ !emailVerified ? '未' : '済み'}
				</Tag>
			),
			sorter: {
				compare: (a, b) => a.emailVerified - b.emailVerified,
			},
		},
		// {
		// 	title: 'Status',
		// 	dataIndex: 'actived',
		// 	render: actived => (
		// 		<Tag className ="text-capitalize" 
		// 			color={ !actived ? 'volcano' : 'cyan'}>
		// 				{ !actived ? 'Blocked' : 'Active'}
		// 		</Tag>
		// 	),
		// 	sorter: {
		// 		compare: (a, b) => a.actived - b.actived,
		// 	},
		// },
		{
			title: '',
			dataIndex: 'actions',
			render: (_, elm) => (
				<div className="text-right d-flex justify-content-end">
					<Tooltip title="View">
						<Button type="primary" className="mr-2" icon={<EyeOutlined />} onClick={() => {showUserProfile(elm)}} size="small"/>
					</Tooltip>
					<Tooltip title="Delete">
						<Popconfirm
							title="本当に削除しますか？"
							onConfirm={()=> {deleteUser(elm._id)}}
							okText="YES"
							cancelText="NO"
							placement="rightTop"
						> 
							<Button danger icon={<DeleteOutlined />} size="small"/>
						</Popconfirm>
					</Tooltip>
				</div>
			)
		}
	];


	const onSearch = e => {
		const value = e.currentTarget.value
		setSearchKey(value);
	}

	const changeSelectBox = (value) => {
		setIndexOfSelectBox(value);
	}

	useEffect(()=>{
		if(users){
			var keys = ['personalInfo', 'email', 'id', 'nickname'];
			const data = utils.wildCardSearchWithKeys(users, keys, searchKey);
			if(indexSelectBox === 0){
				setList(data);
			} else {
				let key = userStatusList[indexSelectBox].key;
				let value = userStatusList[indexSelectBox].value;
				let result = utils.filterArray(data, key, value);
				setList(result);
			}
		}
	}, [users, indexSelectBox, searchKey]);



	if(!users) return null;
	return (
		<Card>
			<Flex className="mb-3" alignItems="center" justifyContent="between" mobileFlex={false}>
				<div className="mr-md-3 mb-3">
					<Input placeholder="Search"
						prefix={<SearchOutlined />} 
						addonAfter={`Result: ${list?.length}`}
						onChange={e => onSearch(e)}
					/>
				</div>
				<div className="mb-3">
					<Select 
						defaultValue={0} 
						className="w-100" 
						style={{ minWidth: 180 }} 
						onChange={changeSelectBox} 
						placeholder="Status"
					>
						{userStatusList.map((elm, index) => <Option key={elm.label} value={index}>{elm.label}</Option>)}
					</Select>
				</div>
			</Flex>
			<div className="table-responsive">
				<Table columns={tableColumns} dataSource={list} rowKey="_id"/>
			</div>
			<UserView data={selectedUser} visible={userProfileVisible} close={closeUserProfile}/>
		</Card>
	)
}

export default UserList
