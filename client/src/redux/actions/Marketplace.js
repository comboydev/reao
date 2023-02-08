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
  LOAD_MARKET_BALANCE,
  LOADED_MARKET_BALANCE_SUCCESS,
  LOAD_MARKET_OWNER,
  LOADED_MARKET_OWNER_SUCCESS,
} from '../constants/Marketplace';

export const onConnectWallet = () => {
  return {
    type: CONNECT_WALLET,
  }
};

export const setWalletAccount = (payload) => {
  return {
    type: CONNECTED_WALLET_SUCCESS,
    payload,
  }
};

export const fetchMarketBalance = () => {
  return {
    type: LOAD_MARKET_BALANCE,
  }
}

export const setMarketBalance = (payload) => {
  return {
    type: LOADED_MARKET_BALANCE_SUCCESS,
    payload,
  }
};

export const fetchMarketOwner = () => {
  return {
    type: LOAD_MARKET_OWNER,
  }
};

export const setMarketOwner = (payload) => {
  return {
    type: LOADED_MARKET_OWNER_SUCCESS,
    payload,
  }
};

export const fetchJpy2Matic = () => {
  return {
    type: LOAD_JPY2MATIC_RATE,
  }
}

export const setJpy2Matic = (payload) => {
  return {
    type: LOADED_JPY2MATIC_RATE_SUCCESS,
    payload,
  }
};

export const fetchPurchaseHistory = () => {
  return {
    type: LOAD_PURCHASE_HISTORY,
  }
}

export const setPurchaseHistory = (payload) => {
  return {
    type: LOADED_PURCHASE_HISTORY_SUCCESS,
    payload,
  }
}

export const fetchSaleHistory = () => {
  return {
    type: LOAD_SALE_HISTORY,
  }
}

export const setSaleHistory = (payload) => {
  return {
    type: LOADED_SALE_HISTORY_SUCCESS,
    payload,
  }
}

export const fetchMarketItems = () => {
  return {
    type: LOAD_MARKET_ITEMS,
  }
}

export const setMarketItems = (payload) => {
  return {
    type: LOADED_MARKET_ITEMS_SUCCESS,
    payload,
  }
}

export const fetchOwnedCoins = () => {
  return {
    type: LOAD_OWNED_COINS,
  }
}

export const setOwnedCoins = (payload) => {
  return {
    type: LOADED_OWNED_COINS_SUCCESS,
    payload,
  }
}

export const fetchCoinsOnSale = () => {
  return {
    type: LOAD_COINS_ON_SALE,
  }
}

export const setCoinsOnSale = (payload) => {
  return {
    type: LOADED_COINS_ON_SALE_SUCCESS,
    payload,
  }
}