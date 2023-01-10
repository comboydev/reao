import axios from "axios";
import { API_URL } from 'configs/AppConfig'


class ImageService {
  async upload(base64) {
    return await axios
      .post(`${API_URL}/api/image/store`, {uri: base64})
  }
}

export default new ImageService();
