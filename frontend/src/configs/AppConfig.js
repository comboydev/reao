import { SIDE_NAV_LIGHT, NAV_TYPE_SIDE, DIR_LTR } from 'constants/ThemeConstant';

export const APP_NAME = 'Fantation';
export const API_URL = process.env.REACT_APP_API_URL;
export const APP_PREFIX_PATH = '/admin';
export const AUTH_PREFIX_PATH = '/admin/auth';

export const THEME_CONFIG = {
	navCollapsed: false,
	sideNavTheme: SIDE_NAV_LIGHT,
	locale: 'ja',
	navType: NAV_TYPE_SIDE,
	topNavColor: '#3e82f7',
	headerNavColor: '',
	mobileNav: false,
	currentTheme: 'dark',
	direction: DIR_LTR
};
