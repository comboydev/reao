import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import { Row, Col, Card, Image, message, Button } from 'antd';
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import Loading from "components/shared-components/Loading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ListTokenModal from 'components/custom/modals/ListTokenModal';
import TNumberFormat from 'components/custom/TNumberFormat';
import YenFormat from 'components/custom/YenFormat';
import Token from 'contracts/services/token';

const DetailCoin = (props) => {
	const id = props.match.params.id
	const history = useHistory();
	const [loaded, setLoaded] = useState(false);
	const [coin, setCoin] = useState();
	const [visibleModal, setVisibleModal] = useState(false);

	useEffect(() => {
		async function fetch() {
			try {
				const response = await Token.getToken(id);
				setCoin(response);
				setLoaded(true);
			} catch (err) {
				console.log(err);
				message.error("データ取得失敗しました。", 1,
					() => history.push('/admin/coins/owned'));
			}
		}
		fetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const settings = {
		dots: true,
		fade: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	};

	// const tableColumns = [
	// 	{
	// 		title: '',
	// 		dataIndex: 'owner',
	// 		render: owner => (
	// 		    <AvatarStatus src={owner.avatar} name={owner.nickname} subTitle={owner.email}/>
	// 		),
	// 		sorter: null
	// 	},
	// 	{
	// 		title: 'exhibitor',
	// 		dataIndex: 'exhibitor',
	// 		render: exhibitor => (
	// 			<Tooltip title="Copy" onClick={() => utils.copyClipboard(exhibitor)} placement="bottom">
	// 				<span className="pointer">{ exhibitor.slice(0, 6) + "..." + exhibitor.slice(-3) }</span>
	// 			</Tooltip>
	// 		),
	// 		sorter: null
	// 	},
	// 	{
	// 		title: '購入日',
	// 		dataIndex: 'createdAt',
	// 		render: createdAt => (
	// 			<span>{moment(createdAt).format("YYYY-MM-DD")} </span>
	// 		),
	// 		sorter: null
	// 	},
	//     {
	// 		title: '保有枚数',
	// 		dataIndex: 'count',
	// 		render: count => (
	// 			<div>
	// 				<NumberFormat
	// 					displayType={'text'} 
	// 					value={count} 
	// 					suffix={' 枚'} 
	// 					thousandSeparator={true} 
	// 				/>
	// 			</div>
	// 		),
	// 		sorter: {
	// 			compare: (a, b) => {
	// 				a = a.email.toLowerCase();
	// 				  b = b.email.toLowerCase();
	// 				return a > b ? -1 : b > a ? 1 : 0;
	// 			},
	// 		},
	// 	},
	//     	{
	// 		title: '価格',
	// 		dataIndex: 'cost',
	// 		render: cost => (
	// 			<div>
	// 				<NumberFormat
	// 					displayType={'text'} 
	// 					value={cost} 
	// 					prefix={'￥'} 
	// 					thousandSeparator={true} 
	// 				/>
	// 			</div>
	// 		),
	// 		sorter: (a, b) => utils.antdTableSorter(a, b, 'cost')
	// 	},
	//     	{
	// 		title: 'Status',
	// 		dataIndex: 'sellStatus',
	// 		render: status => {
	//             if(status === 1)
	// 			    return <Tag color={'cyan'}>購入可能</Tag>
	//             else return <Tag color={'volcano'}>購入不可</Tag>
	//         },
	//         sorter: (a, b) => (a.sellStatus - b.sellStatus)
	// 	},
	// ];

	if (!loaded) return <Loading cover="page" />
	return (
		<>
			<PageHeaderAlt background="/img/app/back2.jpg" cssClass="bg-primary" overlap>
				<div className="container text-center py-3 my-md-5" />
			</PageHeaderAlt>
			<div >
				<Card className="py-3 p-md-4">
					<Row gutter={16}>
						<Col xs={24} md={10} className="mx-auto mb-3">
							<div className="rounded p-2 mx-auto text-center">
								<Image shape="circle" src={coin.image} style={{ maxWidth: '100%', width: 250 }} />
							</div>
						</Col>
						<Col xs={24} md={14} className="mx-auto" style={{ fontSize: 16 }}>
							<div className="d-flex border-top border-bottom py-3">
								<span style={{ width: 130 }} className="me-md-4">コイン名</span>
								<span className="text-primary font-weight-bold">{coin.name}</span>
							</div>
							<div className="d-flex border-bottom py-3">
								<span style={{ width: 130 }} className="me-md-4">グレード</span>
								<span>{coin.grade.name}</span>
							</div>
							<div className="d-flex border-bottom py-3">
								<span style={{ width: 150 }} className="me-md-4">発行数 / 保有枠数</span>
								<span>
									<TNumberFormat
										value={`${coin.totalSupply}`}
										className="mr-1"
									/> /
									<TNumberFormat
										value={`${coin.amount}`}
										className="mx-1"
									/>枚
								</span>
							</div>
							<div className="d-flex border-bottom py-3">
								<span style={{ width: 130 }} className="me-md-4">参考取引価格</span>
								<span>
									<YenFormat value={coin.refPrice} />
									～
								</span>
							</div>
							<div className="d-flex justify-content-end py-3">
								<Button
									type="primary"
									onClick={() => setVisibleModal(true)}
									disabled={coin.amount === 0}
								>出品する</Button>
							</div>
						</Col>
						<ListTokenModal
							coin={coin}
							visible={visibleModal}
							onCancel={() => setVisibleModal(false)}
						/>
					</Row>
				</Card>
				{
					coin.images.slice(1).length > 0 ?
						<Row gutter={16}>
							<Card title='コインについて' className='py-3 mt-3 mt-md-0 pre-wrap'>
								{coin.description}
							</Card>
							<Col xs={24} sm={24} md={10}>
								<Card className="pb-3">
									<Slider {...settings}>
										{coin.images.slice(1).map(function (slide, k) {
											return (
												<img key={k}
													src={slide}
													alt="fantation"
													style={{
														width: '100%',
														objectFit: 'contain',
														margin: 'auto'
													}} />
											);
										})}
									</Slider>
								</Card>
							</Col>
							<Col xs={24} sm={24} md={14}>
								<Card title='グレードについて' className='py-3 pre-wrap'>
									{coin.grade.description}
								</Card>
							</Col>
						</Row>
						:
						<Row gutter={16}>
							<Col xs={24} sm={24} md={12}>
								<Card title='コインについて' className='py-3 pre-wrap'>
									{coin.description}
								</Card>
							</Col>
							<Col xs={24} sm={24} md={12}>
								<Card title='グレードについて' className='py-3 pre-wrap'>
									{coin.grade.description}
								</Card>
							</Col>
						</Row>
				}
				{/* <Card title='オーナー権を保有するユーザーリスト' className='py-3 mt-3 mt-md-0'>
					<Table columns={tableColumns} dataSource={coin.owners} rowKey="id"/>
				</Card> */}
			</div>
		</>
	)
}

export default DetailCoin
