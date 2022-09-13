import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import { Row, Col, Card, message, Table, Tooltip, Button, Avatar } from 'antd';
import NumberFormat from 'react-number-format';
import moment from "moment";
import utils from 'utils'

import copy from 'copy-to-clipboard';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Loading from "components/shared-components/Loading";
import UserService from 'services/user.service';
import ContactSection from "views-user/components/contact.component";
import CoinInfo from 'views-user/components/coin-info.component';
import AvatarStatus from 'components/shared-components/AvatarStatus';

const CoinDetail = (props) => {

	const history = useHistory();
	const [coin, setCoin] = useState();

    useEffect(()=>{
		UserService.getCoinOne(props.match.params.id)
		.then(res => {
			setCoin(res.data);
            console.log(res.data);
		})
		.catch(err => {
			message.error('エラーか発生しました。', ()=>{
				history.push('/coins');
			});
		});
	}, [])

	const settings = {
		dots: true,
		fade: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	};

    const tableColumns = [
        {
            title: '',
            dataIndex: 'owner',
            render: owner => (
                <AvatarStatus src={owner.avatar} name={owner.nickname}/>
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
			title: '',
			dataIndex: 'status',
			render: (_, record) => {
                if(record.sellStatus === 1)
				    return <Button type="primary" size="small"
                        onClick={()=>{
                            let obj = {
                                cost: coin.cost,
                                grade: coin.grade,
                                mainImage: coin.mainImage,
                                name: coin.name,
                                refPrice: coin.refPrice,
                                taxRate: coin.taxRate,
                                totalCount: coin.totalCount,
                                ownership: record
                            }
                            history.push({
                                pathname:`/coins/purchase/order/${props.match.params.id}`, 
                                state: { ...obj }
                            }); 
                        }}>
                        購入する
                    </Button>
                else return null;
            },
            sorter: null,
		}
	];

    const copyWalletAddress = (address) =>{
        if(copy(address)){
            message.success("Copied");
        } else {
            message.error("Copy Failed");
        }
    }

    if( !coin ) return <Loading cover="page"/>;
    return (
    <>
        <section className="p-card">
            <div className="c-header mb-5">
                <h3 className="c-header--title">取り扱いコイン</h3>
                <p className="c-header--subtitle">Coin Details</p>
            </div>
            <div className="coin-detail--container">
                <div>
                    <div className="coin-detail--banner">
                        <div className="l-ttl">販売中</div>
                        <div className="r-ttl">{ coin.name }</div>
                    </div>
                    
                    <CoinInfo coin={coin}/>

                    <Card className='py-3 mt-md-0 pre-wrap' style={{ fontSize: 16, textAlign: 'justify' }}>
                        <h2 className="c-title mb-4">コインについて</h2>
                        <p>{ coin.coinDescription }</p>
                    </Card>
                    {
                        coin.refImages.length > 0 ?
                            <Row gutter={16}>
                                <Col xs={24} sm={24} md={10}>
                                    <Card className="pb-3 mt-3">
                                        <Slider {...settings}>
                                            {coin.refImages.map(function(slide, k) {
                                                return (
                                                <img key={k}
                                                    src = {slide} 
                                                    alt="fant" 
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
                                    <Card className='py-3 mb-0 pre-wrap mt-3' style={{ fontSize: 16, textAlign: 'justify' }}>
                                        <h2 className="c-title mb-4">グレードについて</h2>
                                        { coin.gradeDescription }
                                    </Card>
                                </Col>
                            </Row>
                        : 
                            <Card className='py-3 pre-wrap mt-4' style={{ fontSize: 16, textAlign: 'justify' }}>
                                <h2 className="c-title mb-4">グレードについて</h2>
                                { coin.gradeDescription }
                            </Card>
                    }
                </div>
                <div className="mt-5">
                    <div className="coin-detail--banner mb-3">
                        <div className="r-ttl px-2">オーナー権を保有する<br className="sp-onlyt"/>ユーザーリスト</div>
                    </div>
                    <Table columns={tableColumns} dataSource={coin.owners} rowKey="_id"/>
                </div>
                <div className="c-memberTop-allInfo">
                    <button className="c-btn mt-5 mb-0" onClick={()=>history.push("/coins")}>
                        一覧ページへ戻る
                    </button>
                </div>
            </div>
        </section>
        <ContactSection/>
    </>
    )
}


export default CoinDetail;