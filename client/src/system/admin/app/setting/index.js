import React, { lazy, Component } from 'react'
import {
	UserOutlined,
	LockOutlined,
	// CreditCardOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import InnerAppLayout from 'system/admin/layouts/inner-app-layout';

const SettingOption = ({ match, location }) => {
	return (
		<Menu
			defaultSelectedKeys={`${match.url}/profile`}
			mode="inline"
			selectedKeys={[location.pathname]}
		>
			<Menu.Item key={`${match.url}/profile`}>
				<UserOutlined />
				<span>Profile</span>
				<Link to={'profile'} />
			</Menu.Item>
			<Menu.Item key={`${match.url}/password`}>
				<LockOutlined />
				<span>Password</span>
				<Link to={'password'} />
			</Menu.Item>
			{/* <Menu.Item key={`${match.url}/bank`}>
				<CreditCardOutlined />
				<span>Bank</span>
				<Link to={`bank`} />
			</Menu.Item> */}
		</Menu>
	);
};

const SettingContent = ({ match }) => {
	return (
		<Switch>
			<Redirect exact from={`${match.url}`} to={`${match.url}/profile`} />
			<Route path={`${match.url}/profile`} component={lazy(() => import('./profile'))} />
			<Route path={`${match.url}/password`} component={lazy(() => import('./password'))} />
			{/* <Route path={`${match.url}/bank`} component={lazy(() => import('./bank'))} /> */}
		</Switch>
	)
}

export class Setting extends Component {
	render() {
		return (
			<InnerAppLayout
				sideContentWidth={320}
				sideContent={<SettingOption {...this.props} />}
				mainContent={<SettingContent {...this.props} />}
			/>
		);
	}
}

export default Setting
