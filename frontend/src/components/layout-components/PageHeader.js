import React from 'react'
import IntlMessage from '../util-components/IntlMessage';

export const PageHeader = ({ title, display }) => {
	return (
		display ? (
			<div className="app-page-header">
				<h3 className="mb-0 mr-3 font-weight-semibold">
					<IntlMessage id={title? title : 'home'}/>
				</h3>
			</div>
		)
		: null
	)
}

export default PageHeader