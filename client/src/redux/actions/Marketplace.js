import {
  CONNECT_WALLET,
  CONNECTED_WALLET_SUCCESS,
  LOAD_JPY2MATIC_RATE,
  LOAD_PURCHASE_HISTORY,
  LOAD_SALE_HISTORY,
  LOADED_PURCHASE_HISTORY_SUCCESS,
  LOADED_JPY2MATIC_RATE_SUCCESS,
  LOADED_SALE_HISTORY_SUCCESS,
  LOAD_MARKET_ITEMS,
  LOADED_MARKET_ITEMS_SUCCESS,
  LOAD_COINS_ON_SALE,
  LOADED_COINS_ON_SALE_SUCCESS,
  LOAD_OWNED_COINS,
  LOADED_OWNED_COINS_SUCCESS,
} from '../constants/Marketplace';

export const onConnectWallet = () => {
  return {
    type: CONNECT_WALLET,
  }
};

export const onConnected = (payload) => {
  return {
    type: CONNECTED_WALLET_SUCCESS,
    payload,
  }
};

export const onLoadJpy2MaticRate = () => {
  return {
    type: LOAD_JPY2MATIC_RATE,
  }
}

export const onLoadedJpy2MaticRateSucceed = (payload) => {
  return {
    type: LOADED_JPY2MATIC_RATE_SUCCESS,
    payload,
  }
};

export const onLoadPurchaseHistory = () => {
  return {
    type: LOAD_PURCHASE_HISTORY,
  }
}

export const onLoadedPurchaseHistorySucceed = (payload) => {
  return {
    type: LOADED_PURCHASE_HISTORY_SUCCESS,
    payload,
  }
}

export const onLoadSaleHistory = () => {
  return {
    type: LOAD_SALE_HISTORY,
  }
}

export const onLoadedSaleHistorySucceed = (payload) => {
  return {
    type: LOADED_SALE_HISTORY_SUCCESS,
    payload,
  }
}

export const onLoadMarketItems = () => {
  return {
    type: LOAD_MARKET_ITEMS,
  }
}

export const onLoadedMarketItemsSucceed = (payload) => {
  return {
    type: LOADED_MARKET_ITEMS_SUCCESS,
    payload,
  }
}

export const onLoadOwnedCoins = () => {
  return {
    type: LOAD_OWNED_COINS,
  }
}

export const onLoadedOwnedCoinsSucceed = (payload) => {
  return {
    type: LOADED_OWNED_COINS_SUCCESS,
    payload,
  }
}

export const onLoadCoinsOnSale = () => {
  return {
    type: LOAD_COINS_ON_SALE,
  }
}

export const onLoadedCoinsOnSaleSucceed = (payload) => {
  return {
    type: LOADED_COINS_ON_SALE_SUCCESS,
    payload,
  }
}