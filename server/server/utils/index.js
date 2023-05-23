import jwt from 'jsonwebtoken';
import fs from "fs";
const config = require('../config');

class Utils {
  saveBase64Image = (uri, path, fileName) => {
    var matches = uri.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
      response = {};
    if (matches.length !== 3) {
      return false;
    }
    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
    let decodedImg = response;
    let imageBuffer = decodedImg.data;
    let type = decodedImg.type;
    let extension = type.replace("image/", "");
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
    let fname = `${path}/${fileName}.${extension}`;
    try {
      fs.writeFileSync(fname, imageBuffer, 'utf8');
      return extension;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  generateToken = (str) => {
    const verificationToken = jwt.sign(
      { id: str },
      config.secret_private_key,
      { expiresIn: "8h" }
    );
    return verificationToken;
  }

  ymdHis(date) {
    return date.getFullYear().toString(10).substring(2)
      + (date.getMonth() + 1).toString(10).padStart(2, '0')
      + date.getDate().toString(10).padStart(2, '0')
      + date.getHours().toString(10).padStart(2, '0')
      + date.getMinutes().toString(10).padStart(2, '0')
      + date.getSeconds().toString(10).padStart(2, '0')
  }
}


export default new Utils();