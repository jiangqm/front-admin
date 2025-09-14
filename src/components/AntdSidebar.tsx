import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Button, Drawer, Typography } from 'antd';
import type { MenuProps } from 'antd';
import {
  HomeOutlined,
  InfoCircleOutlined,
  ContactsOutlined,
  UserOutlined,
  ShoppingOutlined,
  BookOutlined,
  MenuOutlined,
  CloseOutlined,
  AppstoreOutlined,
  MobileOutlined,
  SkinOutlined,
  UnorderedListOutlined,
  FileTextOutlined,
  FormOutlined,
  TableOutlined,
} from '@ant-design/icons';
import { navigationItems } from '../router';

const { Sider } = Layout;
const { Title } = Typography;

// 图标映射函数
const getIcon = (iconName?: string) => {
  const iconMap = {
    HomeOutlined: <HomeOutlined />,
    InfoCircleOutlined: <InfoCircleOutlined />,
    ContactsOutlined: <ContactsOutlined />,
    UserOutlined: <UserOutlined />,
    ShoppingOutlined: <ShoppingOutlined />,
    BookOutlined: <BookOutlined />,
    AppstoreOutlined: <AppstoreOutlined />,
    MobileOutlined: <MobileOutlined />,
    SkinOutlined: <SkinOutlined />,
    UnorderedListOutlined: <UnorderedListOutlined />,
    FileTextOutlined: <FileTextOutlined />,
    FormOutlined: <FormOutlined />,
    TableOutlined: <TableOutlined />,
  };
  return iconName ? iconMap[iconName as keyof typeof iconMap] : undefined;
};

// 递归转换导航项为 Ant Design Menu 项
type MenuItem = Required<MenuProps>['items'][number];

const transformNavigationItems = (items: typeof navigationItems): MenuItem[] => {
  return items.map(item => ({
    key: item.key,
    icon: getIcon(item.icon),
    label: item.label,
    children: item.children ? transformNavigationItems(item.children) : undefined,
  }));
};

// 使用 Ant Design 的侧边栏组件
interface AntdSidebarProps {
  onCollapsedChange?: (collapsed: boolean) => void;
}

const AntdSidebar: React.FC<AntdSidebarProps> = ({ onCollapsedChange }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 处理折叠状态变化
  const handleCollapsedChange = (newCollapsed: boolean) => {
    setCollapsed(newCollapsed);
    onCollapsedChange?.(newCollapsed);
  };

 
  const menuItems = transformNavigationItems(navigationItems);

  // 根据 key 查找对应的路径
  const findPathByKey = (items: typeof navigationItems, targetKey: string): string | null => {
    for (const item of items) {
      if (item.key === targetKey) {
        return item.path;
      }
      if (item.children) {
        const childPath = findPathByKey(item.children, targetKey);
        if (childPath) return childPath;
      }
    }
    return null;
  };

  // 根据路径查找对应的 key
  const findKeyByPath = (items: typeof navigationItems, targetPath: string): string | null => {
    for (const item of items) {
      if (item.path === targetPath) {
        return item.key;
      }
      if (item.children) {
        const childKey = findKeyByPath(item.children, targetPath);
        if (childKey) return childKey;
      }
    }
    return null;
  };

  // 处理菜单点击
  const handleMenuClick = ({ key }: { key: string }) => {
    const path = findPathByKey(navigationItems, key);
    if (path) {
      navigate(path);
      setMobileOpen(false);
    }
  };

  // 获取当前选中的菜单项
  const selectedKey = findKeyByPath(navigationItems, location.pathname);
  const selectedKeys = selectedKey ? [selectedKey] : [];

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
            onClick={() => handleCollapsedChange(!collapsed)}
            className="lg:hidden"
          />
        </div>
      </div>

      {/* 菜单 */}
      <div className="flex-1 overflow-y-auto">
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          items={menuItems}
          onClick={handleMenuClick}
          className="border-r-0"
          style={{ height: '100%' }}
        />
      </div>
      
      {/* 折叠按钮 */}
      <div className="p-2 border-t border-gray-200">
        <Button
          type="text"
          icon={collapsed ? <MenuOutlined /> : <CloseOutlined />}
          onClick={() => handleCollapsedChange(!collapsed)}
          className="w-full"
          size="small"
        >
          {!collapsed && '收起'}
        </Button>
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
        onCollapse={handleCollapsedChange}
        className="hidden lg:block"
        width={250}
        collapsedWidth={80}
        style={{
          background: '#fff',
          boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1000,
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

    </>
  );
};

export default AntdSidebar;
