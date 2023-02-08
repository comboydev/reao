import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import {
	SIGNIN,
	SIGNOUT,
} from '../constants/Auth';
import {
	showAuthMessage,
	// authenticated,
	signOutSuccess,
} from "../actions/Auth";

import {
	setUser,
} from "../actions/App";

import api from 'api';
import JwtService from 'services/jwt';

export function* signInWithEmail() {
	yield takeEvery(SIGNIN, function* ({ payload }) {
		const { email, password } = payload;
		try {
			const { data } = yield call(api.adminAuth.login, email, password);
			if (data.statusCode === 200) {
				JwtService.setToken(data.token);
				// yield put(authenticated(data.token));
				yield put(setUser(data.user));
				window.location.href = "/admin/users"
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
			JwtService.logout();
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
