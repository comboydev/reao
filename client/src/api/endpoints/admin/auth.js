const AdminAuth = (httpClient) => ({
    login(email, password) {
        return httpClient.post(`admin/auth/signin`, { email, password })
    },
    changePassword(payload) {
        return httpClient.put(`admin/auth/changePassword`, payload)
    },
})

export default AdminAuth
