import axios from "axios";
import { API_URL } from 'configs/AppConfig'

const UserAuth = {
    login: async (email, password) => {
        return await axios
        .post(`${API_URL}/api/user/auth/signin`, { email, password })
    },
    sendLinkOfResetPassword: async (email) => {
        return await axios
        .post(`${API_URL}/api/user/auth/sendLinkOfResetPassword`, { email })
    },
    resetPassword: async (token, password) => {
        return await axios
        .post(`${API_URL}/api/user/auth/resetPassword/${token}`, { password });
    },
    checkLinkOfResetPassword: async (token) => {
        return await axios
        .get(`${API_URL}/api/user/auth/checkLinkOfResetPassword/${token}`);
    },
    register: async (email, password, introducer) => {
        return await axios.post(`${API_URL}/api/user/auth/signup`, {
            email,
            password,
            introducer
        });
    },
    changePassword: async (email, password, newPassword) => {
        return await axios
        .post(`${API_URL}/api/user/auth/changePassword`, {
            email,
            password,
            newPassword
        })
    },
    sendLinkOfVerifyEmail: async (current_email, new_email) => {
        return await axios.post(`${API_URL}/api/user/auth/sendLinkOfVerifyEmail`, {
            current_email, new_email
        });
    },
    verifyEmail: async (token) => {
        return await axios
        .post(`${API_URL}/api/user/auth/verifyEmail/${token}`);
    },
}

export default UserAuth;