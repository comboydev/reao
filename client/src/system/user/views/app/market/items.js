import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchMarketItems } from "redux/actions";
import { Checkbox } from "antd";
import MarketItemWidget from "system/user/components/MarketItemWidget";
import Loading from "components/shared-components/Loading";
import Preparation from "system/user/pages/preparation";

const MarketItems = (props) => {
    const [checked, setChecked] = useState(false);
    const {
        walletAccount,
        marketItems,
        loadedMarketItems,
        fetchMarketItems,
    } = props;

    useEffect(() => {
        fetchMarketItems();
    }, [fetchMarketItems]);

    if (!loadedMarketItems) return <Loading cover="page" />;
    if (loadedMarketItems && marketItems.length === 0) {
        return <Preparation />
    }
    return (
        <section className="p-card px-0">
            <div className="c-header mb-5">
                <h3 className="c-header--title">購入可能<br className="sp-onlyt" />オーナー権一覧</h3>
                <p className="c-header--subtitle">List of available ownership</p>
            </div>
            <div className="c-coin--list">
                <Checkbox checked={checked}
                    onChange={() => setChecked(!checked)}
                    className="ff-yuMincho mb-3 mx-3"
                >所有商品非表示</Checkbox>
            </div>
            <div className="c-coin--list">
                {marketItems.map((item, key) => {
                    if (String(item.seller).toLowerCase() !== String(walletAccount).toLowerCase())
                        return <MarketItemWidget item={item} key={key} />
                    else if (!checked)
                        return <MarketItemWidget item={item} key={key} />
                    else return null
                })}
            </div>
        </section>
    );
}

export default connect(
    ({ marketplace }) => (marketplace), {
    fetchMarketItems,
})(MarketItems);