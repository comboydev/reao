import axios from "axios";
import { API_URL } from 'configs/AppConfig'

const AdminContact = {
    getAll: async () => {
        return await axios
        .get(`${API_URL}/api/admin/mails/get`);
    },
    getOne: async (id) => {
        return await axios
        .get(`${API_URL}/api/admin/mails/get/${id}`);
    },
    setStaredBatch: async (ids, flag) => {
        return await axios
        .post(`${API_URL}/api/admin/mails/set/starred`, { ids: ids, flag: flag });
    },
    setStared: async (id, flag) => {
        return await axios
        .post(`${API_URL}/api/admin/mails/set/starred/${id}`, { flag: flag });
    },
    setDeletedBatch: async (ids, flag) => {
        return await axios
        .post(`${API_URL}/api/admin/mails/set/deleted`, { ids: ids, flag: flag });
    },
    setDeleted: async (id, flag) => {
        return await axios
        .post(`${API_URL}/api/admin/mails/set/deleted/${id}`, { flag: flag });
    },
    completelyDeleteBatch: async (ids) => {
        return await axios
        .post(`${API_URL}/api/admin/mails/delete`, { ids: ids });
    },
    reply: async (payload) => {
        return await axios
        .post(`${API_URL}/api/admin/mails/reply`, payload);
    },
}

export default AdminContact;