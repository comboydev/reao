import axios from "axios";
import { API_URL } from 'configs/AppConfig'

const UserProfile = {
    getPersonalInfo: async (id) => {
        return await axios
        .get(`${API_URL}/api/user/${id}/get/personal-info`);
    },
    getPartners: async (id) => {
        return await axios
        .get(`${API_URL}/api/user/${id}/get/partners`);
    },
    updatePersonalInfo: async (id, payload) => {
        return await axios
        .put(`${API_URL}/api/user/${id}/update/personal-info`, payload)
    },
    updateNickname: async (id, payload) => {
        return await axios
        .put(`${API_URL}/api/user/${id}/update/nickname`, payload)
    },
    updateAvatar: async(id, payload) => {
        return await axios
        .put(`${API_URL}/api/user/${id}/update/avatar`, payload)
    },
    updateWarrant: async (id, payload) => {
        return await axios
        .put(`${API_URL}/api/user/${id}/update/warrant`, payload)
    },
    withdrawal: async (id) => {
        return await axios
        .post(`${API_URL}/api/user/auth/withdrawal`, { id })
    },
}

export default UserProfile;