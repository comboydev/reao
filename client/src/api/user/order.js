import axios from "axios";
import { API_URL } from 'configs/AppConfig'

const UserOrder = {
    create: async (payload) => {
        return await axios
        .post(`${API_URL}/api/user/purchase/order/create`, payload)
    },
}

export default UserOrder;