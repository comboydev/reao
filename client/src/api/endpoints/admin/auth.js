const AdminAuth = (httpClient) => ({
    login(payload) {
        return httpClient.post(`admin/auth/signIn`, payload)
    },
    changePassword(payload) {
        return httpClient.put(`admin/auth/changePassword`, payload)
    },
})

export default AdminAuth
