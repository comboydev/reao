import { SIDE_NAV_LIGHT, NAV_TYPE_SIDE, DIR_LTR } from 'constants/ThemeConstant';
import { env } from './EnvironmentConfig'

export const APP_NAME = 'Fantation';
export const API_URL = env.API_ENDPOINT_URL;
export const APP_PREFIX_PATH = '/admin';
export const AUTH_PREFIX_PATH = '/admin/auth';
export const APP_ENTRY_PATH =
	window.location.href.includes("admin") ? "/admin/users" : "/mypage";

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

export const FirebaseConfig = {
	apiKey: "AIzaSyAbB6cdOwM_KlIxmlRo5oNkfoElhyzMxq8",
	authDomain: "fantation-auth.firebaseapp.com",
	projectId: "fantation-auth",
	storageBucket: "fantation-auth.appspot.com",
	messagingSenderId: "179966162488",
	appId: "1:179966162488:web:393852192afbb61f4018cd",
	measurementId: "G-8RWR05S6ZZ"
};