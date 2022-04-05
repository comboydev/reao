import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

class UserService{
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
    let old_user = this.getCurrentUser();
    if(data.password) delete data.password;
    let user = data;
    if(old_user){
      user = {...data, "accessToken": old_user.accessToken}
    }
    localStorage.setItem("user", JSON.stringify(user));
  }

  //----------Auth Management---------------//
  logout() {
    localStorage.removeItem("user");
  }

  async login(email, password) {
    return await axios
      .post(`${API_URL}/api/user/auth/signin`, {
        email,
        password
      })
  }

  async sendLinkOfResetPassword(email) {
    return await axios
      .post(`${API_URL}/api/user/auth/sendLinkOfResetPassword`, {
        email
      })
  }

  async resetPassword(token, password) {
    return await axios
    .post(`${API_URL}/api/user/auth/resetPassword/${token}`, {
      password
    });
  }

  async checkLinkOfResetPassword(token) {
    return await axios
    .get(`${API_URL}/api/user/auth/checkLinkOfResetPassword/${token}`);
  }


  async register(email, password) {
    return await axios.post(`${API_URL}/api/user/auth/signup`, {
      email,
      password
    });
  }

  async changePassword(email, password, newPassword) {
    return await axios
      .post(`${API_URL}/api/user/auth/changePassword`, {
        email,
        password,
        newPassword
      })
  }

  async sendLinkOfVerifyEmail(current_email, new_email){
    return await axios.post(`${API_URL}/api/user/auth/sendLinkOfVerifyEmail`, {
      current_email, new_email
    });
  }

  async verifyEmail(token) {
    return await axios
    .post(`${API_URL}/api/user/auth/verifyEmail/${token}`);
  }

  //-----------Identity Management----------//
  async getPersonalInfo(id) {
    return await axios
      .get(`${API_URL}/api/user/personal-info/${id}`);
  }

  async updatePersonalInfo(personalObj) {
    return await axios
      .put(`${API_URL}/api/user/update/personal-info`, personalObj)
  }

  async updateNickname(obj) {
    return await axios
      .put(`${API_URL}/api/user/update/nickname`, obj)
  }

  async updateUserAvatar(obj) {
    return await axios
    .put(`${API_URL}/api/user/update/avatar`, obj)
  }

  async updateUserWarrant(obj) {
    return await axios
    .put(`${API_URL}/api/user/update/warrant`, obj)
  }
  
  async withdrawal(id) {
    return await axios
      .post(`${API_URL}/api/user/auth/withdrawal`, {
        id
      })
  }

  async submitContact(contentObject) {
    return await axios
      .post(`${API_URL}/api/user/mails/create`, contentObject)
  }

  // -----------  Coin Management ------------ //
  async getAllCoins(){
    return await axios
    .get(`${API_URL}/api/user/coins/get`);
  }

  async getCoinOne(coinID){
    return await axios
    .get(`${API_URL}/api/user/coins/get/${coinID}`);
  }

}

export default new UserService();
