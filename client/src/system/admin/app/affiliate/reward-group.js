import React, { useEffect, useState } from 'react'
import { Row, Col, Card, InputNumber, Table, message, Input, Menu, Modal, Form, Button, Popconfirm } from 'antd';
import { 
	DeleteOutlined, 
	SearchOutlined,
	EditOutlined,
	PlusOutlined
 } from '@ant-design/icons';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import adminRewardGroup from "api/admin/rewardGroup";
import utils from 'plugins/utils';

const ADD = "Add";
const EDIT = "Edit";

const rules = {
	required: [{
		required: true,
		message: 'この項目は必須です!',
	}]
}

export const RewardGroup = () => {
	
	const [rewardGroups, setRewardGroups] = useState();
	const [list, setList] = useState([]);
	const [visibleModal, setVisibleModal] = useState(false);
	const [mode, setMode] = useState("");
	const [selectedRow, setSelectedRow] = useState();

	const [submit, setSubmit] = useState(false);
	const [searchKey, setSearchKey] = useState('');
	const [form] = Form.useForm();
	

	useEffect(()=>{
		adminRewardGroup.get()
		.then(res=>{
			setRewardGroups(res.data.rewardGroups);
		})
		.catch(()=>{
			message.error("エラーが発生しました!");
		})
	}, [])


	useEffect(()=>{
		if(rewardGroups){
			const data = utils.wildCardSearchWithKeys(rewardGroups, ["name"], searchKey);
			setList(data);
		}
	}, [rewardGroups, searchKey]);


	const tableColumns = [
		{
			title: 'Group',
			dataIndex: 'name',
			render: name => (
				<span>{ name }</span>
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
			title: '所属人数',
			dataIndex: 'countOfUser',
			render: countOfUser => (
				<span>{ countOfUser } 人</span>
			),
			sorter: {
				compare: (a, b) => {
					a = a.countOfUser;
					  b = b.countOfUser;
					return a > b ? -1 : b > a ? 1 : 0;
				},
			},
		},
		{
			title: 'Tear1',
			dataIndex: 'tear1',
			render: tear1 => (
				<span> {tear1} %</span>
			),
			sorter: (a, b) => a.tear1 - b.tear1,
		},
		{
			title: 'Tear2',
			dataIndex: 'tear2',
			render: tear2 => (
				<span> {tear2} %</span>
			),
			sorter: (a, b) => a.tear2 - b.tear2,
		},{
			title: 'Tear3',
			dataIndex: 'tear3',
			render: tear3 => (
				<span> {tear3} %</span>
			),
			sorter: (a, b) => a.tear3 - b.tear3,
		},{
			title: 'Tear4',
			dataIndex: 'tear4',
			render: tear4 => (
				<span> {tear4} %</span>
			),
			sorter: (a, b) => a.tear4 - b.tear4,
		},{
			title: 'Tear5',
			dataIndex: 'tear5',
			render: tear5 => (
				<span> {tear5} %</span>
			),
			sorter: (a, b) => a.tear5 - b.tear5,
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

	const dropdownMenu = row => (
		<Menu>
			<Menu.Item key="edit" onClick={() => {
				setSelectedRow(row);
				form.setFieldsValue({
					name: row.name,
					tear1: row.tear1 || 0,
					tear2: row.tear2 || 0,
					tear3: row.tear3 || 0,
					tear4: row.tear4 || 0,
					tear5: row.tear5 || 0,
				})
				showEditModal();
			}}>
				<Flex alignItems="center">
					<EditOutlined />
					<span className="ml-2">Edit</span>
				</Flex>
			</Menu.Item>
			<Popconfirm
				title="本当に削除しますか？"
				onConfirm={() => handleDelete(row._id)}
				okText="YES"
				cancelText="NO"
				placement="rightTop"
			> 
				<Menu.Item key="delete">
					<Flex alignItems="center">
						<DeleteOutlined />
						<span className="ml-2">Delete</span>
					</Flex>
				</Menu.Item>
			</Popconfirm>
		</Menu>
	);


	const onSearch = e => {
		const value = e.currentTarget.value
		setSearchKey(value);
	}

	const showAddModal = () => {
		form.resetFields();
		setVisibleModal(true);
		setMode(ADD);
	}

	const showEditModal = () => {
		setVisibleModal(true);
		setMode(EDIT);
	}

	const handleSave = () => {
		form.validateFields()
		.then(values => {
			let promise, msg;
			setSubmit(true);
			try {
				if (mode === ADD) {
					msg = "新規追加しました!"
					promise = adminRewardGroup.create(values)
				}
				else {
					msg = "更新しました!"
					promise = adminRewardGroup.update(selectedRow._id, values)
				}
				promise.then(res => {
					setSubmit(false);
					if (res.data.status_code === 200) {
						setRewardGroups(res.data.rewardGroups);
						setVisibleModal(false);
						message.success(msg);
					} else {
						message.error(res.data.message);
					}
				})
			} catch (err) {
				setSubmit(false);
				message.error(err.toString());
			}
		})
	}

	const handleDelete = (id) => {
		setSubmit(true);
		adminRewardGroup.delete(id)
		.then(res => {
			setSubmit(false);	
			switch (res.data.status_code) {
				case 200: {
					setRewardGroups(res.data.rewardGroups);
					message.success("削除しました!");
					break;
				}
				default: message.warning(res.data.message); break;
			}
		}).catch(err => {
			setSubmit(false);
			message.error(err.toString());
		})
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
				<Button type="primary mx-2"
					htmlType="submit"
					loading={submit}
					icon={<PlusOutlined />}
					onClick={showAddModal}
				>
					ADD
				</Button>
			</Flex>
			<div className="table-responsive">
				<Table
					columns={tableColumns}
					dataSource={list}
					rowKey="_id"
					loading={!rewardGroups}
				/>
			</div>
			<Modal
				title={`${mode} Group`}
				visible={visibleModal}
				onCancel={()=>setVisibleModal(false)}
				onOk = {handleSave}
				loading = {submit}
				okText="Save"
				cancelText="Cancel"
				width={1000}
			>
				<Form
					layout="vertical"
					form={form}
					name="advanced_search"
					className="ant-advanced-search-form"
				>
					<Row gutter={16}>
						<Col xs={24} sm={24} md={24}>
							<Form.Item name="name" label="Name" rules={rules.required}>
								<Input	className="w-100"/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={8}>
							<Form.Item name="tear1" label="Tear1" rules={rules.required}>
								<InputNumber
									className="w-100"
									min={0}
									max={100}
									addonBefore="%"
									formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={8}>
							<Form.Item name="tear2" label="Tear2" rules={rules.required}>
								<InputNumber
									className="w-100"
									min={0}
									max={100}
									addonBefore="%"
									formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={8}>
							<Form.Item name="tear3" label="Tear3" rules={rules.required}>
								<InputNumber
									className="w-100"
									min={0}
									max={100}
									addonBefore="%"
									formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={8}>
							<Form.Item name="tear4" label="Tear4" rules={rules.required}>
								<InputNumber
									className="w-100"
									min={0}
									max={100}
									addonBefore="%"
									formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={8}>
							<Form.Item name="tear5" label="Tear5" rules={rules.required}>
								<InputNumber
									className="w-100"
									min={0}
									max={100}
									addonBefore="%"
									formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								/>
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Modal>
		</Card>
	)
}

export default RewardGroup
