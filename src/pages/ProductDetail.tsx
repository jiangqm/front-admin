import { useParams, useNavigate } from 'react-router-dom';

// 产品详情页面 - 多参数动态路由示例
const ProductDetail = () => {
  const { category, id } = useParams<{ category: string; id: string }>();
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
        <h1 className="text-3xl font-bold text-gray-900 mb-6">产品详情</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="font-medium text-gray-700">产品分类:</span>
              <span className="text-green-600 font-semibold">{category}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="font-medium text-gray-700">产品 ID:</span>
              <span className="text-blue-600 font-mono">{id}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="font-medium text-gray-700">完整路径:</span>
              <span className="text-gray-600 font-mono">/product/{category}/{id}</span>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">模拟产品信息</h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">名称:</span> {category} 产品 #{id}</p>
              <p><span className="font-medium">状态:</span> 在售</p>
              <p><span className="font-medium">价格:</span> ¥{parseInt(id || '0') * 10}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-green-50 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-2">多参数动态路由</h3>
          <p className="text-green-700">
            这个页面展示了多参数动态路由的使用方式。路由模式为 
            <code className="bg-green-200 px-1 rounded">/product/:category/:id</code>，
            可以同时获取多个路径参数。
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          <button
            onClick={() => navigate('/product/electronics/phone-001')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            电子产品示例
          </button>
          <button
            onClick={() => navigate('/product/clothing/shirt-202')}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            服装产品示例
          </button>
          <button
            onClick={() => navigate('/product/books/novel-303')}
            className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
          >
            图书产品示例
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
