import { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
	fetchPurchaseHistory,
	fetchOwnedCoins,
} from "redux/actions";
import { Card, Table, Input, Menu, Tooltip } from 'antd';
import { EyeOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex';
import utils from 'plugins/utils';
import { shorter, tokenLink } from 'contracts/hooks';
import YenFormat from 'components/custom/YenFormat';
import { imageUri } from 'services/image';

const OwnedCoins = (props) => {
	const history = useHistory();
	const [list, setList] = useState([]);
	const {
		ownedCoins,
		loadedOwnedCoins,
		fetchOwnedCoins,
		// purchaseHistory,
		// loadedPurchaseHistory,
		fetchPurchaseHistory,
	} = props;

	useEffect(() => {
		fetchOwnedCoins();
		fetchPurchaseHistory();
	}, [fetchOwnedCoins, fetchPurchaseHistory])

	useEffect(() => {
		setList(ownedCoins);
	}, [ownedCoins])

	const dropdownMenu = row => (
		<Menu key={row.id}>
			<Menu.Item onClick={() => history.push(`/admin/coins/detail/${row.tokenId}`)} key="view">
				<Flex alignItems="center">
					<EyeOutlined />
					<span className="ml-2">View</span>
				</Flex>
			</Menu.Item>
			<Menu.Item onClick={() => history.push(`/admin/coins/edit/${row.tokenId}`)} key="edit">
				<Flex alignItems="center">
					<EditOutlined />
					<span className="ml-2">Edit</span>
				</Flex>
			</Menu.Item>
		</Menu>
	);

	const tableColumns = [
		{
			title: 'ID',
			dataIndex: 'tokenId',
			fixed: 'left',
			width: 100,
			render: tokenId => (
				<div className="d-flex">
					<a href={tokenLink("AQCT1155", tokenId)} target="_blank" rel="noreferrer">{tokenId}</a>
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'tokenId')
		},
		{
			title: 'コイン',
			dataIndex: 'name',
			width: 450,
			render: (_, record) => (
				<AvatarStatus size={60} type="square"
					src={imageUri(record.images && record.images[0])}
					name={record.name}
					subTitle={record.grade}
				/>
			),
		},
		{
			title: '参考取引価格',
			dataIndex: 'refPrice',
			render: refPrice => (
				<YenFormat value={refPrice} />
			),
		},
		{
			title: '発行数 / 保有枠数',
			dataIndex: 'amount',
			render: (_, record) => (
				<div className="d-flex">
					{record.totalSupply} / {record.amount}
				</div>
			),
		},
		{
			title: '保有者',
			dataIndex: 'owner',
			render: owner => (
				<Tooltip title={owner} placement="top">
					<span className="cursor-pointer" onClick={() => utils.copyClipboard(owner)}>
						{shorter(owner)}</span>
				</Tooltip>
			),
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

	const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = ownedCoins
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
	}

	return (
		<Card>
			<Flex className="mb-3" alignItems="center" mobileFlex={false}>
				<div className="mr-md-3 mb-3">
					<Input placeholder="Search"
						prefix={<SearchOutlined />}
						addonAfter={`Result: ${list?.length || 0}`}
						onChange={e => onSearch(e)}
					/>
				</div>
			</Flex>
			<div className="table-responsive">
				<Table
					rowKey="uri"
					columns={tableColumns}
					dataSource={list}
					loading={!loadedOwnedCoins}
					scroll={{ x: 1100 }}
				/>
			</div>
		</Card>
	)
}

export default connect(
	({ marketplace }) => (marketplace), {
	fetchOwnedCoins,
	fetchPurchaseHistory,
})(OwnedCoins);