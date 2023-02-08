import { all } from 'redux-saga/effects';
import Auth from './Auth';
import AppStore from './App';
import Marketplace from './Marketplace';

export default function* rootSaga(getState) {
  yield all([
    Auth(),
    AppStore(),
    Marketplace(),
  ]);
}
