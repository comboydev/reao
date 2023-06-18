import { getContract, getAccount } from 'contracts/hooks';

export const fetchMetaData = async (uri) => {
    const data = {
        name: '',
        description: '',
        image: '',
        images: [],
        grade: {
            name: '',
            description: '',
        },
        refPrice: null,
    }
    try {
        // const response = await fetch(uri).then(response => response.json());
        const response = JSON.parse(uri);
        data.name = response.name
        data.description = response.description
        data.image = response.image
        data.images = response.extra?.images || []
        data.grade.name = response.extra?.grade.name
        data.grade.description = response.extra?.grade.description
        data.refPrice = response.extra?.ref_price
    } catch (err) {
        console.log(err)
    } finally {
        return data
    }
}

const Token = {
    getTokensOf: async () => {
        const tokenContract = await getContract('AQCT1155');
        const account = await getAccount();
        const response = await tokenContract.tokensOf(account);
        const tokens = await Promise.all(
            response.map(async token => {
                const metadata = await fetchMetaData(token.uri);
                const totalSupply = await tokenContract.totalSupply(token.tokenId);
                return ({
                    ...metadata,
                    uri: token.uri,
                    amount: token.amount.toNumber(),
                    tokenId: token.tokenId.toNumber(),
                    owner: token.owner,
                    totalSupply: totalSupply.toNumber(),
                })
            })
        )
        return tokens;
    },

    getToken: async (id) => {
        const tokenContract = await getContract('AQCT1155');
        const account = await getAccount();
        const token = await tokenContract.token(account, id);
        const metadata = await fetchMetaData(token.uri);
        const totalSupply = await tokenContract.totalSupply(id);
        return {
            ...metadata,
            uri: token.uri,
            amount: token.amount.toNumber(),
            tokenId: token.tokenId.toNumber(),
            owner: token.owner,
            totalSupply: totalSupply.toNumber(),
        };
    }
}

export default Token;