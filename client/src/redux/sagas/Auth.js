import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import {
	SIGNIN,
	SIGNOUT,
	SIGNUP,
	SIGNIN_WITH_GOOGLE,
	SIGNUP_WITH_GOOGLE,
	SIGNIN_WITH_FACEBOOK,
	SIGNUP_WITH_FACEBOOK,
	SIGNUP_WITH_APPLE,
	SIGNIN_WITH_APPLE,
	SIGNUP_WITH_TWITTER,
	SIGNIN_WITH_TWITTER,
	SIGNIN_WITH_LINE,
	SIGNUP_WITH_LINE,
} from '../constants/Auth';
import {
	showAuthMessage,
	// authenticated,
	signOutSuccess,
	signInWithFacebookAuthenticated,
} from "../actions/Auth";

// import {
// 	setUser,
// } from "../actions/App";

import api from 'api';
import FirebaseService from 'services/firebase'
import JwtService from 'services/jwt';
import { APP_ENTRY_PATH } from 'configs/AppConfig';

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

/* ----------------------------------
	  Google Authentication
-----------------------------------*/
export function* signUpWithGoogle() {
	yield takeEvery(SIGNUP_WITH_GOOGLE, function* () {
		try {
			const response = yield call(FirebaseService.signInGoogleRequest);
			if (response.message) {
				yield put(showAuthMessage(response.message));
			} else {
				const params = { email: response.user.email };
				const { data } = yield call(api.userAuth.signUpWithSNS, params);
				if (data.statusCode === 200) {
					JwtService.setToken(data.token);
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

export function* signInWithGoogle() {
	yield takeEvery(SIGNIN_WITH_GOOGLE, function* () {
		try {
			const response = yield call(FirebaseService.signInGoogleRequest);
			if (response.message) {
				yield put(showAuthMessage(response.message));
			} else {
				const params = { email: response.user.email };
				const { data } = yield call(api.userAuth.loginWithSNS, params);
				if (data.statusCode === 200) {
					JwtService.setToken(data.token);
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

/* ----------------------------------
	  Facebook Authentication
-----------------------------------*/
export function* signUpWithFacebook() {
	yield takeEvery(SIGNUP_WITH_FACEBOOK, function* () {
		try {
			const response = yield call(FirebaseService.signInFacebookRequest);
			console.log(response);
			if (response.message) {
				yield put(showAuthMessage(response.message));
			} else {
				const params = { email: response.user.email };
				const { data } = yield call(api.userAuth.signUpWithSNS, params);
				if (data.statusCode === 200) {
					JwtService.setToken(data.token);
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
			const response = yield call(FirebaseService.signInFacebookRequest);
			console.log(response);
			if (response.message) {
				yield put(showAuthMessage(response.message));
			} else {
				const params = { email: response.user.email };
				const { data } = yield call(api.userAuth.loginWithSNS, params);
				if (data.statusCode === 200) {
					JwtService.setToken(data.token);
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

/* ----------------------------------
	  Twitter Authentication
-----------------------------------*/
export function* signUpWithTwitter() {
	yield takeEvery(SIGNUP_WITH_TWITTER, function* () {
		try {
			const response = yield call(FirebaseService.signInTwitterRequest);
			console.log(response);
			if (response.message) {
				yield put(showAuthMessage(response.message));
			} else {
				const params = { email: response.user.email };
				const { data } = yield call(api.userAuth.signUpWithSNS, params);
				if (data.statusCode === 200) {
					JwtService.setToken(data.token);
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

export function* signInWithTwitter() {
	yield takeEvery(SIGNIN_WITH_TWITTER, function* () {
		try {
			const response = yield call(FirebaseService.signInTwitterRequest);
			console.log(response);
			if (response.message) {
				yield put(showAuthMessage(response.message));
			} else {
				const params = { email: response.user.email };
				const { data } = yield call(api.userAuth.loginWithSNS, params);
				if (data.statusCode === 200) {
					JwtService.setToken(data.token);
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

/* ----------------------------------
	  Apple Authentication
-----------------------------------*/
export function* signUpWithApple() {
	yield takeEvery(SIGNUP_WITH_APPLE, function* () {
		try {
			const response = yield call(FirebaseService.signInAppleRequest);
			console.log(response);
			if (response.message) {
				yield put(showAuthMessage(response.message));
			} else {
				const params = { email: response.user.email };
				const { data } = yield call(api.userAuth.signUpWithSNS, params);
				if (data.statusCode === 200) {
					JwtService.setToken(data.token);
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

export function* signInWithApple() {
	yield takeEvery(SIGNIN_WITH_APPLE, function* () {
		try {
			const response = yield call(FirebaseService.signInAppleRequest);
			console.log(response);
			if (response.message) {
				yield put(showAuthMessage(response.message));
			} else {
				const params = { email: response.user.email };
				const { data } = yield call(api.userAuth.loginWithSNS, params);
				if (data.statusCode === 200) {
					JwtService.setToken(data.token);
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

/* ----------------------------------
	  LINE Authentication
-----------------------------------*/
export function* signUpWithLine() {
	yield takeEvery(SIGNUP_WITH_LINE, function* () {
		try {
			// const response = yield call(FirebaseService.signInAppleRequest);
			// console.log(response);
			// if (response.message) {
			// 	yield put(showAuthMessage(response.message));
			// } else {
			// 	const params = { email: response.user.email };
			// 	const { data } = yield call(api.userAuth.signUpWithSNS, params);
			// 	if (data.statusCode === 200) {
			// 		JwtService.setToken(data.token);
			// 		window.location.href = APP_ENTRY_PATH;
			// 	} else {
			// 		yield put(showAuthMessage(data.message));
			// 	}
			// }
		} catch (error) {
			yield put(showAuthMessage(error));
		}
	});
}

export function* signInWithLine() {
	yield takeEvery(SIGNIN_WITH_LINE, function* () {
		try {
			console.log('asdfa');
			// const response = yield call(FirebaseService.signInAppleRequest);
			// console.log(response);
			// if (response.message) {
			// 	yield put(showAuthMessage(response.message));
			// } else {
			// 	const params = { email: response.user.email };
			// 	const { data } = yield call(api.userAuth.loginWithSNS, params);
			// 	if (data.statusCode === 200) {
			// 		JwtService.setToken(data.token);
			// 		window.location.href = APP_ENTRY_PATH;
			// 	} else {
			// 		yield put(showAuthMessage(data.message));
			// 	}
			// }
		} catch (error) {
			yield put(showAuthMessage(error));
		}
	});
}

export default function* rootSaga() {
	yield all([
		fork(signUpWithEmail),
		fork(signInWithEmail),
		fork(signOut),
		fork(signInWithGoogle),
		fork(signUpWithGoogle),
		fork(signInWithFacebook),
		fork(signUpWithFacebook),
		fork(signInWithTwitter),
		fork(signUpWithTwitter),
		fork(signInWithApple),
		fork(signUpWithApple),
		fork(signInWithLine),
		fork(signUpWithLine),
	]);
}
