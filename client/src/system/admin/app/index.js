import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { APP_PREFIX_PATH } from 'configs/AppConfig'

export const AdminAppViews = () => {
  return (
    <Suspense fallback={''}>
      <Switch>
        <Route exact path={`${APP_PREFIX_PATH}/users`} component={lazy(() => import(`./users`))} />
        <Route exact path={`${APP_PREFIX_PATH}/users/:id`} component={lazy(() => import(`./users/detail`))} />
        <Route exact path={`${APP_PREFIX_PATH}/affiliate`} component={lazy(() => import(`./affiliate`))} />
        <Route exact path={`${APP_PREFIX_PATH}/affiliate/list`} component={lazy(() => import(`./affiliate`))} />
        <Route exact path={`${APP_PREFIX_PATH}/affiliate/reward-group`} component={lazy(() => import(`./affiliate/reward-group`))} />

        <Route path={`${APP_PREFIX_PATH}/marketplace`} component={lazy(() => import(`./market`))} />
        <Route path={`${APP_PREFIX_PATH}/coins`} component={lazy(() => import(`./coins`))} />
        <Route path={`${APP_PREFIX_PATH}/mail`} component={lazy(() => import(`./mail`))} />
        <Route path={`${APP_PREFIX_PATH}/setting`} component={lazy(() => import(`./setting`))} />

        <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/users`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(AdminAppViews);
