/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Card, Table, Select, Input, Badge, Menu, Tag, message } from 'antd';
import { EyeOutlined, SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import moment from 'moment';
import utils from 'plugins/utils'
import api from 'api';
import { PaymentStatusKv, OrderStatusKv } from 'constants/AppConstant';
import YenFormat from 'components/custom/YenFormat';
import TNumberFormat from 'components/custom/TNumberFormat';
import { imageUri } from 'services/image';

const { Option } = Select

const Orders = () => {
	const [loaded, setLoaded] = useState(false);
	const [list, setList] = useState([]);
	const [_rawData, setRawData] = useState([]);
	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])

	useEffect(() => {
		api.adminOrder.fetch()
			.then(res => {
				setLoaded(true);
				setList(res.data);
				setRawData(res.data);
			})
			.catch(err => {
				message.error("失敗しました。");
			})
	}, []);

	const handleShowStatus = value => {
		if (value !== 'All') {
			const key = 'paymentStatus'
			const data = utils.filterArray(_rawData, key, value)
			setList(data)
		} else {
			setList(_rawData)
		}
	}

	const dropdownMenu = row => (
		<Menu>
			<Menu.Item>
				<Flex alignItems="center">
					<EyeOutlined />
					<span className="ml-2">View</span>
				</Flex>
			</Menu.Item>
			<Menu.Item>
				<Flex alignItems="center">
					<DeleteOutlined />
					<span className="ml-2">{selectedRows.length > 0 ? `Delete (${selectedRows.length})` : 'Delete'}</span>
				</Flex>
			</Menu.Item>
		</Menu>
	);

	const tableColumns = [
		{
			title: 'コイン',
			dataIndex: 'name',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus size={30} src={imageUri(record.coin.mainImage)} name={record.coin.name.slice(0, 10) + '...'} />
				</div>
			),
			sorter: {
				compare: (a, b) => {
					a = a.coin.name.toLowerCase();
					b = b.coin.name.toLowerCase();
					return a > b ? -1 : b > a ? 1 : 0;
				},
			},
		},
		{
			title: '注文日',
			dataIndex: 'createdAt',
			render: createdAt => (
				<span>{moment(createdAt).format("YYYY-MM-DD")}</span>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'createdAt')
		},
		{
			title: 'オーナー券価格',
			dataIndex: 'cost',
			render: (_, record) => (
				<span className="font-weight-semibold">
					<YenFormat value={record.ownership.cost} />
				</span>
			),
			sorter: (a, b) => a.ownership.cost - b.ownership.cost
		},
		{
			title: '注文枚数',
			dataIndex: 'orderCount',
			render: (_, record) => (
				<span className="font-weight-semibold">
					<TNumberFormat
						value={record.orderCount}
						suffix={' 枚'}
					/>
				</span>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'orderCount')
		},
		{
			title: 'Order Status',
			dataIndex: 'orderStatus',
			render: orderStatus => (
				<><Tag color={OrderStatusKv[orderStatus].color}>{OrderStatusKv[orderStatus].label}</Tag></>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'orderStatus')
		},
		{
			title: 'Payment Status',
			dataIndex: 'paymentStatus',
			render: paymentStatus => (
				<><Badge status={PaymentStatusKv[paymentStatus].color} /><span>{PaymentStatusKv[paymentStatus].label}</span></>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'paymentStatus')
		},
		{
			title: '',
			dataIndex: 'actions',
			render: (_, elm) => (
				<div className="text-right">
					<EllipsisDropdown menu={dropdownMenu(elm)} />
				</div>
			)
		}
	];

	const rowSelection = {
		onChange: (key, rows) => {
			setSelectedRows(rows)
			setSelectedRowKeys(key)
		}
	};

	const onSearch = e => {
		const value = e.currentTarget.value
		let data = utils.wildCardSearchWithKeys(_rawData, ["coin"], value);
		setList(data)
	}

	return (
		<Card>
			<Flex className="mb-3" alignItems="center" justifyContent="between" mobileFlex={false}>
				<div className="mr-md-3 mb-3">
					<Input placeholder="Search"
						prefix={<SearchOutlined />}
						addonAfter={`Result: ${list?.length || 0}`}
						onChange={e => onSearch(e)} />
				</div>
				<div className="mb-3">
					<Select
						defaultValue="All"
						className="w-100"
						style={{ minWidth: 180 }}
						onChange={handleShowStatus}
						placeholder="Status"
					>
						<Option value="All">All</Option>
						{PaymentStatusKv.map((elm, key) => <Option key={key} value={key}>{elm.label}</Option>)}
					</Select>
				</div>
			</Flex>
			<div className="table-responsive">
				<Table
					columns={tableColumns}
					dataSource={list}
					rowKey='id'
					loading={!loaded}
					rowSelection={{
						selectedRowKeys: selectedRowKeys,
						type: 'checkbox',
						preserveSelectedRowKeys: false,
						...rowSelection,
					}}
				/>
			</div>
		</Card>
	)
}

export default Orders
