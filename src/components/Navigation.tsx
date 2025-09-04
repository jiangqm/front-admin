import { NavLink, useNavigate } from 'react-router-dom';
import { navigationItems } from '../router';

// 导航组件
const Navigation = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-800">
              Vite React App
            </h1>
          </div>

          {/* 主导航菜单 */}
          <div className="flex space-x-6">
            {navigationItems.map((item) => (
              <NavLink
                key={item.key}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-blue-100 hover:text-blue-600'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            
            {/* 动态路由示例下拉菜单 */}
            <div className="relative group">
              <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200">
                动态路由示例 ▼
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <div className="py-1">
                  <button
                    onClick={() => navigate('/user/123')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    用户详情示例
                  </button>
                  <button
                    onClick={() => navigate('/product/electronics/phone-001')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    产品详情示例
                  </button>
                  <button
                    onClick={() => navigate('/blog')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    博客列表
                  </button>
                  <button
                    onClick={() => navigate('/blog/react-hooks-guide')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    博客文章示例
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
