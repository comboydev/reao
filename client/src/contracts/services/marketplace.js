import { getContract, getAccount, simpleProvider, getContractInfo } from 'contracts/hooks';
import { ethers } from 'ethers';
import userCoin from 'api/user/coin';

const Marketplace = {};

Marketplace.getJpy2MaticRate = async () => {
    const marketplace = await getContract('FantationMarket');
    const price = await marketplace.jpy2Matic();
    return price.toNumber() / 1e8;
}

Marketplace.listToken = async (tokenId, price, amount) => {
    const tokenContract = await getContract('AQCT1155');
    const marketplace = await getContract('FantationMarket');
    const account = await getAccount();

    const approved = await tokenContract.isApprovedForAll(account, marketplace.address);
    if (!approved) {
        const tx = await tokenContract.setApprovalForAll(marketplace.address, true);
        await tx.wait();
    }

    const jpy2Matic = await Marketplace.getJpy2MaticRate();
    const listingFee = await marketplace.listingFee();
    const listingPrice = price * amount * jpy2Matic * listingFee / 100;

    const owner = await marketplace.owner();
    const isOwner = String(account).toLowerCase() === String(owner).toLowerCase();

    const tx = await marketplace.list(tokenContract.address, tokenId, price, amount,
        { value: isOwner ? 0 : ethers.utils.parseEther(listingPrice.toString()) }
    );
    await tx.wait();
}

Marketplace.buyItem = async (id, amount, price) => {
    const marketplace = await getContract('FantationMarket');
    const jpy2Matic = await Marketplace.getJpy2MaticRate();
    const cost = price * amount * jpy2Matic;
    const delta = 0.0001;
    const tx = await marketplace.buy(id, amount, {
        value: ethers.utils.parseEther((cost + delta).toString())
    });
    await tx.wait();
}

Marketplace.withdrawItem = async (id) => {
    const marketplace = await getContract('FantationMarket');
    const tx = await marketplace.withdrawItem(id);
    await tx.wait();
}

Marketplace.getAllItems = async () => {
    const tokenContract = await getContract('AQCT1155');
    const marketplace = await getContract('FantationMarket');
    const response = await marketplace.allItems();
    const items = await Promise.all(
        response.map(async item => {
            const { data } = await userCoin.get(item.uri);
            const totalSupply = await tokenContract.totalSupply(item.tokenId);
            return ({
                ...data,
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
}

Marketplace.getItemsOf = async () => {
    const tokenContract = await getContract('AQCT1155');
    const marketplace = await getContract('FantationMarket');
    const account = await getAccount();
    const response = await marketplace.itemsOf(account);
    const items = await Promise.all(
        response.map(async item => {
            const { data } = await userCoin.get(item.uri);
            const totalSupply = await tokenContract.totalSupply(item.tokenId);
            return ({
                ...data,
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
}

Marketplace.getItem = async (id) => {
    const tokenContract = await getContract('AQCT1155');
    const marketplace = await getContract('FantationMarket');
    const item = await marketplace.item(id);
    const { data } = await userCoin.get(item.uri);
    const totalSupply = await tokenContract.totalSupply(item.tokenId);
    return ({
        ...data,
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
}

Marketplace.getPurchaseHistory = async () => {
    const marketplace = await getContract('FantationMarket');
    const fromBlock = getContractInfo('FantationMarket')?.fromBlock;
    const account = await getAccount();
    const filter = marketplace.filters.Bought(null, null, account);
    const logs = await simpleProvider.getLogs({ fromBlock, ...filter });
    const events = await extractLogs(logs);
    return events;
}

Marketplace.getSaleHistory = async () => {
    const marketplace = await getContract('FantationMarket');
    const fromBlock = getContractInfo('FantationMarket')?.fromBlock;
    const account = await getAccount();
    const filter = marketplace.filters.Bought(null, account, null);
    const logs = await simpleProvider.getLogs({ fromBlock, ...filter });
    const events = await extractLogs(logs);
    return events;
}

const extractLogs = async (logs) => {
    const tokenContract = await getContract('AQCT1155');
    const events = await Promise.all(
        logs.map(async log => {
            const block = await simpleProvider.getBlock(log.blockNumber);
            const tokenId = parseInt(log.topics[1], 16);
            const tokenUri = await tokenContract.uri(tokenId);
            const { data } = await userCoin.get(tokenUri);
            const price = parseInt(ethers.utils.hexDataSlice(log.data, 0, 32), 16);
            const amount = parseInt(ethers.utils.hexDataSlice(log.data, 32, 64), 16);
            return {
                ...data,
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