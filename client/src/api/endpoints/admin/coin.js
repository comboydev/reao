const AdminCoin = (httpClient) => ({
    store(payload) {
        return httpClient.post(`admin/coins/store`, { ...payload });
    },
    update(id, payload) {
        return httpClient.put(`admin/coins/${id}/update`, payload);
    },
    deleteBatch(ids) {
        return httpClient.post(`admin/coins/bulkDelete`, { ids: ids });
    },
})

export default AdminCoin