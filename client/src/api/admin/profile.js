import axios from "axios";
import { API_URL } from 'configs/AppConfig'

const AdminProfile = {
    updateProfile: async (id, payload) => {
        return await axios
        .put(`${API_URL}/api/admin/${id}/update/profile`, payload)
    },
    getBankInfo: async (id) => {
        return await axios
        .get(`${API_URL}/api/admin/${id}/get/bankInfo`)
    },
    updateBankInfo: async (id, payload) => {
        return await axios
        .put(`${API_URL}/api/admin/${id}/update/bankInfo`, payload)
    },
}

export default AdminProfile;