const dev = {
	API_ENDPOINT_URL: 'http://localhost:8080',
	NETWORK_ID: 80001,
	NODE_1: "https://matic-mumbai.chainstacklabs.com"
};

const prod = {
	API_ENDPOINT_URL: 'https://fantation-coin.com:8080',
	NETWORK_ID: 137,
	NODE_1: "https://matic-mainnet-archive-rpc.bwarelabs.com",
};

const getEnv = () => {
	switch (process.env.NODE_ENV) {
		case 'development':
			return dev
		case 'production':
			return prod
		default:
			break;
	}
}

export const env = getEnv()