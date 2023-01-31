const AdminMail = (httpClient) => ({
    getAll() {
        return httpClient.fetch(`admin/mails/get`);
    },
    getOne(id) {
        return httpClient.fetch(`admin/mails/get/${id}`);
    },
    setStaredBatch(ids, flag) {
        return httpClient.post(`admin/mails/set/starred`, { ids: ids, flag: flag });
    },
    setStared(id, flag) {
        return httpClient.post(`admin/mails/set/starred/${id}`, { flag: flag });
    },
    setDeletedBatch(ids, flag) {
        return httpClient.post(`admin/mails/set/deleted`, { ids: ids, flag: flag });
    },
    setDeleted(id, flag) {
        return httpClient.post(`admin/mails/set/deleted/${id}`, { flag: flag });
    },
    completelyDeleteBatch(ids) {
        return httpClient.post(`admin/mails/delete`, { ids: ids });
    },
    reply(payload) {
        return httpClient.post(`admin/mails/reply`, payload);
    },
})

export default AdminMail