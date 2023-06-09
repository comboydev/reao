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
                className="position-absolute text-link"
                style={{ left: 10, top: 10, zIndex: 1 }}
            >{item.tokenId}</a>
            <span className="position-absolute"
                style={{ right: 15, top: 10 }}
            ><TNumberFormat value={item.amount} /><small>枚</small></span>
            <ul className="c-coin--detail coinLabel">
                <div className="c-coin__image">
                    <Image src={item.image} alt="fantation" />
                </div>
                <li className="c-coin__name">
                    <dt>・コイン名:</dt>
                    <dd>{item.name}</dd>
                </li>
                <li className="c-coin__grade">
                    <dt>・グレード:</dt>
                    <dd>{item.grade.name}</dd>
                </li>
                <li className="c-coin__numberOfCoins">
                    <dt>・発行枚数:</dt>
                    <dd>
                        <TNumberFormat
                            value={item.totalSupply}
                            suffix={' 枚'}
                        />
                    </dd>
                </li>
            </ul>
            <ul className="c-coin--pricearea">
                <li className="c-coin__refPrice">
                    <dt>・参考取引価格:</dt>
                    <dd><YenFormat value={item.refPrice} />～</dd>
                </li>
                <li className="c-coin__cost">
                    <dt>・オーナー権価格:</dt>
                    <dd><YenFormat value={item.price} /></dd>
                </li>
            </ul>
            <div className="px-3 mb-3">
                <Button className="c-btn c-coin--detailbtn"
                    onClick={() => history.push(`/marketplace/items/${item.itemId}`)}>
                    コインの詳細をみる
                </Button>
            </div>
        </div>
    )
}

export default MarketItemWidget