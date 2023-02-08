import React, { useState, useEffect } from "react";
import { Input, Button, Tooltip, Collapse, Table, Tag, Avatar, Card } from "antd";
import {
	CopyOutlined,
	CheckOutlined,
} from '@ant-design/icons';
import copy from 'copy-to-clipboard';
import Loading from 'components/shared-components/Loading';
import api from 'api';
import { connect } from "react-redux";

const { Panel } = Collapse;

const columns = [
	{
		title: '',
		dataIndex: 'avatar',
		key: 'avatar',
		render: img => <Avatar src={img}>U</Avatar>
	},
	{
		title: 'Email',
		dataIndex: 'email',
		key: 'email',
		render: email => <span>{email}</span>,
	},
	{
		title: '紹介ID',
		key: 'id',
		dataIndex: 'id',
		render: id => <Tag color="blue" >{id.toUpperCase()}</Tag>,
	},
];


const Partner = ({ user }) => {
	const _introducer = `${window.location.origin}/register?introducer=${user.id}`;

	const [copied, setCopied] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [tear, setTear] = useState({
		tear1: [],
		tear2: [],
		tear3: [],
		tear4: [],
		tear5: []
	})
	const [rewardGroup, setRewardGroup] = useState({});

	useEffect(() => {
		async function fetchData() {
			setRewardGroup(user);
			const { data } = await api.userProfile.getPartners();
			setTear(data);
			setLoaded(true);
		}
		fetchData()
	}, [user])

	const copyURL = () => {
		setCopied(true);
		copy(_introducer);
	}

	const disCopyURL = () => {
		setCopied(false);
	}

	return (
		<section className="p-card px-0 partner">
			<div className="c-header">
				<h3 className="c-header--title">アフィリエイト管理</h3>
				<p className="c-header--subtitle">Affiliate Management</p>
			</div>
			<div className="max-w900 mx-auto mt-20 px-3">
				<Input.Group compact>
					<Input
						style={{ width: 'calc(100% - 40px)', textAlign: 'center', fontWeight: '600' }}
						addonBefore="紹介URL"
						value={_introducer}
						size="large"
					/>
					<Tooltip title={copied ? "Copied" : "Copy"}>
						<Button
							icon={copied ? <CheckOutlined /> : < CopyOutlined />}
							onClick={copyURL}
							onBlur={disCopyURL}
							size="large"
						/>
					</Tooltip>
				</Input.Group>

				<Card title="紹介者ユーザー一覧" className="mt-5">
					{
						loaded ?
							<Collapse defaultActiveKey={['1']}>
								<Panel key="1" header="TEAR 1" extra={`報酬: ${rewardGroup?.tear1 ? rewardGroup.tear1 + '%' : '---'}　　　${tear.tear1.length}人`}>
									<Table columns={columns} dataSource={tear.tear1} rowKey="id" />
								</Panel>
								<Panel key="2" header="TEAR 2" extra={`報酬: ${rewardGroup?.tear2 ? rewardGroup.tear2 + '%' : '---'}　　　${tear.tear2.length}人`}>
									<Table columns={columns} dataSource={tear.tear2} rowKey="id" />
								</Panel>
								<Panel key="3" header="TEAR 3" extra={`報酬: ${rewardGroup?.tear3 ? rewardGroup.tear3 + '%' : '---'}　　　${tear.tear3.length}人`}>
									<Table columns={columns} dataSource={tear.tear3} rowKey="id" />
								</Panel>
								<Panel key="4" header="TEAR 4" extra={`報酬: ${rewardGroup?.tear4 ? rewardGroup.tear4 + '%' : '---'}　　　${tear.tear4.length}人`}>
									<Table columns={columns} dataSource={tear.tear4} rowKey="id" />
								</Panel>
								<Panel key="5" header="TEAR 5" extra={`報酬: ${rewardGroup?.tear5 ? rewardGroup.tear5 + '%' : '---'}　　　${tear.tear5.length}人`}>
									<Table columns={columns} dataSource={tear.tear5} rowKey="id" />
								</Panel>
							</Collapse>
							: <Loading />
					}
				</Card>
			</div>
		</section>
	);
}

export default connect(({ appStore }) => appStore)(Partner)