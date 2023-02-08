import { getContract, getAccount } from 'contracts/hooks';
import api from 'api';

const Token = {}

Token.getTokensOf = async () => {
    const tokenContract = await getContract('AQCT1155');
    const account = await getAccount();
    const response = await tokenContract.tokensOf(account);
    const tokens = await Promise.all(
        response.map(async token => {
            const { data } = await api.coin.detail(token.uri);
            const totalSupply = await tokenContract.totalSupply(token.tokenId);
            return ({
                ...data,
                uri: token.uri,
                amount: token.amount.toNumber(),
                tokenId: token.tokenId.toNumber(),
                owner: token.owner,
                totalSupply: totalSupply.toNumber(),
            })
        })
    )
    return tokens;
}

Token.getToken = async (id) => {
    const tokenContract = await getContract('AQCT1155');
    const account = await getAccount();
    const token = await tokenContract.token(account, id);
    const { data } = await api.coin.detail(token.uri);
    const totalSupply = await tokenContract.totalSupply(id);
    return {
        ...data,
        uri: token.uri,
        amount: token.amount.toNumber(),
        tokenId: token.tokenId.toNumber(),
        owner: token.owner,
        totalSupply: totalSupply.toNumber(),
    };
}

export default Token;