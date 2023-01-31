const UserProfile = (httpClient) => ({
    getPersonalInfo(id) {
        return httpClient.fetch(`user/${id}/get/personal-info`);
    },
    getPartners(id) {
        return httpClient.fetch(`user/${id}/get/partners`);
    },
    updatePersonalInfo(id, payload) {
        return httpClient.put(`user/${id}/update/personal-info`, payload)
    },
    updateNickname(id, payload) {
        return httpClient.put(`user/${id}/update/nickname`, payload)
    },
    updateAvatar(id, payload) {
        return httpClient.put(`user/${id}/update/avatar`, payload)
    },
    updateWarrant(id, payload) {
        return httpClient.put(`user/${id}/update/warrant`, payload)
    },
    withdraw(id) {
        return httpClient.post(`user/auth/withdraw`, { id })
    },
})

export default UserProfile