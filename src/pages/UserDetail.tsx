import { useParams, useNavigate } from 'react-router-dom';

// 用户详情页面 - 动态路由示例
const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          ← 返回上一页
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">用户详情</h1>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <span className="font-medium text-gray-700">用户 ID:</span>
            <span className="text-blue-600 font-mono">{id}</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="font-medium text-gray-700">路由路径:</span>
            <span className="text-gray-600 font-mono">/user/{id}</span>
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">动态路由说明</h3>
          <p className="text-blue-700">
            这是一个动态路由页面，URL 中的 <code className="bg-blue-200 px-1 rounded">:id</code> 
            参数会被自动解析并传递给组件。您可以通过 <code className="bg-blue-200 px-1 rounded">useParams</code> 
            hook 获取这些参数。
          </p>
        </div>

        <div className="mt-6 flex space-x-4">
          <button
            onClick={() => navigate('/user/123')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            访问用户 123
          </button>
          <button
            onClick={() => navigate('/user/456')}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            访问用户 456
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
