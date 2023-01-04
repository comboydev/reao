import axios from "axios";
import { API_URL } from 'configs/AppConfig'

const UserRewardGroup = {
    update: async (id, payload) => {
        return await axios
        .put(`${API_URL}/api/user/${id}/update/reward-group`, payload)
    },
}

export default UserRewardGroup;