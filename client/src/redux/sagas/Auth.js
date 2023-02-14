import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import {
	SIGNIN,
	SIGNOUT,
	SIGNUP,
	SIGNIN_WITH_GOOGLE,
	SIGNUP_WITH_GOOGLE,
	SIGNIN_WITH_FACEBOOK,
} from '../constants/Auth';
import {
	showAuthMessage,
	// authenticated,
	signOutSuccess,
	signInWithFacebookAuthenticated,
} from "../actions/Auth";

import {
	setUser,
} from "../actions/App";

import api from 'api';
import FirebaseService from 'services/firebase'
import JwtService from 'services/jwt';
import { APP_ENTRY_PATH } from 'configs/AppConfig';

export function* signInWithEmail() {
	yield takeEvery(SIGNIN, function* ({ payload }) {
		const roleType = window.location.href.includes("admin") ? "admin" : "user"
		try {
			const { data } = yield call(api[`${roleType}Auth`].login, payload);
			if (data.statusCode === 200) {
				JwtService.setToken(data.token);
				// yield put(authenticated(data.token));
				// yield put(setUser(data.user));
				window.location.href = APP_ENTRY_PATH
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

export function* signUpWithEmail() {
	yield takeEvery(SIGNUP, function* ({ payload }) {
		try {
			const { data } = yield call(api.userAuth.signUp, payload);
			if (data.statusCode === 200) {
				window.location.href = "/register/complete";
			} else {
				yield put(showAuthMessage(data.message));
			}
		} catch (error) {
			const resMessage =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			yield put(showAuthMessage(resMessage));
		}
	}
	);
}

export function* signInWithFBGoogle() {
	yield takeEvery(SIGNIN_WITH_GOOGLE, function* () {
		try {
			const user = yield call(FirebaseService.signInGoogleRequest);
			if (user.message) {
				yield put(showAuthMessage(user.message));
			} else {
				const { data } = yield call(api.auth.loginWithGoogle, user.user.email);
				if (data.statusCode === 200) {
					JwtService.setToken(data.token);
					// yield put(signInWithGoogleAuthenticated(data.token));
					yield put(setUser(data.user));
					window.location.href = APP_ENTRY_PATH;
				} else {
					yield put(showAuthMessage(data.message));
				}
			}
		} catch (error) {
			yield put(showAuthMessage(error));
		}
	});
}

export function* signUpWithFBGoogle() {
	yield takeEvery(SIGNUP_WITH_GOOGLE, function* () {
		try {
			const user = yield call(FirebaseService.signInGoogleRequest);
			if (user.message) {
				yield put(showAuthMessage(user.message));
			} else {
				const { data } = yield call(api.auth.signUpWithGoogle, user.user.email);
				if (data.statusCode === 200) {
					JwtService.setToken(data.token);
					// yield put(signUpSuccess(data.token));
					yield put(setUser(data.user));
					window.location.href = APP_ENTRY_PATH;
				} else {
					yield put(showAuthMessage(data.message));
				}
			}
		} catch (error) {
			yield put(showAuthMessage(error));
		}
	});
}

export function* signInWithFacebook() {
	yield takeEvery(SIGNIN_WITH_FACEBOOK, function* () {
		try {
			const user = yield call(FirebaseService.signInFacebookRequest);
			if (user.message) {
				yield put(showAuthMessage(user.message));
			} else {
				JwtService.setToken(user.user.uid);
				yield put(signInWithFacebookAuthenticated(user.user.uid));
			}
		} catch (error) {
			yield put(showAuthMessage(error));
		}
	});
}


export default function* rootSaga() {
	yield all([
		fork(signInWithEmail),
		fork(signOut),
		fork(signUpWithEmail),
		fork(signInWithFBGoogle),
		fork(signUpWithFBGoogle),
		fork(signInWithFacebook),
	]);
}
