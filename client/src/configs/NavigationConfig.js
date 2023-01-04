import { 
  DashboardOutlined, 
  AppstoreOutlined,
  MailOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  SettingOutlined,
  DollarCircleOutlined ,
  MoneyCollectOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'


const dashBoardNavTree = [{
  key: 'dashboards',
  path: `${APP_PREFIX_PATH}/dashboard`,
  title: 'sidenav.dashboard',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: [
    {
      key: 'dashboards-user',
      path: `${APP_PREFIX_PATH}/users`,
      title: 'sidenav.dashboard.users',
      icon: UserOutlined,
      breadcrumb: true,
      submenu: []
    },
    {
      key: 'dashboards-affiliate',
      path: `${APP_PREFIX_PATH}/affiliate`,
      title: 'sidenav.dashboard.affiliate',
      icon: DollarCircleOutlined,
      breadcrumb: true,
      submenu: [
        {
          key: 'dashboards-affiliate-list',
          path: `${APP_PREFIX_PATH}/affiliate/list`,
          title: 'sidenav.dashboard.affiliate.list',
          icon: '',
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'dashboards-affiliate-reward-group',
          path: `${APP_PREFIX_PATH}/affiliate/reward-group`,
          title: 'sidenav.dashboard.affiliate.reward-group',
          icon: '',
          breadcrumb: true,
          submenu: []
        },
      ]
    },
    {
      key: 'mail',
      path: `${APP_PREFIX_PATH}/mail/inbox`,
      title: 'sidenav.dashboard.mail',
      icon: MailOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'setting',
      path: `${APP_PREFIX_PATH}/setting`,
      title: 'sidenav.dashboard.setting',
      icon: SettingOutlined,
      breadcrumb: true,
      submenu: []
    },
    // {
    //   key: 'apps-news',
    //   path: `${APP_PREFIX_PATH}/news`,
    //   title: 'sidenav.apps.news',
    //   icon: BarsOutlined,
    //   breadcrumb: false,
    //   submenu: []
    // },
  ]
}]

const appsNavTree = [{
  key: 'app',
  path: `${APP_PREFIX_PATH}/apps`,
  title: 'sidenav.app',
  icon: AppstoreOutlined,
  breadcrumb: false,
  submenu: [
    {
      key: 'coin',
      path: `${APP_PREFIX_PATH}/coins`,
      title: 'sidenav.app.coins',
      icon: MoneyCollectOutlined,
      breadcrumb: false,
      submenu: [
        {
          key: 'coins.create',
          path: `${APP_PREFIX_PATH}/coins/create`,
          title: 'sidenav.app.coins.create',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'coins.own',
          path: `${APP_PREFIX_PATH}/coins/owned`,
          title: 'sidenav.app.coins.owned',
          icon: '',
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'coins.sale',
          path: `${APP_PREFIX_PATH}/coins/sale`,
          title: 'sidenav.app.coins.sale',
          icon: '',
          breadcrumb: true,
          submenu: []
        },
      ]
    },
    {
      key: 'marketplace',
      path: `${APP_PREFIX_PATH}/marketplace/items`,
      title: 'sidenav.app.marketplace',
      icon: ShoppingCartOutlined,
      breadcrumb: true,
      submenu: [],
    },
  ]
}]

const navigationConfig = [
  ...appsNavTree,
  ...dashBoardNavTree,
]

export default navigationConfig;
