import { Outlet } from 'react-router-dom';
import { Layout as AntLayout } from 'antd';
import AntdSidebar from './AntdSidebar';

const { Content, Footer } = AntLayout;

// 主布局组件 - 使用 Ant Design
const Layout = () => {
  return (
    <AntLayout className="min-h-screen">
      {/* 侧边栏 */}
      <AntdSidebar />
      
      {/* 主内容区域 */}
      <AntLayout>
        <Content className="p-6 bg-gray-50">
          <div className="bg-white rounded-lg shadow-sm p-6 min-h-[calc(100vh-120px)]">
            <Outlet />
          </div>
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
