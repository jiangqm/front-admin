// 关于我们页面组件
const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">关于我们</h1>
        <p className="text-lg text-gray-600">
          了解更多关于我们的技术栈和项目特性
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">技术栈</h2>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
            <span className="font-medium">Vite</span>
            <span className="text-gray-600">- 现代化的前端构建工具</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
            <span className="font-medium">React 18</span>
            <span className="text-gray-600">- 用户界面构建库</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
            <span className="font-medium">TypeScript</span>
            <span className="text-gray-600">- 类型安全的 JavaScript</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
            <span className="font-medium">Tailwind CSS</span>
            <span className="text-gray-600">- 实用优先的 CSS 框架</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
            <span className="font-medium">React Router</span>
            <span className="text-gray-600">- 客户端路由管理</span>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">项目特性</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>统一的路由表管理系统</li>
            <li>响应式设计支持</li>
            <li>TypeScript 类型安全</li>
            <li>热重载开发体验</li>
            <li>现代化的 UI 组件</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
