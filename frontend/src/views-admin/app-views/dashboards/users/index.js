import React, { useEffect, useState } from 'react'
import { Card, Table, Tag, Tooltip, message, Button } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import UserView from './UserView';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import userData from "assets/data/user-list.data.json";
import AdminService from "services/admin.service"

export const UserList = () => {

	const [users, setUsers] = useState(userData);
	const [userProfileVisible, setUserProfileVisible] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);


	useEffect(()=>{
		AdminService.adminGetUsers()
		.then(res=>{
			console.log(res.data);
		})
	}, [])


	const deleteUser = userId => {
		setUsers(users.filter(item => item.id !== userId))
		message.success({ content: `Deleted user ${userId}`, duration: 2 });
	}

	const showUserProfile = userInfo => {
		setUserProfileVisible(true);
		setSelectedUser(userInfo);
	};
	
	const closeUserProfile = () => {
		setUserProfileVisible(false);
		setSelectedUser(null);
	}

	const tableColumns = [
		{
			title: 'User',
			dataIndex: 'name',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus src={record.img} name={record.name} subTitle={record.email}/>
				</div>
			),
			sorter: {
				compare: (a, b) => {
					a = a.name.toLowerCase();
					  b = b.name.toLowerCase();
					return a > b ? -1 : b > a ? 1 : 0;
				},
			},
		},
		{
			title: 'Role',
			dataIndex: 'role',
			sorter: {
				compare: (a, b) => a.role.length - b.role.length,
			},
		},
		{
			title: 'Last online',
			dataIndex: 'lastOnline',
			render: date => (
				<span>{moment.unix(date).format("MM/DD/YYYY")} </span>
			),
			sorter: (a, b) => moment(a.lastOnline).unix() - moment(b.lastOnline).unix()
		},
		{
			title: 'Status',
			dataIndex: 'status',
			render: status => (
				<Tag className ="text-capitalize" color={status === 'active'? 'cyan' : 'red'}>{status}</Tag>
			),
			sorter: {
				compare: (a, b) => a.status.length - b.status.length,
			},
		},
		{
			title: '',
			dataIndex: 'actions',
			render: (_, elm) => (
				<div className="text-right d-flex justify-content-end">
					<Tooltip title="View">
						<Button type="primary" className="mr-2" icon={<EyeOutlined />} onClick={() => {showUserProfile(elm)}} size="small"/>
					</Tooltip>
					<Tooltip title="Delete">
						<Button danger icon={<DeleteOutlined />} onClick={()=> {deleteUser(elm.id)}} size="small"/>
					</Tooltip>
				</div>
			)
		}
	];

	return (
		<Card title="User List">
			<div className="table-responsive">
				<Table columns={tableColumns} dataSource={users} rowKey='id' />
			</div>
			<UserView data={selectedUser} visible={userProfileVisible} close={closeUserProfile}/>
		</Card>
	)
}

export default UserList
