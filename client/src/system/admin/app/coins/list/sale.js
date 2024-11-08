import { useState, useEffect } from 'react'
import { connect, useSelector } from "react-redux";
import {
	fetchSaleHistory,
	fetchCoinsOnSale,
} from "redux/actions";
import { Card, Table, Input, Button, Menu, message, Tooltip, Tag, Popconfirm } from 'antd';
import { EyeOutlined, SearchOutlined, DeleteOutlined, LinkOutlined } from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import utils from 'plugins/utils';
import { SOLD_STATUS } from 'constants/AppConstant';
import Marketplace from 'contracts/services/marketplace';
import { getContractAddress, shorter, tokenLink } from 'contracts/hooks';
import YenFormat from 'components/custom/YenFormat';

const CoinsOnSale = (props) => {
	const {
		fetchCoinsOnSale,
		fetchSaleHistory,
		// saleHistory,
		// loadedSaleHistory,
	} = props;

	const [list, setList] = useState([]);
	const [submit, setSubmit] = useState(false);

	const coinsOnSale = useSelector(({ marketplace }) => marketplace.coinsOnSale)
	const loadedCoinsOnSale = useSelector(({ marketplace }) => marketplace.loadedCoinsOnSale)

	useEffect(() => {
		fetchCoinsOnSale();
		fetchSaleHistory();
	}, [fetchCoinsOnSale, fetchSaleHistory]);

	useEffect(() => {
		setList(coinsOnSale);
	}, [coinsOnSale])

	const dropdownMenu = row => (
		<Menu key={row.id}>
			<Menu.Item onClick={() => window.location.href = `/admin/marketplace/items/${row.itemId}`} key="view">
				<Flex alignItems="center">
					<EyeOutlined />
					<span className="ml-2">View</span>
				</Flex>
			</Menu.Item>
			<Popconfirm
				title="本当に引き出しますか？"
				onConfirm={() => handleWithdraw(row.itemId)}
				okText="YES"
				cancelText="NO"
				placement="rightTop"
			>
				<Menu.Item key="delete">
					<Flex alignItems="center">
						<DeleteOutlined />
						<span className="ml-2">Withdraw</span>
					</Flex>
				</Menu.Item>
			</Popconfirm>
		</Menu>
	);

	const handleWithdraw = async (id) => {
		try {
			setSubmit(true);
			await Marketplace.withdrawItem(id);
			setSubmit(false);
			message.success("引き出しました。");
		} catch {
			setSubmit(false);
			message.error("Transaction Failed.");
		}
	}

	const tableColumns = [
		{
			title: 'ID',
			dataIndex: 'tokenId',
			fixed: 'left',
			width: 100,
			render: tokenId => (
				<div className="d-flex">
					<a href={
						tokenLink("AQCT1155", tokenId)
					} target="_blank" rel="noreferrer">{tokenId}</a>
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'tokenId')
		},
		{
			title: 'コイン',
			dataIndex: 'name',
			width: 450,
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus
						size={60}
						type="square"
						src={record.image}
						name={record.name}
						subTitle={record.grade.name}
					/>
				</div>
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
			title: '発行数 / 販売数',
			dataIndex: 'totalSupply',
			render: (_, record) => (
				<div className="d-flex">
					{record.totalSupply} / {record.amount}
				</div>
			),
		},
		{
			title: 'オーナー券価格',
			dataIndex: 'price',
			render: price => (
				<YenFormat value={price} />
			),
		},
		{
			title: '販売者',
			dataIndex: 'seller',
			render: seller => (
				<Tooltip title={seller} placement="top">
					<span className="cursor-pointer" onClick={() => utils.copyClipboard(seller)}>
						{shorter(seller)}</span>
				</Tooltip>
			),
		},
		{
			title: '',
			dataIndex: 'isSold',
			width: 100,
			render: isSold => (
				<Tag className="text-capitalize"
					color={SOLD_STATUS[isSold ? 1 : 0].color}>
					{SOLD_STATUS[isSold ? 1 : 0].label}
				</Tag>
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
		const searchArray = coinsOnSale
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
	}

	return (
		<Card>
			<Flex className="mb-3" alignItems="center" justifyContent="between" mobileFlex={false}>
				<div className="mr-md-3 mb-3">
					<Input placeholder="Search"
						prefix={<SearchOutlined />}
						addonAfter={`Result: ${list?.length || 0}`}
						onChange={e => onSearch(e)}
					/>
				</div>
				<Button type='link'
					href={tokenLink("AQCT1155", getContractAddress('FantationMarket'))}
					target="_blank" rel="noreferrer"
					icon={<LinkOutlined />}
				/>
			</Flex>
			<div className="table-responsive">
				<Table
					columns={tableColumns}
					dataSource={list}
					rowKey='itemId'
					loading={!loadedCoinsOnSale || submit}
					scroll={{ x: 1300 }}
				/>
			</div>
		</Card>
	)
}

export default connect(() => ({}), {
	fetchCoinsOnSale,
	fetchSaleHistory,
})(CoinsOnSale);