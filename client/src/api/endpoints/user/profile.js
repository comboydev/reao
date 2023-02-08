const UserProfile = (httpClient) => ({
    getUserInfo() {
        return httpClient.fetch(`user/get/personal-info`);
    },
    getPartners() {
        return httpClient.fetch(`user/get/partners`);
    },
    updateUserInfo(payload) {
        return httpClient.put(`user/update/personal-info`, payload)
    },
    updateNickname(payload) {
        return httpClient.put(`user/update/nickname`, payload)
    },
    updateAvatar(payload) {
        return httpClient.put(`user/update/avatar`, payload)
    },
    updateWarrant(payload) {
        return httpClient.put(`user/update/warrant`, payload)
    },
    withdraw() {
        return httpClient.delete(`user/auth/withdraw`)
    },
})

export default UserProfile