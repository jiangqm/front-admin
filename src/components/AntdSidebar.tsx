import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Button, Drawer, Typography, Space, Divider } from 'antd';
import {
  HomeOutlined,
  InfoCircleOutlined,
  ContactsOutlined,
  UserOutlined,
  ShoppingOutlined,
  BookOutlined,
  MenuOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { navigationItems } from '../router';

const { Sider } = Layout;
const { Title, Text } = Typography;

// 使用 Ant Design 的侧边栏组件
const AntdSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 菜单项配置
  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: '首页',
    },
    {
      key: '/about',
      icon: <InfoCircleOutlined />,
      label: '关于我们',
    },
    {
      key: '/contact',
      icon: <ContactsOutlined />,
      label: '联系我们',
    },
    {
      type: 'divider',
    },
    {
      key: 'dynamic-routes',
      icon: <UserOutlined />,
      label: '动态路由示例',
      children: [
        {
          key: '/user/123',
          icon: <UserOutlined />,
          label: '用户详情 - 123',
        },
        {
          key: '/user/456',
          icon: <UserOutlined />,
          label: '用户详情 - 456',
        },
        {
          key: '/product/electronics/phone-001',
          icon: <ShoppingOutlined />,
          label: '电子产品示例',
        },
        {
          key: '/product/clothing/shirt-202',
          icon: <ShoppingOutlined />,
          label: '服装产品示例',
        },
        {
          key: '/blog',
          icon: <BookOutlined />,
          label: '博客列表',
        },
        {
          key: '/blog/react-hooks-guide',
          icon: <BookOutlined />,
          label: 'React 指南文章',
        },
      ],
    },
  ];

  // 处理菜单点击
  const handleMenuClick = ({ key }: { key: string }) => {
    if (key.startsWith('/')) {
      navigate(key);
      setMobileOpen(false);
    }
  };

  // 侧边栏内容
  const sidebarContent = (
    <div className="h-full flex flex-col">
      {/* 头部 */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <Title level={4} className="!mb-0">
            {collapsed ? 'V' : 'Vite React'}
          </Title>
          <Button
            type="text"
            icon={collapsed ? <MenuOutlined /> : <CloseOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="lg:hidden"
          />
        </div>
      </div>

      {/* 菜单 */}
      <div className="flex-1 overflow-y-auto">
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          className="border-r-0"
          style={{ height: '100%' }}
        />
      </div>

      {/* 底部信息 */}
      <div className="p-4 border-t border-gray-200">
        <Space direction="vertical" size="small" className="w-full">
          <Text type="secondary" className="text-xs">
            路由特性
          </Text>
          <div className="text-xs text-gray-500 space-y-1">
            <div>• 懒加载组件</div>
            <div>• 动态路由参数</div>
            <div>• 统一配置管理</div>
            <div>• 代码分割优化</div>
          </div>
        </Space>
      </div>
    </div>
  );

  return (
    <>
      {/* 桌面端侧边栏 */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="hidden lg:block"
        width={250}
        collapsedWidth={80}
        style={{
          background: '#fff',
          boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
        }}
      >
        {sidebarContent}
      </Sider>

      {/* 移动端抽屉 */}
      <Drawer
        title="导航菜单"
        placement="left"
        onClose={() => setMobileOpen(false)}
        open={mobileOpen}
        width={280}
        className="lg:hidden"
        styles={{
          body: { padding: 0 },
        }}
      >
        {sidebarContent}
      </Drawer>

      {/* 移动端菜单按钮 */}
      <Button
        type="primary"
        icon={<MenuOutlined />}
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden"
        size="large"
      />
    </>
  );
};

export default AntdSidebar;
