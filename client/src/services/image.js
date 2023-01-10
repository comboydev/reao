import axios from "axios";
import { API_URL } from 'configs/AppConfig'

const ImageService = {
    getBase64 (img, callback){
		const reader = new FileReader();
		reader.readAsDataURL(img);
		reader.addEventListener('load', () => callback(reader.result));
	},
    upload: async (base64) => {
        return await axios
        .post(`${API_URL}/api/image/store`, {uri: base64})
    }
}

export default ImageService;