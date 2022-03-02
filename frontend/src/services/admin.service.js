import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

class AdminService {
  async adminLogin(email, password) {
    return await axios
      .post(API_URL + "/api/admin/auth/signin", {
        email,
        password
      })
  }

  async adminGetUsers() {
    return await axios
    .get(API_URL + "/api/admin/users");
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

export default new AdminService();
