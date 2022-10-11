import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Image, message } from "antd";
import NumberFormat from 'react-number-format';
import Loading from "components/shared-components/Loading";
import UserService from "services/user.service";

export default function Owner() {

    const history = useHistory();
    const [coins, setCoins] = useState(undefined);
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
        UserService.getAllCoins()
        .then(res => {
            setLoaded(true);
            setCoins(res.data);
            if(res.data.length === 0){
                history.push("/preparation");
            }
        })
        .catch(err => {
            message.error("エラーが発生しました。", () => {
                history.push("/mypage");
            })
        })
    }, []);


    if( !loaded ) return <Loading cover="page"/>;
    if( !coins ) return null;
    return (
    <section className="p-card px-0">
        <div className="c-header mb-5">
            <h3 className="c-header--title">購入可能<br className="sp-onlyt"/>オーナー権一覧</h3>
            <p className="c-header--subtitle">List of available ownership</p>
        </div>

        <div className="c-coin--list">
            {
                coins.map((coin, key) => 
                <div className="c-coin" key={key}>
                    <ul>
                        <div className="c-coin__image">
                            <Image src={ coin.mainImage } alt="fantation"/>
                        </div>
                        <li className="c-coin__name">
                            <dt>・コイン名:</dt>
                            <dd>{ coin.name }</dd>
                        </li>
                        <li className="c-coin__grade">
                            <dt>・グレード:</dt>
                            <dd>{ coin.grade }</dd>
                        </li>
                        <li className="c-coin__numberOfCoins">
                            <dt>・発行枚数:</dt>
                            <dd>
                                { `${coin.totalCount} 枚` }</dd>
                        </li>
                    </ul>
                    <ul>
                        <li className="c-coin__refPrice">
                            <dt>・参考取引価格:</dt>
                            <dd>
                                <NumberFormat
                                    displayType={'text'} 
                                    value={coin.refPrice} 
                                    prefix={'￥'} 
                                    thousandSeparator={true} />~
                            </dd>
                        </li>
                        <li className="c-coin__cost">
                            <dt>・オーナー権価格:</dt>
                            <dd>
                                <NumberFormat
                                    displayType={'text'} 
                                    value={coin.cost} 
                                    prefix={'￥'} 
                                    thousandSeparator={true} />
                            </dd>
                        </li>
                        <Button className="c-btn c-coin--detailbtn mt-5" onClick={() => {history.push(`/coins/detail/${coin.id}`)}}>
                            コインの詳細をみる
                        </Button>
                    </ul>
                </div>
                )
            }
        </div>
    </section>
    );
}
