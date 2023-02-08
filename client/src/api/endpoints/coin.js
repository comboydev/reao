const Coin = (httpClient) => ({
    detail(id) {
        return httpClient.fetch(`coins/${id}`)
    },
})

export default Coin