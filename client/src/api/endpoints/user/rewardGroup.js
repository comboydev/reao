const UserRewardGroup = (httpClient) => ({
    update(id, payload) {
        return httpClient.put(`user/${id}/update/reward-group`, payload)
    },
})

export default UserRewardGroup