import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout as AntLayout } from 'antd';
import AntdSidebar from './AntdSidebar';

const { Content, Footer } = AntLayout;

// 主布局组件 - 使用 Ant Design
const Layout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  return (
    <AntLayout className="min-h-screen">
      {/* 侧边栏 */}
      <AntdSidebar onCollapsedChange={setSidebarCollapsed} />
      
      {/* 主内容区域 */}
      <AntLayout 
        className="transition-all duration-300"
        style={{ 
          marginLeft: window.innerWidth >= 1024 ? (sidebarCollapsed ? 80 : 250) : 0 
        }}
      >
        <Content className="bg-gray-50 min-h-screen p-6">
            <Outlet />
        </Content>
        
        {/* 页脚 */}
        <Footer className="text-center bg-white border-t border-gray-200">
          <p className="text-gray-600">
            &copy; 2024 Vite React Tailwind App. 版权所有.
          </p>
        </Footer>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
