import { Link } from 'react-router-dom';

// 404 页面组件
const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            页面未找到
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            抱歉，您访问的页面不存在或已被移除
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            返回首页
          </Link>
          
          <div className="mt-4">
            <button
              onClick={() => window.history.back()}
              className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              返回上一页
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
