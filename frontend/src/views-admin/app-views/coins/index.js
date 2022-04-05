import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import CoinList from './list.js'
import AddCoin from './add.js'
import EditProduct from './edit.js'
import DetailCoin from './detail.js'

const Product = props => {
  const { match } = props
	return (
		<Switch>
			<Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
			<Route path={`${match.url}/add`} component={AddCoin} />
			<Route path={`${match.url}/list`} component={CoinList} />
			<Route path={`${match.url}/detail/:id`} component={DetailCoin} />
			{/* <Route path={`${match.url}/edit/:id`} component={EditProduct} /> */}
		</Switch>
	)
}

export default Product

