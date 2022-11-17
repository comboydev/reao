import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

const SctLawJP = () => {
    return(
        <>
            <section className="p-policy">
                <div className="c-header">
                    <h3 className="c-header--title">特定商取引法に基づく表記</h3>
                    <p className="c-header--subtitle">Specified Commercial Transactions Law</p>
                </div>
                <div className="c-policy">
                    <div className="c-policy--articleHeader">
                        運営会社
                    </div>
                    <article>
                        株式会社ArtHolic
                    </article>
                </div>
                <div className="c-policy">
                    <div className="c-policy--articleHeader">
                        事業所の所在地
                    </div>
                    <article>
                        福岡県福岡市中央区今泉1-16-12-3F
                    </article>
                </div>
                <div className="c-policy">
                    <div className="c-policy--articleHeader">
                        電話番号
                    </div>
                    <article>
                        050-3580-1994
                    </article>
                </div>
                
                <div className="c-policy">
                    <div className="c-policy--articleHeader">
                        連絡先
                    </div>
                    <article>
                        info@fantation-coin.com
                    </article>
                </div>
                <div className="c-policy">
                    <div className="c-policy--articleHeader">
                        営業時間
                    </div>
                    <article>
                        平日 10:00〜18:00
                    </article>
                </div>
                <div className="c-policy">
                    <div className="c-policy--articleHeader">
                        定休日
                    </div>
                    <article>
                        土・日・祝日
                    </article>
                </div>
                <div className="c-policy">
                    <div className="c-policy--articleHeader">
                        商品等の販売価格について
                    </div>
                    <article>
                        販売価格は、表示された金額（表示価格/税込）と致します。
                    </article>
                </div>
                <div className="c-policy">
                    <div className="c-policy--articleHeader">
                        商品価格以外に必要な料金
                    </div>
                    <article>
                        取引手数料としてオーナー権購入金額の10%を支払う必要があります。
                    </article>
                </div>
                <div className="c-policy">
                    <div className="c-policy--articleHeader">
                        支払方法
                    </div>
                    <article>
                        クレジットカードまたは銀行振込、仮想通貨（USDT）でのお支払いが可能です。
                    </article>
                </div>
                <div className="c-policy">
                    <div className="c-policy--articleHeader">
                        支払時期
                    </div>
                    <article>
                        出品商品のオーナー権購入規約に同意時
                    </article>
                </div>
                <div className="c-policy">
                    <div className="c-policy--articleHeader">
                        商品の提供時期
                    </div>
                    <article>
                        お支払いが完了した時点
                    </article>
                </div>
                <div className="c-policy">
                    <div className="c-policy--articleHeader">
                        返品についての特約に関する事項
                    </div>
                    <article>
                        原則キャンセルには応じません。
                    </article>
                </div>
                <div className="c-policy">
                    <div className="c-policy--articleHeader">
                        サービス利用条件
                    </div>
                    <article>
                        利用規約をご覧ください。<br />
                        <Link to="/terms">ここで...</Link>
                    </article>
                </div>
            </section>
        </>
    )
}

const SctLawEN = () => {
    return(
        <>
            <section className="p-policy">
                <div className="c-header">
                    <h3 className="c-header--title">Specified Commercial Transactions Law</h3>
                    <p className="c-header--subtitle">特定商取引法に基づく表記</p>
                </div>
                <div className="c-policy">
                    <div className="c-policy--articleHeader">
                        Management Company
                    </div>
                    <article>
                        ArtHolic Inc.
                    </article>
                </div>
                <div className="c-policy">
                    <div className="c-policy--articleHeader">
                        Office Address
                    </div>
                    <article>
                        1-16-12-3F Imaizumi, Chuo-ku, Fukuoka City, Fukuoka Prefecture
                    </article>
                </div>
                <div className="c-policy">
                    <div className="c-policy--articleHeader">
                        Phone number
                    </div>
                    <article>
                        050-3580-1994
                    </article>
                </div>
                
                <div className="c-policy">
                    <div className="c-policy--articleHeader">
                        Contact
                    </div>
                    <article>
                        info@fantation-coin.com
                    </article>
                </div>
                <div className="c-policy">
                    <div className="c-policy--articleHeader">
                        Business Hours
                    </div>
                    <article>
                        Weekdays 10:00 ~ 18:00
                    </article>
                </div>
                <div className="c-policy">
                    <div className="c-policy--articleHeader">
                        Closed
                    </div>
                    <article>
                        Saturday, Sunday, Holidays
                    </article>
                </div>
                <div className="c-policy">
                    <div className="c-policy--articleHeader">
                        Selling price of products, etc.
                    </div>
                    <article>
                        The selling price shall be the amount indicated (indicated price/tax included).
                    </article>
                </div>
                <div className="c-policy">
                    <div className="c-policy--articleHeader">
                        Other fees/Charges
                    </div>
                    <article>
                        A transaction fee of 10% of the purchase price of the ownership 
                    </article>
                </div>
                <div className="c-policy">
                    <div className="c-policy--articleHeader">
                        Payment Method
                    </div>
                    <article>
                        Payment can be made by credit card or bank transfer, or in virtual currency (USDT).
                    </article>
                </div>
                <div className="c-policy">
                    <div className="c-policy--articleHeader">
                        Payment Period
                    </div>
                    <article>
                        Upon agreeing to the terms and conditions of the purchase of ownership of the listed item
                    </article>
                </div>
                <div className="c-policy">
                    <div className="c-policy--articleHeader">
                        Time of delivery
                    </div>
                    <article>
                        Upon completion of payment
                    </article>
                </div>
                <div className="c-policy">
                    <div className="c-policy--articleHeader">
                        Return Policy
                    </div>
                    <article>
                        In principle, we do not accept cancellations.
                    </article>
                </div>
                <div className="c-policy">
                    <div className="c-policy--articleHeader">
                        Terms of Service
                    </div>
                    <article>
                        Please see our terms of Use. <br />
                        <Link to="/terms">here...</Link>
                    </article>
                </div>
            </section>
        </>
    )
}

const SctLaw = ({locale}) => {
    if (locale === 'ja') return <SctLawJP />;
    else return <SctLawEN />;
}

const mapStateToProps = ({ theme }) => {
  const { locale } =  theme;
  return { locale }
};

export default withRouter(connect(mapStateToProps)(SctLaw));