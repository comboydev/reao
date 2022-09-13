import axios from "axios";
import { API_URL } from "configs/AppConfig";


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


  async register(email, password, introducer) {
    return await axios.post(`${API_URL}/api/user/auth/signup`, {
      email,
      password,
      introducer
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
      .get(`${API_URL}/api/user/get/personal-info?id=${id}`);
  }

  async getPartners(id) {
    return await axios
    .get(`${API_URL}/api/user/get/partners?id=${id}`);
  }

  async updatePersonalInfo(payload) {
    return await axios
      .put(`${API_URL}/api/user/update/personal-info`, payload)
  }

  async updateNickname(payload) {
    return await axios
      .put(`${API_URL}/api/user/update/nickname`, payload)
  }

  async updateUserAvatar(payload) {
    return await axios
    .put(`${API_URL}/api/user/update/avatar`, payload)
  }

  async updateUserWarrant(payload) {
    return await axios
    .put(`${API_URL}/api/user/update/warrant`, payload)
  }
  
  async withdrawal(id) {
    return await axios
      .post(`${API_URL}/api/user/auth/withdrawal`, {
        id
      })
  }

  async submitContact(payload) {
    return await axios
      .post(`${API_URL}/api/user/mails/create`, payload)
  }

  // -----------  Coin Management ------------ //
  async getAllCoins(){
    return await axios
    .get(`${API_URL}/api/user/coins/get`)
  }

  async getCoinOne(coinID){
    return await axios
    .get(`${API_URL}/api/user/coins/get/${coinID}`)
  }

  // -------------  Transaction --------------- //
  async orderOwnership(payload){
    return await axios
    .post(`${API_URL}/api/user/purchase/order/create`, payload)
  }

  // ------------- Affiliate Management  --------------- //
  async updateRewardGroup(payload) {
    return await axios
    .put(`${API_URL}/api/user/update/reward-group`, payload)
  }

}

export default new UserService();
