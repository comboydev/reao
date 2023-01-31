const UserCoin = (httpClient) => ({
    detail(id) {
        return httpClient.fetch(`user/coins/${id}/get`)
    },
})

export default UserCoin