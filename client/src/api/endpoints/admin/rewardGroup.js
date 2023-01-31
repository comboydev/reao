const AdminRewardGroup = (httpClient) => ({
    get() {
        return httpClient.fetch(`admin/affiliate/reward-group`);
    },
    create(payload) {
        return httpClient.post(`admin/affiliate/reward-group/create`, payload);
    },
    update(id, payload) {
        return httpClient.put(`admin/affiliate/reward-group/update/${id}`, payload);
    },
    delete(id) {
        return httpClient.delete(`admin/affiliate/reward-group/delete/${id}`);
    },
})

export default AdminRewardGroup