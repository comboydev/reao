import axios from "axios";
import { API_URL } from 'configs/AppConfig'

const AdminCoin = {
    create: async (payload) => {
        return await axios
        .post(`${API_URL}/api/admin/coins/create`, { ...payload });
    },
    get: async (id) => {
        return await axios
        .get(`${API_URL}/api/admin/coins/${id}/get`);
    },
    update: async (id, payload) => {
        return await axios
        .put(`${API_URL}/api/admin/coins/${id}/update`, payload);
    },
    deleteBatch: async (ids) =>  {
        return await axios
        .post(`${API_URL}/api/admin/coins/bulkDelete`, { ids: ids });
    },
}

export default AdminCoin;