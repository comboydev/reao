import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Menu, Dropdown, notification } from 'antd';
import { useMediaQuery } from 'react-responsive';
import ClientNavLanguage from 'components/layout-components/ClientNavLanguage';
import IntlMessage from "components/util-components/IntlMessage";
import UserService from "services/user.service";


const AboutMenu = (
  <Menu className="py-3 px-1">
    <Menu.Item key="terms">
      <Link to="/terms">
        <IntlMessage id="header.nav.about.terms" defaultMessage="利用規約"/>
      </Link>
    </Menu.Item>
    <Menu.Item key="privace">
      <Link to="/privace-policy">
        <IntlMessage id="header.nav.about.privace" defaultMessage="プライバシーポリシー"/>
      </Link>
    </Menu.Item>
    <Menu.Item key="law">
      <Link to="/sct-law">
        <IntlMessage id="header.nav.about.sct-law" defaultMessage="特定商取引法に基づく表記"/>
      </Link>
    </Menu.Item>
  </Menu>
);

const NavRight = ({currentUser, className, handleLogout}) => {
  const history = useHistory();
  const isSp = useMediaQuery({
    query: '(max-width: 1050px)'
  });
  const gotoTop = () =>{
    history.push("/mypage");
  }

  return(  
    <div className={`c-nav__right ${className}`}>
        <ul className="c-nav--global__info">
          <li>
            <Link to="/company">
              <IntlMessage id="header.nav.company" defaultMessage="会社概要"/>
            </Link>
          </li>
          <li>
            <Link to="/contact-us">
              <IntlMessage id="header.nav.contact" defaultMessage="お問い合わせ"/>
            </Link>
          </li>
        </ul>
        {
        !currentUser && <>
          <div className="c-nav--btn__wrap">
            <button className="c-btn c-btn--login" onClick={() => history.push('/login')}>
              <span>
                <IntlMessage id="header.nav.login" defaultMessage="ログイン" />
              </span>
              <span className="sub">
                <IntlMessage id="header.nav.login.sub" defaultMessage="LOGIN" />
              </span>
            </button>
            <button className="c-btn c-btn--signup" onClick={() => history.push('/register')}>
              <span>
                <IntlMessage id="header.nav.register" defaultMessage="会員登録" />
              </span>
              <span className="sub">
                <IntlMessage id="header.nav.register.sub" defaultMessage="SIGNUP" />
              </span>
            </button>
          </div>
          </>
        }
        {currentUser && isSp && (
          <div className="c-nav--btn__wrap">
            <button className="c-btn c-btn--mypage" onClick={gotoTop}>
              <span>
                <IntlMessage id="header.nav.mypage" defaultMessage="マイページ" />
              </span>
              <span className="sub">
                <IntlMessage id="header.nav.mypage.sub" defaultMessage="MYPAGE" />
              </span>
            </button>
            <button className="c-btn c-btn--signup" onClick={handleLogout}>
              <span>
                <IntlMessage id="header.nav.logout" defaultMessage="ログアウト" />
              </span>
              <span className="sub">
                <IntlMessage id="header.nav.logout.sub" defaultMessage="LOGOUT" />
              </span>
            </button>
          </div>
        )}
        {currentUser && !isSp && (
          <>
            <div className="d-flex justify-space-end mt-2" style={{ justifyContent:'flex-end' }}>
              <button 
                className="dropdown c-btn c-btn--user" 
                id="dropdownMenuButton" 
                data-toggle="dropdown" 
                aria-haspopup="true" 
                aria-expanded="false"
              >
                <img src={ currentUser.avatar } 
                  style={{ borderRadius: '50%' }}
                  alt="user"/>
              </button>

              <div 
                className="dropdown-menu" 
                style={{ marginRight: "0.7vw" }} 
                aria-labelledby="dropdownMenuButton"
              >
                <button 
                  className="dropdown-item c-btn c-btn--mypage" 
                  onClick={gotoTop} 
                  style={{ 
                    margin: "0 0.5rem 0 0.5rem",
                    borderBottom: 'none'
                  }}
                >
                  <span>
                    <IntlMessage id="header.nav.mypage" defaultMessage="マイページ" />
                  </span>
                  <span className="sub">
                    <IntlMessage id="header.nav.mypage.sub" defaultMessage="MYPAGE" />
                  </span>
                </button>
                <button 
                  className="dropdown-item c-btn c-btn--logout"
                  onClick={handleLogout}
                  style={{ 
                    margin: "0 0.5rem 0 0.5rem" 
                  }}
                >
                  <span>
                    <IntlMessage id="header.nav.logout" defaultMessage="ログアウト" />
                  </span>
                  <span className="sub">
                    <IntlMessage id="header.nav.logout.sub" defaultMessage="LOGOUT" />
                  </span>
                </button>
              </div>
            </div>

          </>
        )}
    </div>
  )
}

