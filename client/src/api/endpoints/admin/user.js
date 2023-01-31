const AdminUser = (httpClient) => ({
    getAll() {
        return httpClient.fetch(`admin/users/all`);
    },
    getOne(id) {
        return httpClient.fetch(`admin/users/${id}`);
    },
    getAffiliaters() {
        return httpClient.fetch(`admin/users/affiliaters`);
    },
    connectUsersToAffiliater(id, payload) {
        return httpClient.post(`admin/users/${id}/affiliaters/connect`, payload);
    },
    setConfirm(id) {
        return httpClient.put(`admin/users/${id}/set/confirmed/identity`);
    },
    setDisable(id) {
        return httpClient.put(`admin/users/${id}/set/disable`);
    },
    delete(id) {
        return httpClient.delete(`admin/users/${id}/delete`);
    },
})

export default AdminUser