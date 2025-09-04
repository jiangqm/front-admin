import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { navigationItems, routeConfigs } from '../router';

// 侧边栏导航组件
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const navigate = useNavigate();

  // 切换展开状态
  const toggleExpanded = (key: string) => {
    setExpandedItems(prev => 
      prev.includes(key) 
        ? prev.filter(item => item !== key)
        : [...prev, key]
    );
  };

  // 动态路由示例菜单
  const dynamicRouteExamples = [
    { path: '/user/123', label: '用户 123', icon: '👤' },
    { path: '/user/456', label: '用户 456', icon: '👤' },
    { path: '/product/electronics/phone-001', label: '电子产品', icon: '📱' },
    { path: '/product/clothing/shirt-202', label: '服装产品', icon: '👕' },
    { path: '/blog', label: '博客列表', icon: '📝' },
    { path: '/blog/react-hooks-guide', label: 'React 指南', icon: '📖' },
  ];

  return (
    <>
      {/* 移动端遮罩层 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 侧边栏 */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        {/* 侧边栏头部 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">导航菜单</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 侧边栏内容 */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-4 space-y-2">
            {/* 主要导航 */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                主要页面
              </h3>
              {navigationItems.map((item) => (
                <NavLink
                  key={item.key}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                >
                  <span className="mr-3">
                    {item.path === '/' ? '🏠' : 
                     item.path === '/about' ? 'ℹ️' : 
                     item.path === '/contact' ? '📞' : '📄'}
                  </span>
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* 动态路由示例 */}
            <div className="mb-6">
              <button
                onClick={() => toggleExpanded('dynamic-routes')}
                className="flex items-center justify-between w-full px-3 py-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide hover:text-gray-600 transition-colors"
              >
                <span>动态路由示例</span>
                <svg
                  className={`w-4 h-4 transform transition-transform ${
                    expandedItems.includes('dynamic-routes') ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {expandedItems.includes('dynamic-routes') && (
                <div className="mt-2 space-y-1">
                  {dynamicRouteExamples.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        navigate(item.path);
                        setIsOpen(false);
                      }}
                      className="flex items-center w-full px-6 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors duration-200"
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 路由信息 */}
            <div className="mt-8 p-3 bg-gray-50 rounded-lg">
              <h4 className="text-xs font-semibold text-gray-500 mb-2">路由特性</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• 懒加载组件</li>
                <li>• 动态路由参数</li>
                <li>• 统一配置管理</li>
                <li>• 代码分割优化</li>
              </ul>
            </div>
          </nav>
        </div>
      </div>

      {/* 移动端菜单按钮 */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-30 p-2 bg-white rounded-md shadow-md lg:hidden"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </>
  );
};

export default Sidebar;
