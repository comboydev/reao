import React, { lazy, Suspense, useEffect } from "react";
import {Switch, Route, Redirect, useLocation, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { IntlProvider } from "react-intl";
import AppLocale from "lang";
import Header    from     "./layouts/header";
import Footer    from     "./layouts/footer";
import Loading from "components/shared-components/Loading";
import UserService from "services/user.service";


const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

function RouteInterceptor({ children, ...rest }) {
  const user = UserService.getCurrentUser();
  if (user) {
    const decodedJwt = parseJwt(user.accessToken);
    if (decodedJwt.exp * 1000 < Date.now()) {
      UserService.logout();
      return;
    }
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        {
          if(!user) 
            return <Redirect to={{ pathname: '/login', state: { from: location } }}/>
          else{
            if(!user.emailVerified){
              return <Redirect to={{ pathname: '/verify/email', state: { from: location } }}/>
            } else {
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


const UserViews = (props) => {
  const { locale } = props;
  const currentAppLocale = AppLocale[locale];

  return (
    <main>
      <IntlProvider locale={currentAppLocale.locale} messages={currentAppLocale.messages}>
        <RouteHandler/>
        <Switch>
          <React.Fragment>
            <Header/>
              <Suspense fallback={<Loading cover="page"/>}>
                <div style={{ minHeight: '600px' }}>
                  <Switch>
                    <Route exact path="/" component={lazy(() => import(`./views/common/home`))} />
                    <Route exact path="/terms" component={lazy(() => import(`./views/common/terms`))} />
                    <Route exact path="/sct-law" component={lazy(() => import(`./views/common/sct-law`))} />
                    <Route exact path="/privace-policy" component={lazy(() => import(`./views/common/privace-policy`))} />
                    <Route exact path="/company" component = {lazy(() => import(`./views/common/company`))} />
                    <Route exact path="/contact-us" component={lazy(() => import(`./views/common/contact`))} />
                    <Route exact path="/contact-us/complete" component={lazy(() => import(`./views/common/contact/complete`))} />
                    <Route exact path="/preparation" component={lazy(() => import(`./components/preparation.component`))} />
                    <Route exact path="/exhibit" component = {lazy(() => import(`./views/common/exhibit`))} />
                    
                    
                    <Route exact path="/login" component={lazy(() => import(`./views/auth/login/index`))} />
                    <Route exact path="/register" component={lazy(() => import(`./views/auth/register`))} />
                    <Route exact path="/register/complete" component={lazy(() => import(`./views/auth/register/complete`))} />
                    <Route exact path="/verify/email" component={lazy(() => import(`./views/auth/verify`))} />
                    <Route exact path="/verify/email/:token" component={lazy(() => import(`./views/auth/verify/verify-email`))} />
                    <Route exact path="/forgot-password" component={lazy(() => import(`./views/auth/forgot-password`))} />
                    <Route exact path="/forgot-password/reset/:token" component={lazy(() => import(`./views/auth/forgot-password/reset`))} />


                    <RouteInterceptor path="/">
                      <Route exact path="/mypage" component={lazy(() => import(`./views/mypage`))} />
                      <Route exact path="/profile" component={lazy(() => import(`./views/profile`))} />
                      <Route exact path="/profile/change-password" component={lazy(() => import(`./views/profile/change-password`))} />
                      <Route exact path="/partner" component={lazy(() => import(`./views/mypage/partner`))} />
                      
                      <Route exact path="/coins" component={lazy(() => import(`./views/coin`))} />
                      <Route exact path="/coins/detail/:id" component = {lazy(() => import(`./views/coin/detail/index`))} />
                      <Route exact path="/coins/purchase/order/:id" component = {lazy(() => import(`./views/coin/purchase/order`))} />
                      <Route exact path="/coins/owned">
                        <Redirect to="/preparation" />
                      </Route>
                      
                    </RouteInterceptor>
                </Switch>
                </div>
              <Footer />
            </Suspense> 
          </React.Fragment>
        </Switch>
      </IntlProvider>
    </main>
  );
}

const mapStateToProps = ({ theme }) => {
  const { locale } =  theme;
  return { locale }
};

export default withRouter(connect(mapStateToProps)(UserViews));