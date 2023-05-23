import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { Avatar, Drawer, Divider, Button, Select, Modal, message } from 'antd';
import {
	MobileOutlined,
	MailOutlined,
	UserOutlined,
	CalendarOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import utils from 'plugins/utils';
import api from 'api';
import { imageUri } from 'services/image';

const { Option } = Select;

const UserView = ({ data, visible, close }) => {
	const [affiliaters, setAffiliaters] = useState();
	const [users, setUsers] = useState([]);
	const [userEmails, setUserEmails] = useState([]);
	const [visibleModal, setVisibleModal] = useState(false);

	useEffect(() => {
		try {
			api.adminUser.getAffiliaters().then(res => {
				setAffiliaters(res.data);
			});
			api.adminUser.getAll().then(res => {
				setUsers(res.data.users);
			});
		} catch {
			message.error("エラーが発生しました。")
		}
	}, [])

	const handleAdd = () => {
		try {
			if (userEmails.length) {
				api.adminUser.connectUsersToAffiliater(data.id, userEmails).then(res => {
					setAffiliaters(res.data);
					setVisibleModal(false);
					setUserEmails([]);
					window.location.reload();
				});
			}
			else setVisibleModal(false);
		} catch {
			message.error("エラーが発生しました。")
		}
	}

	if (!data) return null;
	return (
		<Drawer
			width={300}
			placement="right"
			onClose={close}
			closable={false}
			visible={visible}
		>
			<div className="text-center mt-3">
				<Avatar size={80} src={imageUri(data.avatar)} icon={<UserOutlined />} />
				<h3 className="mt-2 mb-0">{data.name}</h3>
				<span className="text-muted">{data.nickname}</span>
			</div>
			<Divider dashed />
			<div className="">
				<h6 className="text-muted text-uppercase mb-3">Account details</h6>
				<p>
					<UserOutlined />
					<span className="ml-3 text-dark">ID:　{data.id}</span>
				</p>
				<p>
					<UserOutlined />
					<span className="ml-3 text-dark">Name:　{data.personalInfo?.name}</span>
				</p>
				<p>
					<CalendarOutlined />
					<span className="ml-3 text-dark">Birth:　{data.personalInfo?.birthday && moment(data.personalInfo?.birthday).format("YYYY/MM/DD")}</span>
				</p>
			</div>
			<div className="mt-5">
				<h6 className="text-muted text-uppercase mb-3">CONTACT</h6>
				{
					data.personalInfo?.phoneNumber &&
					<p>
						<MobileOutlined />
						<span className="ml-3 text-dark">Tel:　{data.personalInfo?.phoneNumber}</span>
					</p>
				}
				{
					data.email &&
					<p>
						<MailOutlined />
						<span className="ml-3 text-dark">Email:　{data.email}</span>
					</p>
				}
			</div>
			<Button className='w-100 mt-5'
				onClick={() => setVisibleModal(true)}
			>アフィリエイトを紐づ</Button>
			<Link to={`/admin/users/${data.id}`}>
				<Button className='w-100 mt-3'>詳細</Button>
			</Link>
			<Modal
				title="アフィリエイトを紐づ"
				visible={visibleModal}
				onOk={() => handleAdd()}
				onCancel={() => setVisibleModal(false)}
			>
				<p>アフィリエイターに手動でユーザーを紐づける</p>
				<small>手動で紐づしたいユーザーの選択:</small>
				<Select
					mode="multiple"
					tokenSeparators={[',']}
					className="w-100 mt-1"
					value={userEmails}
					onChange={value => setUserEmails(value)}
				>
					{
						users.map((user) => (
							user.email !== data.email &&
							!user.introducer &&
							utils.wildCardSearchWithKeys(affiliaters, 'email', user.email).length === 0
						) &&
							<Option key={user.email}>{user.email}</Option>)
					}
				</Select>
			</Modal>
		</Drawer>
	)
}

export default UserView
