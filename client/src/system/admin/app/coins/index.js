import { lazy } from "react";
import { Route, Switch, Redirect } from 'react-router-dom';

const Coin = props => {
  const { match } = props
	return (
		<Switch>
			<Redirect exact from={`${match.url}`} to={`${match.url}/owned`} />
			<Route path={`${match.url}/create`} component={lazy(() => import('./create'))} />
			<Route path={`${match.url}/owned`} component={lazy(() => import('./list/owned'))} />
			<Route path={`${match.url}/sale`} component={lazy(() => import('./list/sale'))} />
			<Route path={`${match.url}/edit/:id`} component={lazy(() => import('./edit'))} />
			<Route path={`${match.url}/detail/:id`} component={lazy(() => import('./detail'))} />
		</Switch>
	)
}

export default Coin

