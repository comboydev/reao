import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import { message } from 'antd';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "components/shared-components/Loading";
import ContactSection from "system/user/components/ContactSection";
import MarketItemInfo from 'system/user/components/MarketItemInfo';
import { SOLD_STATUS } from 'constants/AppConstant';
import Marketplace from 'contracts/services/marketplace';
import { imageUri } from 'services/image';

const MarketItemDetail = (props) => {
    const id = props.match.params.id
    const history = useHistory();
    const [coin, setCoin] = useState();

    useEffect(() => {
        async function fetch() {
            try {
                const response = await Marketplace.getItem(id);
                setCoin(response);
            } catch (err) {
                message.error("データ取得失敗しました。", 1, () =>
                    history.push('/marketplace/items'));
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

    if (!coin) return <Loading cover="page" />;
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
                            <div className="l-ttl">{SOLD_STATUS[coin.isSold ? 1 : 0].label}</div>
                            <div className="r-ttl">{coin?.name}</div>
                        </div>

                        <MarketItemInfo item={coin} />

                        <div className='mt-5 py-3 pre-wrap' style={{ fontSize: 16, textAlign: 'justify' }}>
                            <h2 className="c-title mb-4">コインについて</h2>
                            <p>{coin?.coinDescription}</p>
                        </div>

                        <div className='mt-5 py-3 pre-wrap' style={{ fontSize: 16, textAlign: 'justify' }}>
                            <h2 className="c-title mb-4">グレードについて</h2>
                            <div>
                                {coin.images.slice(1).length > 0 &&
                                    <div className="pe-sm-4 pb-sm-4 float-sm-left mx-auto w-100" style={{ maxWidth: 350 }}>
                                        <Slider {...settings}>
                                            {coin.images.slice(1).map((slide, k) =>
                                                <img key={k} src={imageUri(slide)} alt='coinImage' />
                                            )}
                                        </Slider>
                                    </div>
                                }
                                <p className='pre-wrap mt-3' style={{ fontSize: 16, textAlign: 'justify' }}>
                                    {coin?.gradeDescription}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="c-memberTop-allInfo pt-5 mt-5">
                        <button className="c-btn m-0 mx-auto"
                            onClick={() => history.push("/marketplace/items")}>
                            一覧ページへ戻る
                        </button>
                    </div>
                </div>
            </section>
            <ContactSection />
        </>
    )
}


export default MarketItemDetail;