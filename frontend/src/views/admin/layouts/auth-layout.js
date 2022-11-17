import React from 'react'
import { Switch, Route, } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { useThemeSwitcher } from "react-css-theme-switcher";
import AdminAuthViews from 'views/admin/auth';

export const AuthLayout = () => {
	const { status } = useThemeSwitcher();

	if (status === 'loading') {
		return <Loading cover="page" />;
	}

	return (
		<div className="auth-container">
			<Switch>
				<Route path="" component={AdminAuthViews} />
			</Switch>
		</div>
	)
}


export default AuthLayout
