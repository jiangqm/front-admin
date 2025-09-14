import { routeConfigs } from './routeData';

// 路由配置项类型 - 类似 Ant Design Pro 的配置方式
export interface RouteConfig {
  path: string;
  component?: string;  // 组件路径，如 '@/layouts/index' 或 './user/login'
  redirect?: string;   // 重定向目标路径
  routes?: RouteConfig[];  // 子路由配置（使用 routes 而不是 children，更符合 antd pro 习惯）
  
  // 扩展属性
  label?: string;
  params?: string[];  // 动态参数列表
  // 菜单显示相关配置
  showInMenu?: boolean;  // 是否在侧边栏显示，默认 true
  menuLabel?: string;    // 菜单中显示的标签，如果不设置则使用 label
  icon?: string;         // 菜单图标
  key?: string;          // 菜单唯一标识，如果不设置则自动生成
  // 动态路由的具体实例配置（用于菜单显示）
  menuInstances?: Array<{
    path: string;        // 具体的路径实例，如 '/user/123'
    label: string;       // 显示标签，如 '用户详情 - 123'
    key: string;         // 唯一标识
  }>;
  
  // 为了向后兼容，保留 children 属性
  children?: RouteConfig[];
}

// 导航菜单项类型
export interface NavigationItem {
  path: string;
  label: string;
  key: string;
  icon?: string;
  children?: NavigationItem[];  // 支持嵌套子菜单
}


// 从路由配置生成导航菜单的函数 - 支持新的嵌套结构
export const generateNavigationItems = (routes: RouteConfig[]): NavigationItem[] => {
  const convertRouteToMenuItem = (route: RouteConfig, parentPath: string = ''): NavigationItem[] => {
    // 如果设置了不显示在菜单中，则跳过
    if (route.showInMenu === false) {
      return [];
    }

    const items: NavigationItem[] = [];
    
    // 构建完整路径
    let fullPath: string;
    if (route.path === '') {
      // 索引路由使用父路径或根路径
      fullPath = parentPath || '/';
    } else if (parentPath) {
      fullPath = `${parentPath}/${route.path}`.replace(/\/+/g, '/');
    } else {
      fullPath = route.path;
    }

    // 处理有 menuInstances 的动态路由
    if (route.menuInstances && route.menuInstances.length > 0) {
      route.menuInstances.forEach(instance => {
        items.push({
          path: instance.path,
          label: instance.label,
          key: instance.key,
          icon: route.icon,
        });
      });
    } else if (route.menuLabel || route.label) {
      // 普通路由项
      const menuItem: NavigationItem = {
        path: fullPath,
        label: route.menuLabel || route.label || '',
        key: route.key || fullPath.replace(/[/:]/g, '-'),
        icon: route.icon,
      };

      // 处理子路由 - 支持 routes 和 children 两种方式
      const childRoutes = route.routes || route.children;
      if (childRoutes && childRoutes.length > 0) {
        const childItems = childRoutes.flatMap(child => convertRouteToMenuItem(child, fullPath));
        if (childItems.length > 0) {
          menuItem.children = childItems;
        }
      }

      items.push(menuItem);
    }

    return items;
  };

  // 处理嵌套路由结构：如果根路由是布局组件，直接处理其子路由
  return routes.flatMap(route => {
    // 如果是根布局路由，直接处理其子路由作为菜单项
    if (route.path === '/' && route.component && (route.routes || route.children)) {
      const childRoutes = route.routes || route.children;
      return childRoutes?.flatMap(child => convertRouteToMenuItem(child)) || [];
    }
    // 否则按正常逻辑处理
    return convertRouteToMenuItem(route);
  });
};

// 重新导出路由配置数据
export { routeConfigs };

// 导航菜单配置 - 从路由配置自动生成
export const navigationItems: NavigationItem[] = generateNavigationItems(routeConfigs);

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
    return pattern.replace(/:([^/]+)\??/g, (_, paramName) => {
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
    return matches ? matches.map(matchItem => matchItem.replace(/[:?]/g, '')) : [];
  },
};
