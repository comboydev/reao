import React, { useEffect, useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import { Card, Table, message, Input, Menu } from 'antd';
import {
	EyeOutlined,
	SearchOutlined,
} from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import adminUser from "api/admin/user";
import utils from 'plugins/utils';

export const AffiliateList = () => {
	const [affiliaters, setAffiliaters] = useState();
	const [list, setList] = useState();
	const [searchKey, setSearchKey] = useState('');
	const history = useHistory();

	useEffect(() => {
		try {
			adminUser.getAffiliaters().then(res => {
				setAffiliaters(res.data);
			});
		} catch {
			message.error("エラーが発生しました。")
		}
	}, [])


	const tableColumns = [
		{
			title: 'アフィリエイター',
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
				<Link to={'/admin/users/' + introducer?._id}>{introducer?.email}</Link>
			),
		},
		{
			title: '所属報酬グループ',
			dataIndex: 'rewardGroup',
			width: 200,
			render: rewardGroup => (
				<span>{rewardGroup?.name}</span>
			),
		},
		{
			title: 'Tear1',
			dataIndex: 'tear',
			render: tear => {
				if (tear.tear1 > 0)
					return <span>{tear.tear1} 人</span>
			},
			sorter: (a, b) => a.tear?.tear1 - b.tear?.tear1
		},
		{
			title: 'Tear2',
			dataIndex: 'tear',
			render: tear => {
				if (tear.tear2 > 0)
					return <span>{tear.tear2} 人</span>
			},
			sorter: (a, b) => a.tear?.tear2 - b.tear?.tear2
		},
		{
			title: 'Tear3',
			dataIndex: 'tear',
			render: tear => {
				if (tear.tear3 > 0)
					return <span>{tear.tear3} 人</span>
			},
			sorter: (a, b) => a.tear?.tear3 - b.tear?.tear3
		},
		{
			title: 'Tear4',
			dataIndex: 'tear',
			render: tear => {
				if (tear.tear4 > 0)
					return <span>{tear.tear4} 人</span>
			},
			sorter: (a, b) => a.tear?.tear4 - b.tear?.tear4
		},
		{
			title: 'Tear5',
			dataIndex: 'tear',
			render: tear => {
				if (tear.tear5 > 0)
					return <span>{tear.tear5} 人</span>
			},
			sorter: (a, b) => a.tear?.tear5 - b.tear?.tear5
		},
		{
			title: '',
			dataIndex: 'actions',
			width: 50,
			render: (_, elm) => (
				<div className="text-right">
					<EllipsisDropdown menu={dropdownMenu(elm)} />
				</div>
			)
		}
	];

	const dropdownMenu = row => (
		<Menu>
			<Menu.Item key="view" onClick={() => history.push(`/admin/users/${row._id}`)}>
				<Flex alignItems="center">
					<EyeOutlined />
					<span className="ml-2">View</span>
				</Flex>
			</Menu.Item>
		</Menu>
	);


	const onSearch = e => {
		const value = e.currentTarget.value
		setSearchKey(value);
	}

	useEffect(() => {
		if (affiliaters) {
			var keys = ['personalInfo', 'email', 'id', 'nickname'];
			const data = utils.wildCardSearchWithKeys(affiliaters, keys, searchKey);
			setList(data);
		}
	}, [affiliaters, searchKey]);

	return (
		<Card>
			<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
				<Flex className="mb-1" mobileFlex={false}>
					<div className="mr-md-3 mb-3">
						<Input placeholder="Search"
							prefix={<SearchOutlined />}
							addonAfter={`Result: ${list?.length || 0}`}
							onChange={e => onSearch(e)}
						/>
					</div>
				</Flex>
			</Flex>
			<div className="table-responsive">
				<Table
					columns={tableColumns}
					dataSource={list}
					rowKey="_id"
					loading={!affiliaters}
					scroll={{ x: 1200 }}
				/>
			</div>
		</Card>
	)
}

export default AffiliateList
