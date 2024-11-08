import { getContract, getAccount, simpleProvider, getContractInfo, getProvider } from 'contracts/hooks';
import { ethers } from 'ethers';
import { fetchMetaData } from './token';

const Marketplace = {
    getBalance: async () => {
        const provider = getProvider();
        const balance = await (await provider).getBalance(getContractInfo('FantationMarket').address);
        // convert a currency unit from wei to ether
        return ethers.utils.formatEther(balance)
    },

    getOwner: async () => {
        const marketplace = await getContract('FantationMarket');
        const owner = await marketplace.owner();
        return owner;
    },

    getJpy2MaticRate: async () => {
        const marketplace = await getContract('FantationMarket');
        const price = await marketplace.jpy2Matic();
        const delta = 10000;
        return (price.toNumber() + delta) / 1e8;
    },

    listToken: async (tokenId, price, amount) => {
        const tokenContract = await getContract('AQCT1155');
        const marketplace = await getContract('FantationMarket');
        const account = await getAccount();

        const approved = await tokenContract.isApprovedForAll(account, marketplace.address);
        if (!approved) {
            const tx = await tokenContract.setApprovalForAll(marketplace.address, true);
            await tx.wait();
        }

        const listingFee = await marketplace.listingFee();
        const listingPrice = await computeCost(price, amount) * listingFee / 100;

        const owner = await marketplace.owner();
        const isOwner = String(account).toLowerCase() === String(owner).toLowerCase();

        const tx = await marketplace.list(tokenContract.address, tokenId, price, amount,
            { value: isOwner ? 0 : ethers.utils.parseEther(listingPrice.toString()) }
        );
        await tx.wait();
    },

    buyItem: async (id, amount, price) => {
        const marketplace = await getContract('FantationMarket');
        const cost = await computeCost(price, amount);
        const tx = await marketplace.buy(id, amount, {
            value: ethers.utils.parseEther(cost.toString())
        });
        await tx.wait();
    },

    getAllItems: async () => {
        const tokenContract = await getContract('AQCT1155');
        const marketplace = await getContract('FantationMarket');
        const response = await marketplace.allItems();
        const items = await Promise.all(
            response.map(async item => {
                const tokenUri = await tokenContract.uri(item.tokenId);
                const metadata = await fetchMetaData(tokenUri);
                const totalSupply = await tokenContract.totalSupply(item.tokenId);
                return ({
                    ...metadata,
                    itemId: item.itemId,
                    tokenId: item.tokenId.toNumber(),
                    price: item.price.toNumber(),
                    amount: item.amount.toNumber(),
                    seller: item.seller,
                    isPresent: item.isPresent,
                    isSold: item.isSold,
                    nftContractAddress: item.nftContractAddress,
                    totalSupply: totalSupply.toNumber(),
                })
            })
        )
        return items;
    },

    getItemsOf: async () => {
        const tokenContract = await getContract('AQCT1155');
        const marketplace = await getContract('FantationMarket');
        const account = await getAccount();
        const response = await marketplace.itemsOf(account);
        const items = await Promise.all(
            response.map(async item => {
                const tokenUri = await tokenContract.uri(item.tokenId);
                const metadata = await fetchMetaData(tokenUri);
                const totalSupply = await tokenContract.totalSupply(item.tokenId);
                return ({
                    ...metadata,
                    itemId: item.itemId,
                    tokenId: item.tokenId.toNumber(),
                    price: item.price.toNumber(),
                    amount: item.amount.toNumber(),
                    seller: item.seller,
                    isPresent: item.isPresent,
                    isSold: item.isSold,
                    nftContractAddress: item.nftContractAddress,
                    totalSupply: totalSupply.toNumber(),
                })
            })
        )
        return items;
    },

    getItem: async (id) => {
        const tokenContract = await getContract('AQCT1155');
        const marketplace = await getContract('FantationMarket');
        const item = await marketplace.item(id);
        const tokenUri = await tokenContract.uri(item.tokenId);
        const metadata = await fetchMetaData(tokenUri);
        const totalSupply = await tokenContract.totalSupply(item.tokenId);
        return ({
            ...metadata,
            itemId: item.itemId,
            tokenId: item.tokenId.toNumber(),
            price: item.price.toNumber(),
            amount: item.amount.toNumber(),
            seller: item.seller,
            isPresent: item.isPresent,
            isSold: item.isSold,
            nftContractAddress: item.nftContractAddress,
            totalSupply: totalSupply.toNumber(),
        })
    },

    getPurchaseHistory: async () => {
        const marketplace = await getContract('FantationMarket');
        const fromBlock = getContractInfo('FantationMarket')?.fromBlock;
        const account = await getAccount();
        try {
            const filter = marketplace.filters.Bought(null, null, account);
            const logs = await simpleProvider.getLogs({ fromBlock, ...filter });
            const events = await extractLogs(logs);
            return events;
        } catch (error) {
            console.log(error)
            return [];
        }
    },

    getSaleHistory: async () => {
        const marketplace = await getContract('FantationMarket');
        const fromBlock = getContractInfo('FantationMarket')?.fromBlock;
        const account = await getAccount();
        try {
            const filter = marketplace.filters.Bought(null, account, null);
            const logs = await simpleProvider.getLogs({ fromBlock, ...filter });
            const events = await extractLogs(logs);
            return events;
        } catch (error) {
            console.log(error);
            return [];
        }
    },

    withdrawItem: async (id) => {
        const marketplace = await getContract('FantationMarket');
        const tx = await marketplace.withdrawItem(id);
        await tx.wait();
    },

    withdrawBalance: async () => {
        const marketplace = await getContract('FantationMarket');
        const tx = await marketplace.withdraw();
        await tx.wait();
    },
};

const computeCost = async (price, amount) => {
    const jpy2Matic = await Marketplace.getJpy2MaticRate();
    return price * amount * jpy2Matic;
}

const extractLogs = async (logs) => {
    const tokenContract = await getContract('AQCT1155');
    const events = await Promise.all(
        logs.map(async log => {
            const block = await simpleProvider.getBlock(log.blockNumber);
            const tokenId = parseInt(log.topics[1], 16);
            const tokenUri = await tokenContract.uri(tokenId);
            const metadata = await fetchMetaData(tokenUri);
            const price = parseInt(ethers.utils.hexDataSlice(log.data, 0, 32), 16);
            const amount = parseInt(ethers.utils.hexDataSlice(log.data, 32, 64), 16);
            return {
                ...metadata,
                seller: ethers.utils.hexStripZeros(log.topics[2], 32),
                buyer: ethers.utils.hexStripZeros(log.topics[3], 32),
                price,
                amount,
                timestamp: block.timestamp * 1000,
            }
        })
    )
    return events;
}

export default Marketplace