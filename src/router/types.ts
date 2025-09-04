// 路由配置类型定义
export interface RouteConfig {
  path: string;
  label: string;
  key: string;
  icon?: string;
  children?: RouteConfig[];
}

// 导航菜单项类型
export interface NavigationItem {
  path: string;
  label: string;
  key: string;
  icon?: string;
}
