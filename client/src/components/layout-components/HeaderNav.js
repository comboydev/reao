import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Layout, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import Logo from './Logo';
import NavProfile from './NavProfile';
import NavLanguage from './NavLanguage';
import NavSearch  from './NavSearch';
import { toggleCollapsedNav, onMobileNavToggle } from 'redux/actions/Theme';
import { onConnectWallet } from 'redux/actions/Marketplace';
import { NAV_TYPE_TOP, SIDE_NAV_COLLAPSED_WIDTH, SIDE_NAV_WIDTH } from 'constants/ThemeConstant';
import utils from 'plugins/utils'
import { shorter } from 'contracts/hooks';

const { Header } = Layout;

export const HeaderNav = props => {
  const {
    navCollapsed,
    mobileNav,
    navType,
    headerNavColor,
    toggleCollapsedNav,
    onMobileNavToggle,
    isMobile,
    currentTheme,
    walletAccount,
    onConnectWallet,
  } = props;
  const [searchActive, setSearchActive] = useState(false)

  useEffect(() => {
    onConnectWallet();
  })
    
  const connectToMetamask = async () => {
    if (walletAccount) utils.copyClipboard(walletAccount);
    else onConnectWallet();
	}

  const onSearchClose = () => {
    setSearchActive(false)
  }

  const onToggle = () => {
    if(!isMobile) {
      toggleCollapsedNav(!navCollapsed)
    } else {
      onMobileNavToggle(!mobileNav)
    }
  }

  const isNavTop = navType === NAV_TYPE_TOP ? true : false
  const mode = ()=> {
    if(!headerNavColor) {
      return utils.getColorContrast(currentTheme === 'dark' ? '#00000' : '#ffffff' )
    }
    return utils.getColorContrast(headerNavColor)
  }
  const navMode = mode()
  const getNavWidth = () => {
    if(isNavTop || isMobile) {
      return '0px'
    }
    if(navCollapsed) {
      return `${SIDE_NAV_COLLAPSED_WIDTH}px`
    } else {
      return `${SIDE_NAV_WIDTH}px`
    }
  }

  useEffect(() => {
    if(!isMobile) {
      onSearchClose()
    }
  })
  
  return (
    <Header className={`app-header ${navMode}`} style={{backgroundColor: headerNavColor}}>
      <div className={`app-header-wrapper ${isNavTop ? 'layout-top-nav' : ''}`}>
        <a href="/"><Logo logoType={navMode}/></a>
        <div className="nav" style={{width: `calc(100% - ${getNavWidth()})`}}>
          <div className="nav-left">
            <ul className="ant-menu ant-menu-root ant-menu-horizontal">          
              {
                isNavTop && !isMobile ?
                null
                :
                <li className="ant-menu-item ant-menu-item-only-child" onClick={() => {onToggle()}}>
                  {navCollapsed || isMobile ? <MenuUnfoldOutlined className="nav-icon" /> : <MenuFoldOutlined className="nav-icon" />}
                </li>
              }
            </ul>
          </div>
          <div className="nav-right align-items-center">
            <NavLanguage />
            <NavProfile />
            <Button
              className="primary"
              type={walletAccount && "dashed"}
              onClick={connectToMetamask}>{
                walletAccount ? shorter(walletAccount) : "Connect Wallet"
            }</Button>
          </div>
          <NavSearch active={searchActive} close={onSearchClose}/>
        </div>
      </div>
    </Header>
  )
}

const mapStateToProps = ({ theme, marketplace }) => {
  const { navCollapsed, navType, headerNavColor, mobileNav, currentTheme, direction } = theme;
  const { walletAccount } = marketplace;
  return { navCollapsed, navType, headerNavColor, mobileNav, currentTheme, direction, walletAccount }
};

export default connect(mapStateToProps, {toggleCollapsedNav, onMobileNavToggle, onConnectWallet})(HeaderNav);