import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import { message } from 'antd';
import {
	CONNECT_WALLET,
	LOAD_COINS_ON_SALE,
	LOAD_JPY2MATIC_RATE,
	LOAD_MARKET_BALANCE,
	LOAD_MARKET_ITEMS,
	LOAD_MARKET_OWNER,
	LOAD_OWNED_COINS,
	LOAD_PURCHASE_HISTORY,
	LOAD_SALE_HISTORY,
} from '../constants/Marketplace';
import {
	setWalletAccount,
	setCoinsOnSale,
	setJpy2Matic,
	setMarketItems,
	setOwnedCoins,
	setPurchaseHistory,
	setSaleHistory,
	setMarketBalance,
	setMarketOwner,
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
		yield put(setWalletAccount(walletAccount));
	});
}

export function* loadMarketBalance() {
	yield takeEvery(LOAD_MARKET_BALANCE, function* () {
		const balance = yield call(Marketplace.getBalance);
		yield put(setMarketBalance(balance));
	});
}

export function* loadMarketOwner() {
	yield takeEvery(LOAD_MARKET_OWNER, function* () {
		const owner = yield call(Marketplace.getOwner);
		yield put(setMarketOwner(owner));
	});
}

export function* loadJpy2MaticRate() {
	yield takeEvery(LOAD_JPY2MATIC_RATE, function* () {
		const rate = yield call(Marketplace.getJpy2MaticRate);
		yield put(setJpy2Matic(rate));
	});
}

export function* loadPurchaseHistory() {
	yield takeEvery(LOAD_PURCHASE_HISTORY, function* () {
		const transactions = yield call(Marketplace.getPurchaseHistory);
		yield put(setPurchaseHistory(transactions));
	});
}

export function* loadSaleHistory() {
	yield takeEvery(LOAD_SALE_HISTORY, function* () {
		const transactions = yield call(Marketplace.getSaleHistory);
		yield put(setSaleHistory(transactions));
	});
}

export function* loadMarketItems() {
	yield takeEvery(LOAD_MARKET_ITEMS, function* () {
		const items = yield call(Marketplace.getAllItems);
		yield put(setMarketItems(items));
	});
}

export function* loadOwnedCoins() {
	yield takeEvery(LOAD_OWNED_COINS, function* () {
		const items = yield call(Token.getTokensOf);
		yield put(setOwnedCoins(items));
	});
}

export function* loadCoinsOnSale() {
	yield takeEvery(LOAD_COINS_ON_SALE, function* () {
		const items = yield call(Marketplace.getItemsOf);
		yield put(setCoinsOnSale(items));
	});
}


export default function* rootSaga() {
	yield all([
		fork(connect),
		fork(loadMarketBalance),
		fork(loadMarketOwner),
		fork(loadJpy2MaticRate),
		fork(loadPurchaseHistory),
		fork(loadSaleHistory),
		fork(loadMarketItems),
		fork(loadOwnedCoins),
		fork(loadCoinsOnSale),
	]);
}
