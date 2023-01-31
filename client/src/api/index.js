import HttpClient from 'api/httpClient'
import adminAuth from 'api/endpoints/admin/auth'
import adminCoin from 'api/endpoints/admin/coin'
import adminMail from 'api/endpoints/admin/mail'
import adminOrder from 'api/endpoints/admin/order'
import adminProfile from 'api/endpoints/admin/profile'
import adminRewardGroup from 'api/endpoints/admin/rewardGroup'
import adminUser from 'api/endpoints/admin/user'

import userAuth from 'api/endpoints/user/auth'
import userCoin from 'api/endpoints/user/coin'
import userContact from 'api/endpoints/user/contact'
import userOrder from 'api/endpoints/user/order'
import userProfile from 'api/endpoints/user/profile'
import userRewardGroup from 'api/endpoints/user/rewardGroup'

const httpClient = new HttpClient()

const api = {
  adminAuth: adminAuth(httpClient),
  adminCoin: adminCoin(httpClient),
  adminMail: adminMail(httpClient),
  adminOrder: adminOrder(httpClient),
  adminProfile: adminProfile(httpClient),
  adminRewardGroup: adminRewardGroup(httpClient),
  adminUser: adminUser(httpClient),

  userAuth: userAuth(httpClient),
  userCoin: userCoin(httpClient),
  userContact: userContact(httpClient),
  userOrder: userOrder(httpClient),
  userProfile: userProfile(httpClient),
  userRewardGroup: userRewardGroup(httpClient),
}

export default api