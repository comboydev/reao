import axios from "axios";
import { API_URL } from 'configs/AppConfig'

const AdminOrder = {
    getAll: async () => {
        return await axios
        .get(`${API_URL}/api/admin/orders/get`);
    },
}

export default AdminOrder;