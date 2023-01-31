const AdminProfile = (httpClient) => ({
    updateProfile(id, payload) {
        return httpClient
            .put(`admin/${id}/update/profile`, payload)
    },
    getBankInfo(id) {
        return httpClient
            .fetch(`admin/${id}/get/bankInfo`)
    },
    updateBankInfo(id, payload) {
        return httpClient
            .put(`admin/${id}/update/bankInfo`, payload)
    },
})

export default AdminProfile