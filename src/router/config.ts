// 路由配置项类型
export interface RouteConfig {
  path: string;
  component: string;
  label?: string;
  children?: RouteConfig[];
  params?: string[];  // 动态参数列表
}

// 导航菜单项类型
export interface NavigationItem {
  path: string;
  label: string;
  key: string;
  icon?: string;
}

// 路由配置表 - 基于路径的懒加载配置
export const routeConfigs: RouteConfig[] = [
  {
    path: '/',
    component: '../pages/Home',
    label: '首页',
  },
  {
    path: '/about',
    component: '../pages/About',
    label: '关于我们',
  },
  {
    path: '/contact',
    component: '../pages/Contact',
    label: '联系我们',
  },
  {
    path: '/user/:id',
    component: '../pages/UserDetail',
    label: '用户详情',
    params: ['id'],
  },
  {
    path: '/product/:category/:id',
    component: '../pages/ProductDetail',
    label: '产品详情',
    params: ['category', 'id'],
  },
  {
    path: '/blog/:slug?',
    component: '../pages/Blog',
    label: '博客',
    params: ['slug'],
  },
];

// 导航菜单配置 - 从路由配置中过滤出需要显示的菜单项
export const navigationItems: NavigationItem[] = routeConfigs
  .filter(route => route.label && !route.params)
  .map(route => ({
    path: route.path,
    label: route.label!,
    key: route.path.replace(/[/:]/g, '-'),
  }));

// 路由路径常量 - 动态生成
export const ROUTES = routeConfigs.reduce((acc, route) => {
  const key = route.path.replace(/[/:]/g, '_').replace(/^\/_/, '').toUpperCase() || 'HOME';
  acc[key] = route.path;
  return acc;
}, {} as Record<string, string>);

// 路由工具函数
export const routeUtils = {
  // 生成动态路由路径
  generatePath: (pattern: string, params: Record<string, string>) => {
    return pattern.replace(/:([^/]+)\??/g, (match, paramName) => {
      return params[paramName] || '';
    });
  },
  
  // 检查路由是否匹配
  isRouteActive: (currentPath: string, routePath: string) => {
    if (routePath === '/') return currentPath === '/';
    return currentPath.startsWith(routePath);
  },
  
  // 获取路由参数
  getRouteParams: (pattern: string) => {
    const matches = pattern.match(/:([^/]+)\??/g);
    return matches ? matches.map(match => match.replace(/[:?]/g, '')) : [];
  },
};
