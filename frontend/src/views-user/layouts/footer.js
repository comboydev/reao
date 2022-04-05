const Footer = () => {
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
              <h2 className="p-footer__column--header">
                <span>SERVICE</span>本サービスについて
                </h2>
              <ul>
                <li><a href="/terms">利用規約</a></li>
                <li><a href="/privace-policy">プライバシーポリシー</a></li>
                <li><a href="/sct-law">特定商取引法に基づく表記</a></li>
                <li><a href="#">古物営業法に基づく表記</a></li>
              </ul>
            </div>
            <div className="p-footer__column">
              <h2 className="p-footer__column--header">
                <span>GUIDE</span>ご利用にあたって
                </h2>
              <ul>
                <li><a href="/#p-qa">よくあるご質問</a></li>
                <li><a href="#">購入ガイド</a></li>
                <li><a href="/exhibit">作品を売りたい方</a></li>
              </ul>
            </div>
            <div className="p-footer__column">
              <h2 className="p-footer__column--header">
                <span>COMPANY</span>運営会社
                </h2>
              <ul>
                <li><a href="/company">会社概要</a></li>
                <li><a href="#">採用情報</a></li>
                <li><a href="/contact-us">お問い合わせ</a></li>
              </ul>
            </div>
          </div>
          <div className="p-footer__follow">
            <ul className="p-footer__follow_list">
              <li className="p-footer__follow__item pc-onlyt">フォローする</li>
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
                <a href="/contact-us" className="p-footer__contact">お問い合わせ</a>
                <p className="sp-onlyt" style={{ textAlign:"center", marginBottom: "10px" }}>フォローする</p>
            </div>
          </div>
        </div>
      </div>
      <p className="p-footer__copyright">Copyright © 2021 FANTATION All rights reserved.</p>
    </footer>
  )
}

export default Footer;