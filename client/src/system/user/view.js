import React, { lazy, Suspense, useEffect } from "react";
import { ConfigProvider } from 'antd';
import { Switch, Route, Redirect, useLocation, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { IntlProvider } from "react-intl";
import AppLocale from "lang";
import Header from "./layouts/header";
import Footer from "./layouts/footer";
import Loading from "components/shared-components/Loading";
import { onConnectWallet, fetchJpy2Matic, fetchUser } from "redux/actions";

function RouteInterceptor({ children, isAuthenticated, user, fetchUser, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!isAuthenticated)
          return <Redirect to={{ pathname: '/login', state: { from: location } }} />
        else {
          if (!user) {
            fetchUser()
          }
          else if (user?.emailVerified === false) {
            return <Redirect to={{ pathname: '/verify/email', state: { from: location } }} />
          }
          else {
            return children;
          }
        }
      }
      }
    />
  );
}

const RouteHandler = () => {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

const UserViews = (props) => {
  const { locale, token, onConnectWallet, fetchJpy2Matic, fetchUser } = props;
  const currentAppLocale = AppLocale[locale];
  useEffect(() => {
    if (token) {
      onConnectWallet();
      fetchJpy2Matic();
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return (
    <main>
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}>
        <ConfigProvider locale={currentAppLocale.antd}>
          <RouteHandler />
          <Switch>
            <React.Fragment>
              <Header />
              <Suspense fallback={<Loading cover="page" />}>
                <div style={{ minHeight: '600px' }}>
                  <Switch>
                    <Route exact path="/" component={lazy(() => import(`./pages/home`))} />
                    <Route exact path="/terms" component={lazy(() => import(`./pages/terms`))} />
                    <Route exact path="/sct-law" component={lazy(() => import(`./pages/sct-law`))} />
                    <Route exact path="/privace-policy" component={lazy(() => import(`./pages/privace-policy`))} />
                    <Route exact path="/company" component={lazy(() => import(`./pages/company`))} />
                    <Route exact path="/contact-us" component={lazy(() => import(`./pages/contact`))} />
                    <Route exact path="/contact-us/complete" component={lazy(() => import(`./pages/contact/complete`))} />
                    <Route exact path="/preparation" component={lazy(() => import(`./pages/preparation`))} />
                    <Route exact path="/exhibit" component={lazy(() => import(`./pages/exhibit`))} />

                    <Route exact path="/login" component={lazy(() => import(`./views/auth/login/index`))} />
                    <Route exact path="/register" component={lazy(() => import(`./views/auth/register`))} />
                    <Route exact path="/register/complete" component={lazy(() => import(`./views/auth/register/complete`))} />
                    <Route exact path="/forgot-password" component={lazy(() => import(`./views/auth/forgot-password`))} />
                    <Route exact path="/forgot-password/reset/:token" component={lazy(() => import(`./views/auth/forgot-password/reset`))} />
                    <Route exact path="/verify/email" component={lazy(() => import(`./views/auth/verify`))} />
                    <Route exact path="/verify/email/:token" component={lazy(() => import(`./views/auth/verify/verify-email`))} />

                    <RouteInterceptor isAuthenticated={token} {...props}>
                      <Route exact path="/mypage" component={lazy(() => import(`./views/app/mypage`))} />
                      <Route exact path="/profile" component={lazy(() => import(`./views/app/profile`))} />
                      <Route exact path="/profile/change-password" component={lazy(() => import(`./views/app/profile/change-password`))} />
                      <Route exact path="/affiliate" component={lazy(() => import(`./views/app/affiliate`))} />

                      <Route exact path="/coins/owned" component={lazy(() => import(`./views/app/coins/owned`))} />
                      <Route exact path="/coins/sale" component={lazy(() => import(`./views/app/coins/sale`))} />
                      <Route exact path="/coins/detail/:id" component={lazy(() => import(`./views/app/coins/detail`))} />

                      <Route exact path="/marketplace/items" component={lazy(() => import(`./views/app/market/items`))} />
                      <Route exact path="/marketplace/items/:id" component={lazy(() => import(`./views/app/market/detail`))} />
                    </RouteInterceptor>
                  </Switch>
                </div>
                <Footer />
              </Suspense>
            </React.Fragment>
          </Switch>
        </ConfigProvider>
      </IntlProvider>
    </main>
  );
}

const mapStateToProps = ({ theme, auth, appStore }) => {
  const { locale } = theme;
  const { token } = auth;
  const { user } = appStore;
  return { locale, token, user }
};

export default withRouter(
  connect(mapStateToProps, { onConnectWallet, fetchJpy2Matic, fetchUser }
  )(UserViews));