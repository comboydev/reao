const AdminProfile = (httpClient) => ({
    getProfile() {
        return httpClient.fetch(`admin/get/profile`)
    },
    updateProfile(payload) {
        return httpClient.put(`admin/update/profile`, payload)
    },
    getBankInfo() {
        return httpClient.fetch(`admin/get/bankInfo`)
    },
    updateBankInfo(payload) {
        return httpClient.put(`admin/update/bankInfo`, payload)
    },
})

export default AdminProfile