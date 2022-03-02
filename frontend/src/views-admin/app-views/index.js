import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${APP_PREFIX_PATH}/dashboard/default`} component={lazy(() => import(`./dashboards/default`))} />
        <Route path={`${APP_PREFIX_PATH}/dashboard/analytic`} component={lazy(() => import(`./dashboards/analytic`))} />
        <Route path={`${APP_PREFIX_PATH}/dashboard/sales`} component={lazy(() => import(`./dashboards/sales`))} />
        <Route path={`${APP_PREFIX_PATH}/dashboard/users`} component={lazy(() => import(`./dashboards/users`))} />

        <Route path={`${APP_PREFIX_PATH}/mail`} component={lazy(() => import(`./apps/mail`))} />
        <Route path={`${APP_PREFIX_PATH}/chat`} component={lazy(() => import(`./apps/chat`))} />
        <Route path={`${APP_PREFIX_PATH}/product`} component={lazy(() => import(`./apps/product`))} />
        <Route path={`${APP_PREFIX_PATH}/profile`} component={lazy(() => import(`./pages/profile`))} />
        <Route path={`${APP_PREFIX_PATH}/setting`} component={lazy(() => import(`./pages/setting`))} />
        
        <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/dashboard/default`} />
        <Redirect from={`${APP_PREFIX_PATH}/dashboard`} to={`${APP_PREFIX_PATH}/dashboard/default`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);
