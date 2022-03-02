import React, { Component } from "react";
import AuthService from "services/auth.service";

export default class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: undefined
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user
      });
    }
  }

  render() {
    const { currentUser } = this.state;
    return (
      <footer>
        <div className="p-footer">
          <div className="p-footer__left">
            <div className="p-footer__logo">
              FANTATION
            </div>
          </div>
          <div className="p-footer__right">
            <ul className="p-footer__list">
              <li className="p-footer__item"><a href="/mypage">TOP</a></li>
              <li className="p-footer__item"><a href="/#p-feature">FANTATIONの特徴</a></li>
              <li className="p-footer__item"><a href="/#p-coin">取り扱いコイン</a></li>
              <li className="p-footer__item"><a href="/#p-flow">ご利用について</a></li>
              <li className="p-footer__item"><a href="/#p-media">掲載メディア</a></li>
              <li className="p-footer__item"><a href="/#p-apply">本サービスについて</a></li>
            </ul>
            <div className="p-footer__follow">
              <ul className="p-footer__follow_list">
                <li className="p-footer__follow__item pc-onlyt">フォローする</li>
                <li className="p-footer__follow__item">
                  <a href="https://www.instagram.com/fantation7/" target="_blank" rel="noreferrer"><img src="/image/instagram.svg" alt=""/></a>
                </li>
                <li className="p-footer__follow__item">
                  <a href="https://www.facebook.com/Fantation-102564305655259" target="_blank" rel="noreferrer"><img src="/image/facebook.svg" alt=""/></a>
                </li>
                <li className="p-footer__follow__item">
                  <a href="https://twitter.com/Fantaton777" target="_blank" rel="noreferrer"><img src="/image/twitter.svg" alt=""/></a>
                </li>
                <li className="p-footer__follow__item">
                  <a href="https://line.me/R/ti/p/@111ashje" target="_blank" rel="noreferrer"><img src="/image/line.svg" alt=""/></a>
                </li>
              </ul>
              <div>
                  <a href="/contact" className="p-footer__contact">お問い合わせ</a>
                  <p className="sp-onlyt" style={{ textAlign:"center", marginBottom: "10px" }}>フォローする</p>
              </div>
            </div>
          </div>
        </div>
        <p className="p-footer__copyright">Copyright © 2021 FANTATION All rights reserved.</p>
      </footer>
    )
  }
}