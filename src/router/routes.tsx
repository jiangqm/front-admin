import { lazy } from 'react';
import { routeConfigs } from './config';

// 懒加载组件函数
const lazyLoad = (componentPath: string) => {
  return lazy(() => import(/* @vite-ignore */ componentPath));
};

// 生成 React Router 路由配置
export const generateRoutes = () => {
  const Layout = lazyLoad('../components/Layout');
  const NotFound = lazyLoad('../pages/NotFound');

  const routes = [
    {
      path: '/',
      Component: Layout,
      children: routeConfigs.map(config => ({
        path: config.path === '/' ? undefined : config.path.replace('/', ''),
        index: config.path === '/',
        Component: lazyLoad(config.component),
      })),
    },
    {
      path: '*',
      Component: NotFound,
    },
  ];

  return routes;
};
