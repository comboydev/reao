import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import { message} from 'antd';
// import NumberFormat from 'react-number-format';
// import moment from "moment";
// import utils from 'utils'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Loading from "components/shared-components/Loading";
import ContactSection from "system/user/components/ContactSection";
import OwnedCoinInfo from 'system/user/components/OwnedCoinInfo';
// import AvatarStatus from 'components/shared-components/AvatarStatus';
import Token from 'contracts/services/token';

const CoinDetail = (props) => {
    const id = props.match.params.id
	const history = useHistory();
    const [loaded, setLoaded] = useState(false);
    const [coin, setCoin] = useState();

    useEffect(() => {
		async function fetch() {
			try {
				const response = await Token.getToken(id);
				setCoin(response);
				setLoaded(true);
			} catch (err) {
				console.log(err);
				message.error("データ取得失敗しました。", 1, () =>
					history.push('/coins/owned'));
			}
		}
		fetch();
	}, [history, id])

	const settings = {
		dots: true,
		fade: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	};

    // const tableColumns = [
    //     {
    //         title: '',
    //         dataIndex: 'owner',
    //         render: owner => (
    //             <AvatarStatus src={owner.avatar} name={owner.nickname}/>
    //         ),
    //         sorter: null
    //     },
    //     {
    //         title: 'Wallet',
    //         dataIndex: 'wallet',
    //         render: wallet => (
    //             <Tooltip title="Copy" onClick={() => copyWalletAddress(wallet)} placement="bottom">
    //                 <span className="pointer">{ wallet.slice(0, 6) + "..." + wallet.slice(-3) }</span>
    //             </Tooltip>
    //         ),
    //         sorter: null
    //     },
	// 	{
	// 		title: '購入日',
	// 		dataIndex: 'created_at',
	// 		render: created_at => (
	// 			<span>{moment(created_at).format("YYYY-MM-DD")} </span>
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
    //     {
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
    //     {
	// 		title: '',
	// 		dataIndex: 'status',
	// 		render: (_, record) => {
    //             if(record.sellStatus === 1)
	// 			    return <Button type="primary" size="small"
    //                     onClick={()=>{
    //                         let obj = {
    //                             cost: coin.cost,
    //                             grade: coin.grade,
    //                             mainImage: coin.mainImage,
    //                             name: coin.name,
    //                             refPrice: coin.refPrice,
    //                             taxRate: coin.taxRate,
    //                             totalCount: coin.totalCount,
    //                             ownership: record
    //                         }
    //                         history.push({
    //                             pathname:`/coins/purchase/order/${props.match.params.id}`, 
    //                             state: { ...obj }
    //                         }); 
    //                     }}>
    //                     購入する
    //                 </Button>
    //             else return null;
    //         },
    //         sorter: null,
	// 	}
	// ];

    if( !loaded ) return <Loading cover="page" />;
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
                        <div className="l-ttl">保有中</div>
                        <div className="r-ttl">{ coin.name }</div>
                    </div>
                    
                    <OwnedCoinInfo coin={coin}/>

                    <div className='mt-5 py-3 pre-wrap' style={{ fontSize: 16, textAlign: 'justify' }}>
                        <h2 className="c-title mb-4">コインについて</h2>
                        <p>{ coin?.coinDescription }</p>
                    </div>

                    <div className='mt-5 py-3 pre-wrap' style={{ fontSize: 16, textAlign: 'justify' }}>
                        <h2 className="c-title mb-4">グレードについて</h2>
                        <div>
                            {   coin.images.slice(1).length > 0 &&
                                <div className="pe-sm-4 pb-sm-4 float-sm-left mx-auto w-100" style={{ maxWidth: 350 }}>
                                    <Slider {...settings}>
                                        {coin.images.slice(1).map((slide, k) => 
                                            <img key={k} src={slide} alt='coinImage' />
                                        )}
                                    </Slider>
                                </div>
                            }    
                            <p className='pre-wrap mt-3' style={{ fontSize: 16, textAlign: 'justify' }}>
                                { coin?.gradeDescription }
                            </p>    
                        </div>
                    </div>
                </div>
                {/* <div className="mt-5">
                    <div className="coin-detail--banner mb-3">
                        <div className="r-ttl px-2">オーナー権を保有する<br className="sp-onlyt"/>ユーザーリスト</div>
                    </div>
                    <Table columns={tableColumns} dataSource={coin.owners} rowKey="_id"/>
                </div> */}
                <div className="c-memberTop-allInfo pt-5 mt-5">
                    <button className="c-btn m-0 mx-auto"
                        onClick={() => history.push("/coins/owned")}>
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