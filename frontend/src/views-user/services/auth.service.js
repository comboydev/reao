import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

class AuthService {
  async login(email, password) {
    return await axios
      .post(API_URL + "/api/auth/signin", {
        email,
        password
      })
  }

  async adminLogin(email, password) {
    return await axios
      .post(API_URL + "/api/admin/auth/signin", {
        email,
        password
      })
  }

  async register(email, password) {
    return await axios.post(API_URL + "/api/auth/signup", {
      email,
      password
    });
  }

  async changePassword(email, password, newPassword) {
    return await axios
      .post(API_URL + "/api/auth/changePassword", {
        email,
        password,
        newPassword
      })
      .then(response => {
        return response.data;
      });
  }

  async verifyEmail(token) {
    return await axios.post(API_URL + "/api/auth/verifyEmail", {
      token
    });
  }

  async sendLinkOfVerifyEmail(current_email, new_email){
    return await axios.post(API_URL + "/api/auth/sendLinkOfVerifyEmail", {
      current_email, new_email
    });
  }



  async PersonalInfo(personalObject) {
    return await axios
      .post(API_URL + "/api/auth/personal-info", {
        personalObject
      })
      .then(response => {
        console.log('PersonalInfo', response)
        if (response.data != null){
          this.setCurrentUser(response.data);
        }
        return response.data;
      });
  }
  
  async quit(email) {
    return await axios
      .post(API_URL + "/api/auth/quit", {
        email
      })
      .then(response => {
        return response.data;
      });
  }

  async submitContact(contentObject) {
    return await axios
      .post(API_URL + "/api/auth/contact", contentObject)
      .then(response => {
        console.log('submitContact', response)
      });
  }

  async upload(personalObject, type="image") {
    let route = "upload-image";
    if (type == "ID")
     route = "upload-id";
    return await axios
      .post(API_URL + "/api/auth/" + route, {
        personalObject
      })
      .then(response => {
        console.log('response', response)
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem('user'));
    }
    catch (ex) {
      console.log("getCurrentUser ", ex)
      return null
    }
  }
  setCurrentUser(data) {
    localStorage.setItem("user", JSON.stringify(data));
  }

  getCurrentAdmin(){
    try {
      return JSON.parse(localStorage.getItem('auth_token'));
    }
    catch (ex) {
      console.log("getCurrentAdmin ", ex)
      return null
    }
  }

  setCurrentAdmin(data) {
    localStorage.setItem("auth_token", JSON.stringify(data));
  }
}

export default new AuthService();
