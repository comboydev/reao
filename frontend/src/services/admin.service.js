import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

class AdminService {
  // Auth Management
  getCurrentAdmin(){
    try {
      return JSON.parse(localStorage.getItem('admin'));
    }
    catch (ex) {
      console.log("getCurrentAdmin ", ex)
      return null
    }
  }

  setCurrentAdmin(data) {
    let old = this.getCurrentAdmin();
    if(data.password) delete data.password;
    let admin = data;
    if(old){
      admin = {...data, "accessToken": old.accessToken}
    }
    localStorage.setItem("admin", JSON.stringify(admin));
  }


  async adminLogin(email, password) {
    return await axios
      .post(`${API_URL}/api/admin/auth/signin`, {
        email,
        password
      })
  }

  async adminChangePassword(req) {
    return await axios
      .put(`${API_URL}/api/admin/auth/changePassword`, req)
  }

  async adminUpdateProfile(req) {
    return await axios
      .put(`${API_URL}/api/admin/update/profile`, req)
  }

  async adminUpdateAvatar(obj) {
    return await axios
    .put(`${API_URL}/api/admin/update/avatar`, obj)
  }

  async adminUpdateBankInfo(obj) {
    return await axios
    .put(`${API_URL}/api/admin/update/bankInfo`, obj)
  }

  async adminGetBankInfo(userID){
    return await axios
    .get(`${API_URL}/api/admin/get/bankInfo/${userID}`)
  }

  //User ManageMent
  async adminGetUsers() {
    return await axios
    .get(`${API_URL}/api/admin/users/get`);
  }

  async adminGetUserOne(userID){
    return await axios
    .get(`${API_URL}/api/admin/users/get/${userID}`);
  }

  async adminConfirmIdentity(userID){
    return await axios
    .put(`${API_URL}/api/admin/users/set/confirmed/identity/${userID}`);
  }

  async adminDisableAccount(userID){
    return await axios
    .put(`${API_URL}/api/admin/users/set/disable/${userID}`);
  }

  async adminDeleteUser(userID){
    return await axios
    .delete(`${API_URL}/api/admin/users/delete/${userID}`);
  }

  //Mail Management.
  async adminGetMails(){
    return await axios
    .get(`${API_URL}/api/admin/mails/get`);
  }

  async adminGetMailOne(mailID){
    return await axios
    .get(`${API_URL}/api/admin/mails/get/${mailID}`);
  }

  async adminSetStarredMails(mailIDs, flag){
    return await axios
    .post(`${API_URL}/api/admin/mails/set/starred`, { ids: mailIDs, flag: flag });
  }

  async adminSetStarredMailOne(mailID, flag){
    return await axios
    .post(`${API_URL}/api/admin/mails/set/starred/${mailID}`, { flag: flag });
  }

  async adminSetDeletedMails(mailIDs, flag){
    return await axios
    .post(`${API_URL}/api/admin/mails/set/deleted`, { ids: mailIDs, flag: flag });
  }

  async adminSetDeletedMailOne(mailID, flag){
    return await axios
    .post(`${API_URL}/api/admin/mails/set/deleted/${mailID}`, { flag: flag });
  }

  async adminCompletelyDeleteMails(mailIDs){
    return await axios
    .post(`${API_URL}/api/admin/mails/delete`, { ids: mailIDs });
  }

  async adminSendReplyMail(mail){
    return await axios
    .post(`${API_URL}/api/admin/mails/reply`, mail);
  }


  // Product Management
  async adminAddCoin(coinData){
    return await axios
    .post(`${API_URL}/api/admin/coins/create`, { ...coinData });
  }

  async adminGetAllCoins(){
    return await axios
    .get(`${API_URL}/api/admin/coins/get`);
  }

  async adminGetCoinOne(coinID){
    return await axios
    .get(`${API_URL}/api/admin/coins/get/${coinID}`);
  }

  async adminDeleteCoins(coinIDs){
    return await axios
    .post(`${API_URL}/api/admin/coins/delete`, { ids: coinIDs });
  }

 
}

export default new AdminService();
