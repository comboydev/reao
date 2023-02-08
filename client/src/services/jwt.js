import {
	AUTH_TOKEN,
} from 'redux/constants/Auth';

const Jwt = {
	token: () => {
		return localStorage.getItem(AUTH_TOKEN)
	},
	setToken: (token) => {
		localStorage.setItem(AUTH_TOKEN, token)
	},
	logout: () => {
		localStorage.removeItem(AUTH_TOKEN);
	}
}


export default Jwt;
