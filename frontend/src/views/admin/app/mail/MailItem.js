import React, { Component } from 'react'
import { Table, Badge, Tooltip, Input, Popconfirm, message } from 'antd';
import { StarOutlined, StarFilled, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import { getLabelColor } from './MailLabels';
import AdminService from 'services/admin.service';

export class MailItem extends Component {

	state = {
		MailData: [],
		mails: [],
		selectedRowKeys: [],
		searchValue: '',
		loaded: false,
		starred: false,
	};


	componentDidMount() {
		this.fetchMailData();
	}


	componentDidUpdate(prevProps) {
		if (this.props.location.pathname !== prevProps.location.pathname) {
			this.fetchMailData();
			this.setState({
				starred: false
			})
		}
	}
	

	formatBody = body => {
		return body.replace(/<(?:.|\n)*?>/gm, ' ');
	}


	fetchMailData(){
		AdminService.adminGetMails()
		.then(res => {
			this.setState({
				loaded: true,
				MailData: res.data,
			})
			this.filterMailData()
		})
	}


	filterMailData = () => {
		const data = this.getCurrentCategory();
		this.setState({
			mails: data,
			selectedRowKeys: [],
		})
	}


	getCurrentCategory = () => {
		const { category } = this.props.match.params;
		switch (category) {
			case 'starred':
				return  this.state.MailData.filter( elm => elm.starred && !elm.deleted)
			case 'deleted':
				return  this.state.MailData.filter( elm => elm.deleted )
			case 'new':
				return  this.state.MailData.filter( elm => elm.label === 'new' && !elm.deleted )
			case 'replied':
				return  this.state.MailData.filter( elm => elm.label === 'replied' && !elm.deleted )
			default:
				return this.state.MailData.filter( elm => !elm.deleted && !elm.deleted )
		}
	}


	onSelectChange = selectedRowKeys => {
		this.setState({ selectedRowKeys });
	};
	

	onStarTicked = elm => {
		const { _id, starred } = elm;
		AdminService.adminSetStarredMailOne(_id, !starred)
		.then(res => {
			// ---------Reset Mails status--------------------
			this.setState({
				MailData: this.state.MailData.map( item => {
					if(item._id === _id) {
						item.starred = !starred
						return item
					}
					return item
				})
			})
			this.filterMailData();
			// ------------------------------------------------
		})
		.catch(err => {
			message.error("失敗しました。")
		})
	}


	massSetDeleted = selectedKey => {
		AdminService.adminSetDeletedMails(selectedKey, true)
		.then(res => {
			// ---------Reset Mails status------------
			let data = this.state.MailData;
			selectedKey.forEach(num => {
				data = data.map(elm => {
					if(elm._id === num) {
						elm.deleted = true
						return elm
					} else return elm
				})
			});
			this.setState({
				MailData: data
			})
			this.filterMailData()
			// ----------------------------------------
		})
		.catch(err => {
			message.error("失敗しました。")
		})
	}


	massSetStarred = selectedKey => {
		let flag = !this.state.starred;
		AdminService.adminSetStarredMails(selectedKey, flag)
		.then(res => {
			// ---------Reset Mails status------------
			let data = this.state.MailData;
			selectedKey.forEach(num => {
				data = data.map(elm => {
					if(elm._id === num) {
						elm.starred = flag
						return elm
					} else return elm
				})
			});
			this.setState({
				MailData: data,
				starred: flag
			});
			this.filterMailData();
			// ----------------------------------------
		})
		.catch(err => {
			message.error("失敗しました。")
		})
	}


	search = e => {
		let query = e.target.value;
		let data = []
		data = this.getCurrentCategory().filter(item => {
			return query === ''? item : item.name.toLowerCase().includes(query) || item.email.toLowerCase().includes(query)
		});
		this.setState({
			mails: data
		});
	}


	handleDeleteMails = selectedKey => {
		AdminService.adminCompletelyDeleteMails(selectedKey)
		.then(res => {
			// ---------Reset Mails status------------
			let data = this.state.MailData;
			selectedKey.forEach(num => {
				data = data.filter(elm => elm._id !== num)
			});
			this.setState({
				MailData: data
			})
			this.filterMailData()
			// ----------------------------------------
		})
		.catch(err => {
			message.error("失敗しました。")
		})
	}


	render() {
		const { match, history } = this.props
		const { selectedRowKeys } = this.state;
    	const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
		};

		const locale = {
			emptyText: (
				<div className="text-center my-5">
					<img src="/img/others/img-10.png" alt="Add credit card"/>
					<h3 className="mt-3 font-weight-light">メールはありません！</h3>
				</div>
			)
		};
		
		const tableColumns = [
			{
				title: () => (
					<div className="mail-list-action">
						<div>
							{	hasSelected? 
								<div>
									{
										this.props.match.params.category !== 'deleted' ?
											<span className="mail-list-action-icon" onClick={() => {this.massSetDeleted(this.state.selectedRowKeys)}}>
												<Tooltip title="Delete">
													<DeleteOutlined />
												</Tooltip>
											</span>
										:	<Popconfirm
												title="本当に完全に削除しますか？"
												onConfirm={() => this.handleDeleteMails(this.state.selectedRowKeys)}
												okText="YES"
												cancelText="NO"
												placement='bottomLeft'
											>
												<span className="mail-list-action-icon">
													<Tooltip title="完全削除">
														<DeleteOutlined />
													</Tooltip>
												</span>
											</Popconfirm>
									}
									{
										this.props.match.params.category !== 'deleted' &&
										<span className="mail-list-action-icon" onClick={() => {this.massSetStarred(this.state.selectedRowKeys)}}>
											<Tooltip title="Star" 
												className={`mail-list-star font-size-lg ${this.state.starred? 'checked' : 'uncheck'}`}>
												{
													this.state.starred ?
														<StarFilled />
													:	<StarOutlined />
												}
											</Tooltip>
										</span>
									}
								</div>
								:
								null
							}
						</div>
						<div>
							<Input size="small" placeholder="Search" onChange={e => {this.search(e)}}/>
						</div>
					</div> 
				),
				colSpan: 4,
				dataIndex: 'name',
				className: 'mail-list-sender',
				render: (_, elm) => (
					<div className="d-flex align-items-center">
						{
							! elm.deleted ? 
								<div className={`mail-list-star font-size-md ${elm.starred? 'checked' : 'uncheck'}`}
									onClick={(e) => {
										e.stopPropagation()
										this.onStarTicked(elm)
									}}>
									{elm.starred? <StarFilled /> : <StarOutlined />}
								</div>
							:	<div className={`mail-list-star font-size-md ${elm.starred? 'checked' : 'uncheck'}`}>
									{elm.starred? <StarFilled /> : <StarOutlined />}
								</div>
						}
						<div className="d-flex align-items-center">
							<div className={elm.deleted ? 'd-flex ml-2' : 'd-flex'}>
								<AvatarStatus src={elm.avatar} name={elm.name} subTitle={elm.email}/>
							</div>
						</div>
					</div>
				),
			},
			{
				title: '',
				colSpan: 0,
				className: 'mail-list-content',
				render: (_, elm) => (
					<div className=" mail-list-content-msg">
						<Badge color={getLabelColor(elm.label)}/>
						<span className="font-weight-semibold text-dark ml-1">{elm.title}</span>
						<span className="mx-2"> - </span>
						<span className="p mb-0">{this.formatBody(elm.content)}</span>
					</div>
				)
			},
			{
				title: '',
				colSpan: 0,
				className: 'mail-list-date',
				render: (_, elm) => (
					<div className='d-flex text-muted align-items-center flex-column'>
						<span>{moment(elm.created_at).format("MM/DD/YYYY")}</span>
						<span>{moment(elm.created_at).format("HH:mm")}</span>
					</div>
				)
			},
		];

		const hasSelected = selectedRowKeys.length > 0;
	

		return (
			<div className="mail-list">
				{
					this.state.loaded &&
					<Table 
						rowSelection={rowSelection} 
						columns={tableColumns} 
						dataSource={this.state.mails} 
						locale={locale}
						onRow={(elm) => {
							return {
								onClick: e => {
									e.preventDefault()
									history.push(`${match.url}/${elm._id}`)
								}
							};
						}}
						rowKey="_id"
					/>
				}
			</div>
		)
	}
}

export default MailItem
