import { useEffect, useState } from "react";
import EventBus from "services/EventBus";
import { Link } from "react-router-dom";
import { Menu, Dropdown } from 'antd';
import { useMediaQuery } from 'react-responsive'
import UserService from "services/user.service";
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/dropdown';

const AboutMenu = (
  <Menu className="py-3 px-1">
    <Menu.Item primary>
      <Link to="/terms">利用規約</Link>
    </Menu.Item>
    <Menu.Item primary>
      <Link to="/privace-policy">プライバシーポリシー</Link>
    </Menu.Item>
    <Menu.Item primary>
      <Link to="/sct-law">特定商取引法に基づく表記</Link>
    </Menu.Item>
  </Menu>
);

const NavRight = ({currentUser, className, handleLogout}) => {

  const isSp = useMediaQuery({
    query: '(max-width: 1050px)'
  });

  const gotoTop = () =>{
    window.location.href="/mypage";
  }

  return(  
    <div className={`c-nav__right ${className}`}>
        <ul className="c-nav--global__info">
          <li>
            <Link to="/company">会社概要</Link>
          </li>
          <li>
            <Link to="/contact-us">お問い合わせ</Link>
          </li>
        </ul>
        {
        !currentUser && <>
          <div className="c-nav--btn__wrap">
            <button className="c-btn c-btn--login" onClick={e => window.location.href = '/login'}>
              <p>ログイン</p>
            </button>
            <button className="c-btn c-btn--signup" onClick={e => window.location.href = '/register'}>
              <p>会員登録</p>
            </button>
          </div>
          </>
        }
        {currentUser && isSp && (
          <div className="c-nav--btn__wrap">
            <button className="c-btn c-btn--mypage" onClick={() => window.location.href = '/mypage'}>
              <p>マイページ</p>
            </button>
            <button className="c-btn c-btn--signup c-btn--logined" onClick={handleLogout}>
              <p>ログアウト</p>
            </button>
          </div>
        )}
        {currentUser && !isSp && (
          <>
            <div className="d-flex justify-space-end mt-2" style={{ justifyContent:'flex-end' }}>
              <button 
                className="dropdown c-btn c-btn--user" 
                style={{ marginRight: '25px' }}
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
                  <p>マイページ</p>
                </button>
                <button 
                  className="dropdown-item c-btn c-btn--logout"
                  onClick={handleLogout}
                  style={{ 
                    margin: "0 0.5rem 0 0.5rem" 
                  }}
                >
                  <p>ログアウト</p>
                </button>
              </div>
            </div>

          </>
        )}
    </div>
  )
}

const Header = () => {
  
  const currentUser = UserService.getCurrentUser();
  const [isOpen, setOpen] = useState(false);

  useEffect(()=>{
    EventBus.on("logout", () => {
      logOut();
    });

    return()=>{
      EventBus.remove("logout");
    }
  }, []);


  const logOut = () => {
    UserService.logout();
    window.location.href = '/';
  }


    return (
      <>
        <header className="l-header" id="l-header">
          <nav className="c-nav">
            <div className="c-nav__left">
              <div className="c-logo">
                <a href="/">FANTATION</a>
              </div>
              <div className="pc-menu" id="c-nav--global">
                { !currentUser && (
                  <ul className="c-nav--global__menu">
                    <li className="c-menuitem--global c-menuitem--global--top">
                      <a href="/">
                        TOP
                      </a>
                    </li>
                    <li className="c-menuitem--global c-menuitem--global--feature">
                      <a href="/#p-feature">
                        FANTATIONの特徴
                      </a>
                    </li>
                    <li className="c-menuitem--global c-menuitem--global--coin">
                      <a href="/#p-coin">
                        取り扱いコイン
                      </a>
                    </li>
                    <li className="c-menuitem--global c-menuitem--global--service">
                      <a href="/#p-flow">
                        ご利用の流れ
                      </a>
                    </li>
                    <li className="c-menuitem--global c-menuitem--global--media">
                      <a href="/#p-media">
                        掲載メディア
                      </a>
                    </li>
                    <li className="c-menuitem--global c-menuitem--global--service">
                      <Dropdown overlay={AboutMenu}>
                        <a className="ant-dropdown-link" href>
                          本サービスについて
                        </a>
                      </Dropdown>
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
                        個人情報管理
                      </Link>
                    </li>
                    <li className="c-menuitem--global c-menuitem--global--coin">
                      <Link to="/coins">
                        購入可能オーナー権一覧
                      </Link>
                    </li>
                    <li className="c-menuitem--global c-menuitem--global--use">
                      <Link to="/coins/owned">
                        取引
                      </Link>
                    </li>
                  </ul>
                )}
                <NavRight currentUser={currentUser} className="sp-only-flex" handleLogout={logOut}/>
              </div>
            </div>

            <NavRight currentUser={currentUser} className="pc-only" handleLogout={logOut}/>

            <div className="sp-menu c-nav--sp__menu" id="c-nav--sp__menu">
              {!currentUser && (
                <button onClick={() => window.location.href = '/register'} style={{ fontFamily: '"yu-mincho-pr6n", "sans-serif"' }}>
                  会員登録<br className="sp-onlyt"/>（無料）
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