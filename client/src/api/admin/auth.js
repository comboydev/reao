import axios from "axios";
import { API_URL } from 'configs/AppConfig'

const AdminAuth = {
    login: async (email, password) => {
        return await axios
        .post(`${API_URL}/api/admin/auth/signin`, { email, password })
    },
    changePassword: async (payload) => {
        return await axios
        .put(`${API_URL}/api/admin/auth/changePassword`, payload)
    },
}

export default AdminAuth;