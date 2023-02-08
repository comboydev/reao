import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import {
	LOAD_USER_INFO,
} from '../constants/App';
import {
	setUser
} from "../actions/App";
import api from 'api';

export function* loadUserInfo() {
	yield takeEvery(LOAD_USER_INFO, function* () {
		const { data } = yield call(api.userProfile.getUserInfo);
		yield put(setUser(data));
	});
}

export default function* rootSaga() {
	yield all([
		fork(loadUserInfo),
	]);
}
