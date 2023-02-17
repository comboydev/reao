import { useHistory } from "react-router-dom";
import { Button, Image } from "antd";
import TNumberFormat from 'components/custom/TNumberFormat';
import { tokenLink } from "contracts/hooks";
import YenFormat from "components/custom/YenFormat";

const OwnedCoinWidget = ({ coin }) => {
    const history = useHistory();
    return (
        <div className="c-coin">
            <a href={tokenLink("AQCT1155", coin.tokenId)}
                target="_blank" rel="noreferrer"
                className="position-absolute text-link"
                style={{ left: 10, top: 10, zIndex: 1 }}
            >{coin.tokenId}</a>
            <span className="position-absolute"
                style={{ right: 15, top: 10 }}
            ><TNumberFormat value={coin.amount} /><small>枚</small></span>
            <ul className="c-coin--detail coinLabel">
                <div className="c-coin__image">
                    <Image src={coin.images[0]} alt="fantation" />
                </div>
                <li className="c-coin__name">
                    <dt>・コイン名:</dt>
                    <dd>{coin.name}</dd>
                </li>
                <li className="c-coin__grade">
                    <dt>・グレード:</dt>
                    <dd>{coin.grade}</dd>
                </li>
                <li className="c-coin__numberOfCoins">
                    <dt>・発行枚数:</dt>
                    <dd>
                        <TNumberFormat value={coin.totalSupply} /> 枚
                    </dd>
                </li>
            </ul>
            <ul className="c-coin--pricearea d-block">
                <li className="c-coin__refPrice">
                    <dt>・参考取引価格:</dt>
                    <dd><YenFormat value={coin.refPrice} />～</dd>
                </li>
            </ul>
            <div className="px-3 mb-3">
                <Button className="c-btn c-coin--detailbtn"
                    onClick={() => history.push(`/coins/detail/${coin.tokenId}`)}>
                    コインの詳細をみる
                </Button>
            </div>
        </div>
    )
}

export default OwnedCoinWidget