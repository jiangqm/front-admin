import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { routeConfigs } from './routeData';
import type { RouteConfig } from './config';

// 懒加载组件函数 - 支持多种路径格式
const lazyLoad = (componentPath: string) => {
  let resolvedPath = componentPath;
  
  // 处理 @ 开头的绝对路径
  if (componentPath.startsWith('@/')) {
    resolvedPath = componentPath
      .replace('@/pages/', '../pages/')
      .replace('@/components/', '../components/')
      .replace('@/layouts/', '../layouts/');
  }
  // 处理 ./ 开头的相对路径（antd pro 风格）
  else if (componentPath.startsWith('./')) {
    resolvedPath = componentPath.replace('./', '../pages/');
  }
    
  return lazy(() => import(/* @vite-ignore */ resolvedPath));
};

// 递归生成路由配置 - 支持 antd pro 风格
const generateRouteItems = (configs: RouteConfig[]): RouteObject[] => {
  return configs.map(config => {
    const routeItem: RouteObject = {};
    
    // 获取子路由
    const childRoutes = config.routes || config.children;
    const hasChildren = childRoutes && childRoutes.length > 0;
    
    // 处理路径和索引路由
    if (config.path === '' || (config.path === '/' && hasChildren)) {
      // 空路径或根路径且有子路由时，处理为索引路由
      if (config.path === '') {
        (routeItem as { index?: boolean }).index = true;
      } else {
        // 根路径且有子路由，设置为普通路径
        routeItem.path = '/';
      }
    } else {
      routeItem.path = config.path.replace(/^\//, '');
    }
    
    // 处理重定向
    if (config.redirect) {
      routeItem.element = <Navigate to={config.redirect} replace />;
    }
    // 处理组件
    else if (config.component) {
      routeItem.Component = lazyLoad(config.component);
    }
    
    // 处理子路由
    if (hasChildren) {
      // 只有非索引路由才能有 children
      if (config.path !== '') {
        routeItem.children = generateRouteItems(childRoutes);
      }
    }
    
    return routeItem;
  });
};

// 生成 React Router 路由配置
export const generateRoutes = () => {

  // 直接使用 routeConfigs 生成路由，避免双重 Layout
  const routes = [
    ...generateRouteItems(routeConfigs),
    
    // 🔧 404 处理选项（可选择其中一个）：
    
    // 选项1：重定向到首页（推荐）
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
    
    // 选项2：重定向到登录页
    // {
    //   path: '*',
    //   element: <Navigate to="/login" replace />,
    // },
    
    // 选项3：显示 404 页面
    // {
    //   path: '*',
    //   Component: lazyLoad('@/pages/NotFound'),
    // },
    
    // 选项4：不处理（当前状态）- 会显示空白页
  ];

  return routes;
};
