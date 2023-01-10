import axios from "axios";
import { API_URL } from 'configs/AppConfig'

const UserCoin = {
    get: async (id) => {
        return await axios
        .get(`${API_URL}/api/user/coins/${id}/get`)
    },
}

export default UserCoin;