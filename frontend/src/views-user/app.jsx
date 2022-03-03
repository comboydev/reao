import React, { lazy, Suspense } from "react";
import {BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import AuthService from "services/auth.service";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/sass/index.scss";
import './assets/js';

// import AuthVerify from "./service/auth-verify";
import Header    from     "./layouts/header";
import Footer    from     "./layouts/footer";
import Loading from "components/shared-components/Loading";


const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

function RouteInterceptor({ children, ...rest }) {
  const user = AuthService.getCurrentUser();
  if (user) {
    const decodedJwt = parseJwt(user.accessToken);
    if (decodedJwt.exp * 1000 < Date.now()) {
      AuthService.logout();
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
            if(!user.status.emailVerified){
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



const  UserApp = () => {
  return (
  <main>
    <Router>
      <Switch>
        <React.Fragment>
          <Header/>
          <div style={{ minHeight: '600px' }}>
          <Suspense fallback={<Loading cover="page"/>}>
            <Switch>
              <Route exact path="/" component={lazy(() => import(`./views/common/home`))} />
              <Route exact path="/policy" component={lazy(() => import(`./views/common/policy`))} />
              <Route exact path="/rules" component={lazy(() => import(`./components/rules.component`))} />
              <Route exact path="/contact" component={lazy(() => import(`./views/common/contact`))} />
              <Route exact path="/contact/complete" component={lazy(() => import(`./views/common/contact/complete`))} />
              <Route exact path="/preparation" component={lazy(() => import(`./components/preparation.component`))} />
              
              
              <Route exact path="/login" component={lazy(() => import(`./views/auth/login/index`))} />
              <Route exact path="/register" component={lazy(() => import(`./views/auth/register`))} />
              <Route exact path="/verify/email" component={lazy(() => import(`./views/auth/verify`))} />
              <Route exact path="/verify/email/:token" component={lazy(() => import(`./views/auth/verify/verify-email`))} />
              <Route exact path="/verify/email/complete/:token" component={lazy(() => import(`./views/auth/verify/complete`))} />
              <Route exact path="/forgot-password" component={lazy(() => import(`./views/auth/forgot-password`))} />


              <RouteInterceptor path="/">
                <Route exact path="/mypage" component={lazy(() => import(`./views/mypage`))} />
                <Route exact path="/profile" component={lazy(() => import(`./views/profile`))} />
                <Route exact path="/profile/change-password" component={lazy(() => import(`./views/profile/change-password`))} />
                
                <Route exact path="/coins" component={lazy(() => import(`./views/coins`))} />
                <Route exact path="/coins/owned">
                  <Redirect to="/preparation" />
                </Route>

                <Route exact path="/sct" component={lazy(() => import(`./components/sct.component`))} />
                <Route exact path="/transaction" component = {lazy(() => import(`./views/Transaction`))} />
                <Route exact path="/company" component = {lazy(() => import(`./views/common/company`))} />
                <Route exact path="/service" component = {lazy(() => import(`./views/Service`))} />
                <Route exact path="/production" component = {lazy(() => import(`./views/ProductDetail`))} />
                <Route exact path="/sell" component = {lazy(() => import(`./views/Sell`))} />
                <Route exact path="/confirm" component = {lazy(() => import(`./views/Confirm`))} />
              </RouteInterceptor>
            </Switch>

            <Footer />
          </Suspense> 
          </div>
        </React.Fragment>
      </Switch>
    </Router>
    </main>
  );
}

export default UserApp;