import { lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

const Marketplace = props => {
  const { match } = props
	return (
		<Switch>
			<Redirect exact from={`${match.url}`} to={`${match.url}`} />
			<Route exact path={`${match.url}/items`} component={lazy(() => import('./items'))} />
			<Route exact path={`${match.url}/items/:id`} component={lazy(() => import('./detail'))} />
			<Route exact path={`${match.url}/order`} component={lazy(() => import('./order'))} />
		</Switch>
	)
}

export default Marketplace

