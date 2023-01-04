import { useHistory } from "react-router-dom";
import { Button, Image } from "antd";
import { tokenLink } from "contracts/hooks";
import TNumberFormat from 'components/custom/TNumberFormat';
import YenFormat from "components/custom/YenFormat";

const MarketItemWidget = ({ item }) => {
    const history = useHistory();
    return (
        <div className="c-coin">
            <a href={tokenLink("AQCT1155", item.tokenId)}
                target="_blank" rel="noreferrer"
                className="position-absolute"
                style={{ left: 10, top: 10 }}
            >{item.tokenId}</a>
            <span className="position-absolute"
                style={{ right: 15, top: 10 }}
            ><TNumberFormat value={item.amount} /><small>枚</small></span>
            <div>
                <div className="c-coin__image">
                    <Image src={ item.images[0] } alt="fantation"/>
                </div>
                <dl className="c-coin__name">
                    <dt>・コイン名:</dt>
                    <dd>{ item.name }</dd>
                </dl>
                <dl>
                    <dt>・グレード:</dt>
                    <dd>{ item.grade }</dd>
                </dl>
                <dl>
                    <dt>・発行枚数:</dt>
                    <dd>
                        <TNumberFormat
                            value={item.totalSupply} 
                            suffix={' 枚'}
                        />
                    </dd>
                </dl>
            </div>
            <div>
                <dl className="c-coin__refPrice">
                    <dt>・参考取引価格:</dt>
                    <dd><YenFormat value={item.refPrice} />～</dd>
                </dl>
                <dl className="c-coin__cost">
                    <dt>・オーナー権価格:</dt>
                    <dd><YenFormat value={item.price} /></dd>
                </dl>
                <Button className="c-btn c-coin--detailbtn mt-4"
                    onClick={() => history.push(`/marketplace/items/${item.itemId}`)}>
                    コインの詳細をみる
                </Button>
            </div>
        </div>
    )
}

export default MarketItemWidget