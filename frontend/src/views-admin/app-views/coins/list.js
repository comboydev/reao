import { useState, useEffect } from 'react'
import { Card, Table, Select, Input, Button, Popconfirm, Menu, message } from 'antd';
import { EyeOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import { useHistory } from "react-router-dom";
import moment from "moment";
import utils from 'utils'
import { APP_PREFIX_PATH } from 'configs/AppConfig';
import AdminService from 'services/admin.service';
import { create } from 'lodash';

const { Option } = Select


const CoinList = () => {
	let history = useHistory();

	const [coins, setCoins] = useState([]);
	const [list, setList] = useState([])
	const [selectedRows, setSelectedRows] = useState([])
	const [loaded, setLoaded] = useState(false);

	useEffect(()=>{
		AdminService.adminGetAllCoins()
		.then(res => {
			setLoaded(true);
			setCoins(res.data);
			setList(res.data);
		})
		.catch(err => {
			console.log(err);
			message.error("失敗しました。");
		})
	}, [])

	const dropdownMenu = row => (
		<Menu key={row.id}>
			<Menu.Item onClick={() => viewDetails(row)} key="view">
				<Flex alignItems="center">
					<EyeOutlined />
					<span className="ml-2">View</span>
				</Flex>
			</Menu.Item>
			<Popconfirm
				title="本当に削除しますか？"
				onConfirm={() => deleteRow(row)}
				okText="YES"
				cancelText="NO"
			> 
				<Menu.Item key="delete">
						<Flex alignItems="center">
							<DeleteOutlined />
							<span className="ml-2">{selectedRows.length > 0 ? `Delete (${selectedRows.length})` : 'Delete'}</span>
						</Flex>
				</Menu.Item>
			</Popconfirm>
		</Menu>
	);
	
	const addCoin = () => {
		history.push(`${APP_PREFIX_PATH}/coins/add`)
	}
	
	const viewDetails = row => {
		history.push(`${APP_PREFIX_PATH}/coins/detail/${row.id}`)
	}
	
	const deleteRow = row => {
		let coinIDs = [];
		const objKey = 'id'
		let data = list
		if(selectedRows.length > 0) {
			selectedRows.forEach(elm => {
				coinIDs.push(elm.id);
			})
		} else {
			coinIDs.push(row.id);
		}
		AdminService.adminDeleteCoins(coinIDs)
		.then(res => {
			message.success(`${coinIDs.length}個のコインを削除しました！`)
			coinIDs.forEach(id => {
				data = utils.deleteArrayRow(data, objKey, id)
				setList(data)
				setSelectedRows([])
			})
		})
		.catch(err => {
			message.error("削除失敗しました。");
		})
	}

	const tableColumns = [
		{
			title: 'コイン',
			dataIndex: 'name',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus size={60} type="square" src={record.mainImage} name={record.name} subTitle={record.grade}/>
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
		},
		{
			title: 'オーナー権価格',
			dataIndex: 'cost',
			render: cost => (
				<div>
					<NumberFormat
						displayType={'text'} 
						value={cost} 
						prefix={'￥'} 
						thousandSeparator={true} 
					/>
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'cost')
		},
		{
			title: '発行枚数',
			dataIndex: 'totalCount',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'totalCount')
		},
		{
			title: '出品日',
			dataIndex: 'created_at',
			render: created_at => (
				<span className='text-muted'>{moment(created_at).format("MM/DD/YYYY")}</span>
			),
			sorter: (a, b) => moment(a.created_at) - moment(b.created_at)
		},
		{
			title: '',
			dataIndex: 'actions',
			render: (_, elm) => (
				<div className="text-right">
					<EllipsisDropdown menu={dropdownMenu(elm)}/>
				</div>
			)
		}
	];
	
	const rowSelection = {
		onChange: (key, rows) => {
			setSelectedRows(rows)
		}
	};

	const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = coins
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
	}



	if( !loaded || !list) return null;
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
				<div>
					<Button onClick={addCoin} type="primary" icon={<PlusCircleOutlined />} block>Add Coin</Button>
				</div>
			</Flex>
			<div className="table-responsive">
				<Table 
					columns={tableColumns} 
					dataSource={list} 
					rowKey='id' 
					rowSelection={rowSelection}
				/>
			</div>
		</Card>
	)
}

export default CoinList
