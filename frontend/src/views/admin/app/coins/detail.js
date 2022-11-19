import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from "react-router-dom"
import { Row, Col, Card, Image, message, Table, Tooltip, Tag } from 'antd';
import NumberFormat from 'react-number-format';
import moment from "moment";
import copy from 'copy-to-clipboard';
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import AvatarStatus from 'components/shared-components/AvatarStatus';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import AdminService from 'services/admin.service';
import utils from 'utils'

const  DetailCoin = (props) => {

	const coinId = props.match.params.id
	const avatarSize = 250;
	const history = useHistory();
	const location = useLocation();
	const [coin, setCoin] = useState();

	useEffect(()=>{
		AdminService.adminGetCoin(coinId)
		.then(res => {
			setCoin(res.data);
		})
		.catch(err => {
			message.error('失敗しました。', ()=>{
				history.push('/admin/coins');
			});
		});
	}, [coinId, history])

	const settings = {
		dots: true,
		fade: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	};

	const copyWalletAddress = (address) =>{
		if(copy(address)){
		    message.success("Copied");
		} else {
		    message.error("Copy Failed");
		}
	  }

	const tableColumns = [
		{
			title: '',
			dataIndex: 'owner',
			render: owner => (
			    <AvatarStatus src={owner.avatar} name={owner.nickname} subTitle={owner.email}/>
			),
			sorter: null
		},
		{
		title: 'Wallet',
		dataIndex: 'wallet',
		render: wallet => (
			<Tooltip title="Copy" onClick={() => copyWalletAddress(wallet)} placement="bottom">
				<span className="pointer">{ wallet.slice(0, 6) + "..." + wallet.slice(-3) }</span>
			</Tooltip>
		),
		sorter: null
		},
		{
			title: '購入日',
			dataIndex: 'created_at',
			render: created_at => (
				<span>{moment(created_at).format("YYYY-MM-DD")} </span>
			),
			sorter: null
		},
        	{
			title: '保有枚数',
			dataIndex: 'count',
			render: count => (
				<div>
					<NumberFormat
						displayType={'text'} 
						value={count} 
						suffix={' 枚'} 
						thousandSeparator={true} 
					/>
				</div>
			),
			sorter: {
				compare: (a, b) => {
					a = a.email.toLowerCase();
					  b = b.email.toLowerCase();
					return a > b ? -1 : b > a ? 1 : 0;
				},
			},
		},
        	{
			title: '価格',
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
			title: 'Status',
			dataIndex: 'sellStatus',
			render: status => {
                if(status === 1)
				    return <Tag color={'cyan'}>購入可能</Tag>
                else return <Tag color={'volcano'}>購入不可</Tag>
            },
            sorter: (a, b) => (a.sellStatus - b.sellStatus)
		},
	];
	
	if( !coin ) return null;
	return (
		<>
			<PageHeaderAlt background="/img/others/img-12.jpg" cssClass="bg-primary" overlap>
				<div className="container text-center">
					<div className="py-3 my-md-5">
					</div>
				</div>
			</PageHeaderAlt>
			<div >
				<Card className="py-3 p-md-4">
					<Row gutter={16}>
						<Col xs={24} md={10} className="mx-auto mb-3">
							<div className="rounded p-2 mx-auto text-center">
								<Image shape="circle" src={ coin.mainImage } style={{maxWidth: '100%', width: avatarSize}}/>
							</div>
						</Col>
						<Col xs={24} md={14} className="mx-auto" style={{ fontSize: 16 }}>
							<div className="d-flex border-top border-bottom py-3 ">
								<span style={{ width: 180 }}>コイン名</span>
								<span className="text-primary font-weight-bold" style={{ fontSize: 18 }}>{coin.name}</span>
							</div>
							<div className="d-flex border-bottom py-3 ">
								<span style={{ width: 180 }}>グレード</span>
								<span>{coin.grade}</span>
							</div>
							<div className="d-flex border-bottom py-3 ">
								<span style={{ width: 180 }}>発行枚数</span>
								<span>
									<NumberFormat
										displayType={'text'} 
										value={`${coin.totalCount}`} 
										thousandSeparator={true} />
									　枚
								</span>
							</div>
							<div className="d-flex border-bottom py-3 ">
								<span style={{ width: 180 }}>参考取引価格</span>
								<span>
									<NumberFormat
										displayType={'text'} 
										value={coin.refPrice} 
										prefix={'￥'} 
										thousandSeparator={true} />
									～
								</span>
							</div>
							<h3 className='pt-5 text-center'>オーナー権価格:
								<span style={{ fontSize: 40, marginLeft: 20 }} className="d-block d-sm-inline">	
									<NumberFormat
										displayType={'text'} 
										value={coin.cost} 
										thousandSeparator={true} />円
								</span>
							</h3>
						</Col>
					</Row>
				</Card>
				
				{
					coin.refImages.length > 0 ?
						<Row gutter={16}>
							<Card title='コインについて' className='py-3 mt-3 mt-md-0 pre-wrap'>
								{ coin.coinDescription }
							</Card>
							<Col xs={24} sm={24} md={10}>
								<Card className="pb-3">
									<Slider {...settings}>
										{coin.refImages.map(function(slide, k) {
											return (
											<img key={k}
												src = {slide} 
												alt="fantation" 
												style={{ 
													width: '100%', 
													objectFit:'contain', 
													margin: 'auto' 
												}}/>
											);
										})}
									</Slider>
								</Card>			
							</Col>
							<Col xs={24} sm={24} md={14}>
								<Card title='グレードについて' className='py-3 pre-wrap'>
									{ coin.gradeDescription }
								</Card>
							</Col>
						</Row>
					: 
						<Row gutter={16}>
							<Col xs={24} sm={24} md={12}>
								<Card title='コインについて' className='py-3 pre-wrap'>
									{ coin.coinDescription }
								</Card>
							</Col>
							<Col xs={24} sm={24} md={12}>
								<Card title='グレードについて' className='py-3 pre-wrap'>
									{ coin.gradeDescription }
								</Card>
							</Col>
						</Row>
				}
				<Card title='オーナー権を保有するユーザーリスト' className='py-3 mt-3 mt-md-0'>
					<Table columns={tableColumns} dataSource={coin.owners} rowKey="_id"/>
				</Card>
				{
					location.search === "?hashCode" &&
					<Card title='HashCode' className='py-3 mt-3 mt-md-0'>
						{ coin.hashCode }
					</Card>
				}
			</div>
		</>
	)
}

export default DetailCoin
