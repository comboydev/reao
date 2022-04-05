import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${APP_PREFIX_PATH}/sales`} component={lazy(() => import(`./sales`))} />
        <Route exact path={`${APP_PREFIX_PATH}/users`} component={lazy(() => import(`./users`))} />
        <Route exact path={`${APP_PREFIX_PATH}/users/:id`} component={lazy(() => import(`./users/detail`))} />
        <Route exact path={`${APP_PREFIX_PATH}/orders`} component={lazy(() => import(`./orders`))} />

        <Route path={`${APP_PREFIX_PATH}/coins`} component={lazy(() => import(`./coins`))} />
        <Route path={`${APP_PREFIX_PATH}/mail`} component={lazy(() => import(`./mail`))} />
        <Route path={`${APP_PREFIX_PATH}/news`} component={lazy(() => import(`./news`))} />
        <Route path={`${APP_PREFIX_PATH}/setting`} component={lazy(() => import(`./setting`))} />
        <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/users`} />
        
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);
