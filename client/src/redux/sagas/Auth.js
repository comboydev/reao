import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import {
	AUTH_TOKEN,
	SIGNIN,
	SIGNOUT,
} from '../constants/Auth';
import {
	showAuthMessage,
	authenticated,
	signOutSuccess,
} from "../actions/Auth";

import JwtService from 'services/jwt';
import api from 'api';

export function* signInWithEmail() {
	yield takeEvery(SIGNIN, function* ({ payload }) {
		const { email, password } = payload;
		try {
			const { data } = yield call(api.adminAuth.login, email, password);
			if (data.statusCode === 200) {
				delete data.statusCode;
				let token = data;
				JwtService.setAdmin(token);
				yield put(authenticated(token.accessToken));
			} else {
				yield put(showAuthMessage(data.message));
			}
		} catch (err) {
			yield put(showAuthMessage(err.toString()));
		}
	});
}

export function* signOut() {
	yield takeEvery(SIGNOUT, function* () {
		try {
			localStorage.removeItem(AUTH_TOKEN);
			yield put(signOutSuccess(null));
		} catch (err) {
			yield put(showAuthMessage(err));
		}
	});
}


export default function* rootSaga() {
	yield all([
		fork(signInWithEmail),
		fork(signOut),
	]);
}
