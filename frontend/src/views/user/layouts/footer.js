import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import IntlMessage from "components/util-components/IntlMessage";

const Footer = ({ locale }) => {
  return (
    <footer>
      <div className="p-footer">
        <div className="p-footer__left">
          <div className="p-footer__logo">
            FANTATION
          </div>
        </div>
        <div className="p-footer__right">
          <div className="p-footer__list">
            <div className="p-footer__column">
              {
                locale ==='ja' ?
                <h2 className="p-footer__column--header">
                  <span>SERVICE</span>本サービスについて
                </h2>
                  :
                <h2 className="p-footer__column--header">
                  <span>SERVICE</span>
                </h2>
              }
              <ul>
                <li><Link to="/terms"><IntlMessage id="header.nav.about.terms" defaultMessage="利用規約"/></Link></li>
                <li><Link to="/privace-policy"><IntlMessage id="header.nav.about.privace" defaultMessage="プライバシーポリシー"/></Link></li>
                <li><Link to="/sct-law"><IntlMessage id="header.nav.about.sct-law" defaultMessage="特定商取引法に基づく表記"/></Link></li>
              </ul>
            </div>
            <div className="p-footer__column">
              {
                locale === 'ja' ?
                <h2 className="p-footer__column--header">
                  <span>GUIDE</span>ご利用にあたって
                </h2>
                  :
                <h2 className="p-footer__column--header">
                  <span>GUIDE</span>
                </h2>
              }
              <ul>
                <li><Link to="/#p-qa"><IntlMessage id="header.nav.faq" defaultMessage="よくあるご質問"/></Link></li>
                <li><Link to="#"><IntlMessage id="header.nav.purchase" defaultMessage="購入ガイド"/></Link></li>
                <li><Link to="/exhibit"><IntlMessage id="header.nav.exhibit" defaultMessage="作品を売りたい方"/></Link></li>
              </ul>
            </div>
            <div className="p-footer__column">
              {
                locale === 'ja' ?
                <h2 className="p-footer__column--header">
                  <span>COMPANY</span>運営会社
                </h2>
                  :
                <h2 className="p-footer__column--header">
                  <span>COMPANY</span>
                </h2>
              }
              <ul>
                <li><Link to="/company"><IntlMessage id="header.nav.company.lowercase" /></Link></li>
                <li><Link to="#"><IntlMessage id="header.nav.hire" defaultMessage="採用情報"/></Link></li>
                <li><Link to="/contact-us"><IntlMessage id="header.nav.contact.lowercase" defaultMessage="お問い合わせ"/></Link></li>
              </ul>
            </div>
          </div>
          <div className="p-footer__follow">
            <ul className="p-footer__follow_list">
              <li className="p-footer__follow__item pc-onlyt"><IntlMessage id="header.nav.follow" /></li>
              <li className="p-footer__follow__item">
                <a href="https://www.instagram.com/fantation7/" target="_blank" rel="noreferrer"><img src="/img/home/instagram.svg" alt=""/></a>
              </li>
              <li className="p-footer__follow__item">
                <a href="https://www.facebook.com/Fantation-102564305655259" target="_blank" rel="noreferrer"><img src="/img/home/facebook.svg" alt=""/></a>
              </li>
              <li className="p-footer__follow__item">
                <a href="https://twitter.com/Fantaton777" target="_blank" rel="noreferrer"><img src="/img/home/twitter.svg" alt=""/></a>
              </li>
              <li className="p-footer__follow__item">
                <a href="https://line.me/R/ti/p/@111ashje" target="_blank" rel="noreferrer"><img src="/img/home/line.svg" alt=""/></a>
              </li>
            </ul>
            <div>
              <Link to="/contact-us" className="p-footer__contact">
                <IntlMessage id="header.nav.contact" />
              </Link>
              <p className="sp-onlyt" style={{ textAlign: "center", marginBottom: "10px" }}>
                <IntlMessage id="header.nav.follow" />
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="p-footer__copyright">Copyright © 2021 FANTATION All rights reserved.</p>
    </footer>
  )
}


const mapStateToProps = ({ theme }) => {
  const { locale } =  theme;
  return { locale }
};

export default withRouter(connect(mapStateToProps)(Footer));