const Header = () => {
  const history = useHistory();
  const currentUser = UserService.getCurrentUser();
  const [isOpen, setOpen] = useState(false);

  const logOut = () => {
    UserService.logout();
    history.push('/');
    notification.success({ message: "ログアウトしました!"});
  }

    return (
      <>
        <header className="l-header" id="l-header">
          <nav className="c-nav">
            <div className="c-nav__left">
              <div className="c-logo">
                <Link to="/">FANTATION</Link>
              </div>
              <div className="pc-menu" id="c-nav--global">
                { !currentUser && (
                  <ul className="c-nav--global__menu">
                    <li className="c-menuitem--global c-menuitem--global--top">
                      <Link to="/">TOP</Link>
                    </li>
                    <li className="c-menuitem--global c-menuitem--global--feature">
                      <Link to="/#p-feature">
                        <IntlMessage id="header.nav.feature" defaultMessage="FANTATIONの特徴"/>
                      </Link>
                    </li>
                    <li className="c-menuitem--global c-menuitem--global--coin">
                      <Link to="/#p-coin">
                        <IntlMessage id="header.nav.handling" defaultMessage="取り扱いコイン"/>
                      </Link>
                    </li>
                    <li className="c-menuitem--global c-menuitem--global--service">
                      <Link to="/#p-flow">
                        <IntlMessage id="header.nav.guide" defaultMessage="ご利用の流れ"/>
                      </Link>
                    </li>
                    <li className="c-menuitem--global c-menuitem--global--media">
                      <Link to="/#p-media">
                        <IntlMessage id="header.nav.media" defaultMessage="掲載メディア"/>
                      </Link>
                    </li>
                    <li className="c-menuitem--global c-menuitem--global--service">
                      <Dropdown overlay={AboutMenu}>
                        <span className="ant-dropdown-link cursor-pointer">
                          <IntlMessage id="header.nav.about" defaultMessage="本サービスについて"/>
                        </span>
                      </Dropdown>
                    </li>
                    <li className="c-menuitem--global c-menuitem--global--lang">
                      <ClientNavLanguage />
                    </li>
                  </ul>
                )}
                { currentUser && (
                  <ul className="c-nav--global__menu">
                    <li className="c-menuitem--global c-menuitem--global--top">
                      <Link to="/mypage">
                        TOP
                      </Link>
                    </li>
                    <li className="c-menuitem--global c-menuitem--global--feature">
                      <Link to="/profile">
                        <IntlMessage id="header.nav.profile" defaultMessage="個人情報管理"/>
                      </Link>
                    </li>
                    <li className="c-menuitem--global c-menuitem--global--use">
                      <Link to="/partner">
                        <IntlMessage id="header.nav.affiliate" defaultMessage="アフィリエイト管理"/>
                      </Link>
                    </li>
                    <li className="c-menuitem--global c-menuitem--global--coin">
                      <Link to="/coins">
                        <IntlMessage id="header.nav.coins.purchasable" defaultMessage="購入可能オーナー権一覧"/>
                      </Link>
                    </li>
                    <li className="c-menuitem--global c-menuitem--global--use">
                      <Link to="/coins/owned">
                        <IntlMessage id="header.nav.coins.owned" defaultMessage="取引"/>
                      </Link>
                    </li>
                    <li className="c-menuitem--global c-menuitem--global--lang">
                      <ClientNavLanguage />
                    </li>
                  </ul>
                )}
                <NavRight currentUser={currentUser} className="sp-only-flex" handleLogout={logOut}/>
              </div>
            </div>

            <NavRight currentUser={currentUser} className="pc-only" handleLogout={logOut} />
           
            <div className="sp-menu c-nav--sp__menu" id="c-nav--sp__menu">
              {!currentUser && (
                <button onClick={() => history.push('/register')} style={{ fontFamily: '"yu-mincho-pr6n", "sans-serif"' }}>
                  <IntlMessage id="header.nav.register" defaultMessage="会員登録"/>
                    <br className="sp-onlyt" />
                  （<IntlMessage id="header.nav.register.free" defaultMessage="無料"/>）
                </button>
              )}
              <div className="c-nav--sp__menu__burgerMenu" id="sp-burgerMenu" onClick={() => { setOpen(!isOpen) }} >
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>

          </nav>
        </header>
      </>
    )
}

export default Header;