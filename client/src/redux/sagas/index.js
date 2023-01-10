import { all } from 'redux-saga/effects';
import Auth from './Auth';
import Marketplace from './Marketplace';

export default function* rootSaga(getState) {
  yield all([
    Auth(),
    Marketplace(),
  ]);
}
