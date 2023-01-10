import axios from "axios";
import { API_URL } from 'configs/AppConfig'

const AdminRewardGroup = {
    get: async () => {
        return await axios
        .get(`${API_URL}/api/admin/affiliate/reward-group`);
    },
    create: async (payload) => {
        return await axios
        .post(`${API_URL}/api/admin/affiliate/reward-group/create`, payload);
    },
    update: async (id, payload) => {
        return await axios
        .put(`${API_URL}/api/admin/affiliate/reward-group/update/${id}`, payload);
    },
    delete: async (id) => {
        return await axios
        .delete(`${API_URL}/api/admin/affiliate/reward-group/delete/${id}`);
    },
}

export default AdminRewardGroup;