import { Contract } from '@ethersproject/contracts';
import { BigNumber, ethers } from 'ethers';
import Web3Modal from 'web3modal';
import AQCT1155 from 'contracts/abi/AQCT1155.json';
import FantationMarket from 'contracts/abi/FantationMarket.json';
import { env } from 'configs/EnvironmentConfig';

export const Networks = {
  MainNet: 137,
  Testnet: 80001
};

export const NETWORK_SCAN = {
  [Networks.MainNet]: 'https://polygonscan.com',
  [Networks.Testnet]: 'https://mumbai.polygonscan.com',
}

export const CONTRACTS_BY_NETWORK = {
  [Networks.MainNet]: {
    AQCT1155: {
      address: '0x822e0Eb1f14962b06582BA6eA1e48FB4499eD497',
      abi: AQCT1155.abi,
      fromBlock: 43694889,
    },
    FantationMarket: {
      address: '0xD87E0d2a7ad1388c6C05Bc0916A79E65B043C2D5',
      abi: FantationMarket.abi,
      fromBlock: 43695152,
    },
  },
  [Networks.Testnet]: {
    AQCT1155: {
      address: '0x0C4Dbc2D70FcFe69d17EFC403c32acfD9fC8eA83',
      abi: AQCT1155.abi,
      fromBlock: 36517064,
    },
    FantationMarket: {
      address: '0x442693cA13176A9F180D5a318456AC8DB1183B77',
      abi: FantationMarket.abi,
      fromBlock: 36518168,
    },
  },
};

export const BIG_ZERO = BigNumber.from(0);
export const ZERO_ADDRESS = ethers.constants.AddressZero;

export const currentNetwork =
  parseInt(env.CHAIN_ID || '') || 80001;

export const simpleProvider = new ethers.providers.JsonRpcProvider(env.RPC_NODE);

export const Currencies = {
  [Networks.MainNet]: [
    {
      id: 'binancecoin',
      name: 'BNB',
      address: '0x0000000000000000000000000000000000000000',
      symbol: 'BNB',
      chainId: 56,
      decimals: 18,
      icon: 'https://s2.coinmarketcap.com/static/img/coins/200x200/7009.png',
      fullName: 'Binance Coin',
      projectName: 'Binance',
      link: 'https://www.binance.com',
      category: 'BSC',
      highlight: true,
      disabled: false
    },
    {
      id: 'binance-usd',
      name: 'BUSD',
      address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      symbol: 'BUSD',
      chainId: 56,
      decimals: 18,
      icon: 'https://s2.coinmarketcap.com/static/img/coins/200x200/4687.png',
      fullName: 'Binance USD',
      projectName: 'Binance',
      link: 'https://www.binance.com',
      category: 'Stable coin',
      highlight: true,
      disabled: false
    }
  ],
  [Networks.Testnet]: [
    {
      id: 'binancecoin',
      name: 'BNB',
      address: '0x0000000000000000000000000000000000000000',
      symbol: 'BNB',
      chainId: 56,
      decimals: 18,
      icon: ''
    }
  ]
};

export function getCurrencyFromAddressOrId(idOrAddress) {
  const currencies = Currencies?.[currentNetwork];
  if (currencies && idOrAddress) {
    const currency = currencies.find(
      (item) =>
        item.id === idOrAddress ||
        item.address.toLowerCase() === idOrAddress.toLowerCase()
    );
    return currency;
  }
  return null;
}

export function getContractInfo(name, chainId) {
  if (!chainId) chainId = currentNetwork;

  const contracts = CONTRACTS_BY_NETWORK?.[chainId];
  if (contracts) {
    return contracts?.[name];
  } else {
    return null;
  }
}

export function getContractAddress(name, chainId) {
  if (!chainId) chainId = currentNetwork;

  const contracts = CONTRACTS_BY_NETWORK?.[chainId];
  if (contracts) {
    return contracts?.[name]?.address?.toLowerCase();
  } else {
    return null;
  }
}

export function getContractObj(name, chainId, provider) {
  const info = getContractInfo(name, chainId);
  return info
    ? new Contract(info.address, info.abi, provider || simpleProvider)
    : null;
}

export function getCurrencyContractObj(idOrAddress, provider) {
  const currency = getCurrencyFromAddressOrId(idOrAddress);
  if (
    !currency ||
    currency?.address === '0x0000000000000000000000000000000000000000'
  ) {
    return null;
  }
  return new Contract(currency.address, AQCT1155.abi, provider);
}

export function getMulticallContract(chainId, provider) {
  const info = getContractInfo('Multicall', chainId);
  return info
    ? new Contract(info.address, info.abi, provider || simpleProvider)
    : null;
}

export const getProvider = async () => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  return provider;
};

export const getSigner = async () => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  return signer;
};

export const getAccount = async () => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const accounts = await provider.send("eth_requestAccounts", []);
  return accounts[0];
};

export const getContract = async (name, chainId) => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  const info = getContractInfo(name, chainId);
  return new ethers.Contract(info.address, info.abi, signer);
};

export function numberWithCommas(x) {
  var parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

export function letteredNumber(num) {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million
  } else if (num > 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B'; // convert to M for number from > 1 million
  } else if (num > 1000000000000) {
    return (num / 1000000000000).toFixed(1) + 'T'; // convert to M for number from > 1 million
  } else if (num < 900) {
    return num; // if value < 1000, nothing to do
  }
}

export function replaceToNumber(value) {
  return value.replace(/[^0-9.]/g, '');
}

export const shorter = (str) =>
  str?.length > 8 ? str.slice(0, 6) + '...' + str.slice(-4) : str;

export const shorter10 = (str) =>
  str?.length > 8 ? str.slice(0, 10) + '...' + str.slice(-4) : str;

export const txShorter = (str) =>
  str?.length > 26 ? str.slice(0, 26) + '...' + str.slice(-4) : str;

export const tokenLink = (name, filter, chainId) => {
  if (!chainId) chainId = currentNetwork;

  const host = NETWORK_SCAN?.[chainId];
  const address = getContractAddress(name, chainId);

  return `${host}/token/${address}?a=${filter}`;
}

export const contractLink = (name, chainId) => {
  if (!chainId) chainId = currentNetwork;

  const host = NETWORK_SCAN?.[chainId];
  const address = getContractAddress(name, chainId);
  return `${host}/address/${address}`;
}