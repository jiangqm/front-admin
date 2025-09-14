import { createBrowserRouter } from 'react-router-dom';
import { generateRoutes } from './routes';

// 导出配置好的路由器实例 - 使用动态生成的路由
export const router = createBrowserRouter(generateRoutes());

// 导出路由相关的配置和工具
export { 
  routeConfigs, 
  navigationItems, 
  ROUTES, 
  routeUtils 
} from './config';
export { generateRoutes } from './routes';
