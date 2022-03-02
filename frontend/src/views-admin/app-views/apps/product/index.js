import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import ProductList from './list'
import AddProduct from './add'
import EditProduct from './edit'
import Orders from './orders'

const Product = props => {
  const { match } = props
	return (
		<Switch>
			<Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
			<Route path={`${match.url}/add`} component={AddProduct} />
			<Route path={`${match.url}/edit/:id`} component={EditProduct} />
			<Route path={`${match.url}/list`} component={ProductList} />
			<Route path={`${match.url}/orders`} component={Orders} />
		</Switch>
	)
}

export default Product

