import type { RouteConfig } from './config';

// Ant Design Pro 风格的路由配置
export const routeConfigs: RouteConfig[] = [
  // 不需要 Layout 的独立路由
  {
    path: '/login',
    component: '@/pages/login',
    label: '用户登录',
    showInMenu: false,
  },
  // 需要 Layout 的路由
  {
    path: '/',
    component: '@/components/Layout',
    routes: [
      {
        path: '',  // 使用空字符串表示索引路由
        component: '@/pages/Home',
        label: '首页',
        menuLabel: '首页',
        icon: 'HomeOutlined',
        key: 'home',
      },
      {
        path: '/about',
        component: '@/pages/About',
        label: '关于我们',
        menuLabel: '关于我们',
        icon: 'InfoCircleOutlined',
        key: 'about',
      },
      {
        path: '/contact',
        component: '@/pages/Contact',
        label: '联系我们',
        menuLabel: '联系我们',
        icon: 'ContactsOutlined',
        key: 'contact',
      },
      {
        path: '/dynamic-form',
        component: '@/pages/DynamicFormDemo',
        label: '动态表单',
        menuLabel: '动态表单',
        icon: 'FormOutlined',
        key: 'dynamic-form',
      },
      {
        path: '/dynamic-table',
        component: '@/pages/DynamicTableDemo',
        label: '动态表格',
        menuLabel: '动态表格',
        icon: 'TableOutlined',
        key: 'dynamic-table',
      },
      {
        path: '/generic-list',
        component: '@/pages/GenericListDemo',
        label: '通用列表',
        menuLabel: '通用列表',
        icon: 'UnorderedListOutlined',
        key: 'generic-list',
      },
      // 重定向示例：访问 /user 自动重定向到 /login
      {
        path: '/examples',
        label: '示例页面',
        menuLabel: '示例页面',
        icon: 'AppstoreOutlined',
        key: 'examples',
        routes: [
          {
            path: 'users/:id',  // 相对路径，不包含父路径
            component: '@/pages/UserDetail',
            label: '用户详情',
            params: ['id'],
          },
          {
            path: 'products/:category/:id',  // 相对路径
            component: '@/pages/ProductDetail',
            label: '产品详情',
            params: ['category', 'id'],
          },
          {
            path: 'blog/:slug?',  // 相对路径
            component: '@/pages/Blog',
            label: '博客文章',
            params: ['slug'],
          },
          {
            path: '*',
            component: '@/pages/NotFound',
          }
        ],
      },
    ],
  },
];