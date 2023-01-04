import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import { message } from 'antd';
import {
	CONNECT_WALLET,
	LOAD_COINS_ON_SALE,
	LOAD_JPY2MATIC_RATE,
	LOAD_MARKET_ITEMS,
	LOAD_OWNED_COINS,
	LOAD_PURCHASE_HISTORY,
	LOAD_SALE_HISTORY,
} from '../constants/Marketplace';
import {
	onConnected,
	onLoadedCoinsOnSaleSucceed,
	onLoadedJpy2MaticRateSucceed,
	onLoadedMarketItemsSucceed,
	onLoadedOwnedCoinsSucceed,
	onLoadedPurchaseHistorySucceed,
	onLoadedSaleHistorySucceed,
} from "../actions/Marketplace";
import { getAccount } from 'contracts/hooks';
import Marketplace from 'contracts/services/marketplace';
import Token from 'contracts/services/token';

export function* connect() {
	yield takeEvery(CONNECT_WALLET, function* () {
		if (!window.ethereum) {
			message.error("Metamaskが必須です!");
			return;
		}
		const walletAccount = yield call(getAccount);
	  	yield put(onConnected(walletAccount));
	});
}

export function* loadJpy2MaticRate() {
	yield takeEvery(LOAD_JPY2MATIC_RATE, function* () {
		const rate = yield call(Marketplace.getJpy2MaticRate);
	  	yield put(onLoadedJpy2MaticRateSucceed(rate));
	});
}

export function* loadPurchaseHistory() {
	yield takeEvery(LOAD_PURCHASE_HISTORY, function* () {
		const transactions = yield call(Marketplace.getPurchaseHistory);
	  	yield put(onLoadedPurchaseHistorySucceed(transactions));
	});
}

export function* loadSaleHistory() {
	yield takeEvery(LOAD_SALE_HISTORY, function* () {
		const transactions = yield call(Marketplace.getSaleHistory);
	  	yield put(onLoadedSaleHistorySucceed(transactions));
	});
}

export function* loadMarketItems() {
	yield takeEvery(LOAD_MARKET_ITEMS, function* () {
		const items = yield call(Marketplace.getAllItems);
	  	yield put(onLoadedMarketItemsSucceed(items));
	});
}

export function* loadOwnedCoins() {
	yield takeEvery(LOAD_OWNED_COINS, function* () {
		const items = yield call(Token.getTokensOf);
	  	yield put(onLoadedOwnedCoinsSucceed(items));
	});
}

export function* loadCoinsOnSale() {
	yield takeEvery(LOAD_COINS_ON_SALE, function* () {
		const items = yield call(Marketplace.getItemsOf);
	  	yield put(onLoadedCoinsOnSaleSucceed(items));
	});
}


export default function* rootSaga() {
	yield all([
		fork(connect),
		fork(loadJpy2MaticRate),
		fork(loadPurchaseHistory),
		fork(loadSaleHistory),
		fork(loadMarketItems),
		fork(loadOwnedCoins),
		fork(loadCoinsOnSale),
	]);
}
