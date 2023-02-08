import {
	CONNECTED_WALLET_SUCCESS,
	LOADED_COINS_ON_SALE_SUCCESS,
	LOADED_JPY2MATIC_RATE_SUCCESS,
	LOADED_MARKET_BALANCE_SUCCESS,
	LOADED_MARKET_ITEMS_SUCCESS,
	LOADED_MARKET_OWNER_SUCCESS,
	LOADED_OWNED_COINS_SUCCESS,
	LOADED_PURCHASE_HISTORY_SUCCESS,
	LOADED_SALE_HISTORY_SUCCESS,
} from '../constants/Marketplace';

const initState = {
	walletAccount: '',
	marketBalance: null,
	marketOwner: null,
	jpy2Matic: null,
	purchaseHistory: [],
	loadedPurchaseHistory: false,
	saleHistory: [],
	loadedSaleHistory: false,
	marketItems: [],
	loadedMarketItems: false,
	ownedCoins: [],
	loadedOwnedCoins: false,
	coinsOnSale: [],
	loadedCoinsOnSale: false,
}

const marketplace = (state = initState, action) => {
	switch (action.type) {
		case CONNECTED_WALLET_SUCCESS:
			return {
				...state,
				walletAccount: action.payload,
			}
		case LOADED_MARKET_BALANCE_SUCCESS:
			return {
				...state,
				marketBalance: action.payload,
			}
		case LOADED_MARKET_OWNER_SUCCESS:
			return {
				...state,
				marketOwner: action.payload,
			}
		case LOADED_JPY2MATIC_RATE_SUCCESS:
			return {
				...state,
				jpy2Matic: action.payload,
			}
		case LOADED_PURCHASE_HISTORY_SUCCESS:
			return {
				...state,
				loadedPurchaseHistory: true,
				purchaseHistory: action.payload,
			}
		case LOADED_SALE_HISTORY_SUCCESS:
			return {
				...state,
				loadedSaleHistory: true,
				saleHistory: action.payload,
			}
		case LOADED_MARKET_ITEMS_SUCCESS:
			return {
				...state,
				loadedMarketItems: true,
				marketItems: action.payload,
			}
		case LOADED_COINS_ON_SALE_SUCCESS:
			return {
				...state,
				loadedCoinsOnSale: true,
				coinsOnSale: action.payload,
			}
		case LOADED_OWNED_COINS_SUCCESS:
			return {
				...state,
				loadedOwnedCoins: true,
				ownedCoins: action.payload,
			}
		default:
			return state;
	}
}

export default marketplace