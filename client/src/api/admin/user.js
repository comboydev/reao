import axios from "axios";
import { API_URL } from 'configs/AppConfig'

const AdminUser = {
    getAll: async () => {
        return await axios
        .get(`${API_URL}/api/admin/users/all`);
    },
    getOne: async (id) => {
        return await axios
        .get(`${API_URL}/api/admin/users/${id}`);
    },
    getAffiliaters: async () => {
        return await axios
        .get(`${API_URL}/api/admin/users/affiliaters`);
    },
    connectUsersToAffiliater: async (id, payload) => {
        return await axios
        .post(`${API_URL}/api/admin/users/${id}/affiliaters/connect`, payload);
    },
    setConfirm: async (id) => {
        return await axios
        .put(`${API_URL}/api/admin/users/${id}/set/confirmed/identity`);
    },
    setDisable: async (id) => {
        return await axios
        .put(`${API_URL}/api/admin/users/${id}/set/disable`);
    },
    delete: async (id) => {
        return await axios
        .delete(`${API_URL}/api/admin/users/${id}/delete`);
    },
}

export default AdminUser;