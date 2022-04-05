import { 
  DashboardOutlined, 
  AppstoreOutlined,
  MailOutlined,
  FundOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  SettingOutlined,
  BarsOutlined,
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
      key: 'dashboards-sales',
      path: `${APP_PREFIX_PATH}/sales`,
      title: 'sidenav.dashboard.sales',
      icon: FundOutlined,
      breadcrumb: true,
      submenu: []
    },
    {
      key: 'dashboards-user',
      path: `${APP_PREFIX_PATH}/users`,
      title: 'sidenav.dashboard.users',
      icon: UserOutlined,
      breadcrumb: true,
      submenu: []
    },
    {
      key: 'apps-ecommerce-orders',
      path: `${APP_PREFIX_PATH}/orders`,
      title: 'sidenav.product.orders',
      icon: ShoppingCartOutlined,
      breadcrumb: true,
      submenu: []
    }
  ]
}]

const appsNavTree = [{
  key: 'apps',
  path: `${APP_PREFIX_PATH}/apps`,
  title: 'sidenav.apps',
  icon: AppstoreOutlined,
  breadcrumb: false,
  submenu: [
    {
      key: 'apps-ecommerce',
      path: `${APP_PREFIX_PATH}/coins`,
      title: 'sidenav.apps.coins',
      icon: MoneyCollectOutlined,
      breadcrumb: false,
      submenu: [
        {
          key: 'apps-ecommerce-productList',
          path: `${APP_PREFIX_PATH}/coins/list`,
          title: 'sidenav.coin.list',
          icon: '',
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'apps-ecommerce-addProduct',
          path: `${APP_PREFIX_PATH}/coins/add`,
          title: 'sidenav.coin.add',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
      ]
    },
    {
      key: 'apps-mail',
      path: `${APP_PREFIX_PATH}/mail/inbox`,
      title: 'sidenav.apps.mail',
      icon: MailOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'apps-news',
      path: `${APP_PREFIX_PATH}/news`,
      title: 'sidenav.apps.news',
      icon: BarsOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'extra-pages-setting',
      path: `${APP_PREFIX_PATH}/setting`,
      title: 'sidenav.pages.setting',
      icon: SettingOutlined,
      breadcrumb: true,
      submenu: []
    }    
  ]
}]

const navigationConfig = [
  ...dashBoardNavTree,
  ...appsNavTree,
]

export default navigationConfig;
