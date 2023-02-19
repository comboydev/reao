const prod = {
	API_ENDPOINT_URL: process.env.REACT_APP_API_ENDPOINT_URL,
	CHAIN_ID: process.env.REACT_APP_CHAIN_ID,
	RPC_NODE: process.env.REACT_APP_RPC_NODE,
};

const getEnv = () => {
	switch (process.env.NODE_ENV) {
		case 'development':
			return prod
		case 'production':
			return prod
		default:
			break;
	}
}

export const env = getEnv()