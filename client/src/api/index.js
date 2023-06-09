import HttpClient from 'api/httpClient'
import adminAuth from 'api/endpoints/admin/auth'
import adminMail from 'api/endpoints/admin/mail'
import adminOrder from 'api/endpoints/admin/order'
import adminProfile from 'api/endpoints/admin/profile'
import adminRewardGroup from 'api/endpoints/admin/rewardGroup'
import adminUser from 'api/endpoints/admin/user'

import userAuth from 'api/endpoints/user/auth'
import userContact from 'api/endpoints/user/contact'
import userOrder from 'api/endpoints/user/order'
import userProfile from 'api/endpoints/user/profile'

const httpClient = new HttpClient()

const api = {
  adminAuth: adminAuth(httpClient),
  adminMail: adminMail(httpClient),
  adminOrder: adminOrder(httpClient),
  adminProfile: adminProfile(httpClient),
  adminRewardGroup: adminRewardGroup(httpClient),
  adminUser: adminUser(httpClient),

  userAuth: userAuth(httpClient),
  userContact: userContact(httpClient),
  userOrder: userOrder(httpClient),
  userProfile: userProfile(httpClient),
}

export default api