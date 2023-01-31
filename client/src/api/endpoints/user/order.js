const UserOrder = (httpClient) => ({
    create(payload) {
        return httpClient.post(`user/purchase/order/create`, payload)
    },
})

export default UserOrder