const AdminCoin = (httpClient) => ({
    create(payload) {
        return httpClient.post(`admin/coins/create`, { ...payload });
    },
    get(id) {
        return httpClient.fetch(`admin/coins/${id}/get`);
    },
    update(id, payload) {
        return httpClient.put(`admin/coins/${id}/update`, payload);
    },
    deleteBatch(ids) {
        return httpClient.post(`admin/coins/bulkDelete`, { ids: ids });
    },
})

export default AdminCoin