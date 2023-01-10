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

import AdminService from 'services/admin.service';

export function* signInWithEmail() {
  yield takeEvery(SIGNIN, function* ({payload}) {
		const {email, password} = payload;
		try{
			const response = yield call( AdminService.adminLogin, email, password ); 
			if (response.data.status_code === 200) {
				delete response.data.status_code;
				let token = response.data;
				AdminService.setCurrentAdmin(token);
				yield put(authenticated(token.accessToken));
			} else {
				yield put(showAuthMessage(response.data.message));
			}
		}  catch (err) {
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
