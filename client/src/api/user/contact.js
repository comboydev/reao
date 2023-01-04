import axios from "axios";
import { API_URL } from 'configs/AppConfig'

const UserContact = {
    submit: async (payload) => {
        return await axios
        .post(`${API_URL}/api/user/mails/create`, payload)
    },
}

export default UserContact;