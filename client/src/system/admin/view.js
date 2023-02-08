import React from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import AppLayout from "./layouts/app-layout";
import AuthLayout from './layouts/auth-layout';
import AppLocale from "lang";
import { IntlProvider } from "react-intl";
import { ConfigProvider } from 'antd';
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from 'configs/AppConfig'
import useBodyClass from 'hooks/useBodyClass';
import { fetchUser } from "redux/actions";

function RouteInterceptor({ children, isAuthenticated, user, fetchUser, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!isAuthenticated)
          return (
            <Redirect
              to={{
                pathname: AUTH_PREFIX_PATH,
                state: { from: location }
              }}
            />
          )
        else {
          if (user) return children
          else {
            fetchUser()
            return null
          }
        }
      }
      }
    />
  );
}

export const Views = (props) => {
  const { locale, token, location, direction } = props;
  const currentAppLocale = AppLocale[locale];
  useBodyClass(`dir-${direction}`);
  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}>
      <ConfigProvider locale={currentAppLocale.antd} direction={direction}>
        <Switch>
          <Route exact path="/">
            <Redirect to={APP_PREFIX_PATH} />
          </Route>
          <Route path={AUTH_PREFIX_PATH}>
            <AuthLayout direction={direction} />
          </Route>
          <RouteInterceptor path={APP_PREFIX_PATH} isAuthenticated={token} {...props}>
            <AppLayout direction={direction} location={location} />
          </RouteInterceptor>
        </Switch>
      </ConfigProvider>
    </IntlProvider>
  )
}

const mapStateToProps = ({ theme, auth, appStore }) => {
  const { locale, direction } = theme;
  const { token } = auth;
  const { user } = appStore;
  return { locale, direction, token, user }
};

export default withRouter(connect(mapStateToProps, { fetchUser })(Views));