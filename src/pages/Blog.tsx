import { useParams, useNavigate } from 'react-router-dom';

// 博客页面 - 可选参数动态路由示例
const Blog = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  // 模拟博客数据
  const blogPosts = [
    { slug: 'react-hooks-guide', title: 'React Hooks 完全指南', date: '2024-01-15' },
    { slug: 'tailwind-best-practices', title: 'Tailwind CSS 最佳实践', date: '2024-01-10' },
    { slug: 'vite-performance-tips', title: 'Vite 性能优化技巧', date: '2024-01-05' },
  ];

  const currentPost = slug ? blogPosts.find(post => post.slug === slug) : null;

  if (slug && !currentPost) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">博客文章未找到</h1>
        <p className="text-gray-600 mb-6">抱歉，找不到 slug 为 "{slug}" 的博客文章。</p>
        <button
          onClick={() => navigate('/blog')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          返回博客列表
        </button>
      </div>
    );
  }

  if (currentPost) {
    // 显示具体博客文章
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate('/blog')}
            className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            ← 返回博客列表
          </button>
        </div>

        <article className="bg-white rounded-lg shadow-md p-8">
          <header className="mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{currentPost.title}</h1>
            <p className="text-gray-600">发布日期: {currentPost.date}</p>
            <p className="text-sm text-gray-500 font-mono">Slug: {currentPost.slug}</p>
          </header>

          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed">
              这是一篇关于 "{currentPost.title}" 的博客文章。这里展示了如何使用可选参数的动态路由。
            </p>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">可选参数路由</h3>
              <p className="text-blue-700">
                路由模式: <code className="bg-blue-200 px-1 rounded">/blog/:slug?</code>
                <br />
                <code className="bg-blue-200 px-1 rounded">:slug?</code> 中的 <code className="bg-blue-200 px-1 rounded">?</code> 
                表示这个参数是可选的，可以访问 <code className="bg-blue-200 px-1 rounded">/blog</code> 
                或 <code className="bg-blue-200 px-1 rounded">/blog/some-article</code>
              </p>
            </div>
          </div>
        </article>
      </div>
    );
  }

  // 显示博客列表
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">博客文章</h1>
        <p className="text-lg text-gray-600">
          点击文章标题查看详情，展示可选参数动态路由的使用
        </p>
      </div>

      <div className="space-y-6">
        {blogPosts.map((post) => (
          <div key={post.slug} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              <button
                onClick={() => navigate(`/blog/${post.slug}`)}
                className="hover:text-blue-600 transition-colors text-left"
              >
                {post.title}
              </button>
            </h2>
            <p className="text-gray-600 mb-3">发布日期: {post.date}</p>
            <p className="text-gray-700">
              这是关于 {post.title} 的文章摘要...
            </p>
            <div className="mt-4">
              <button
                onClick={() => navigate(`/blog/${post.slug}`)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                阅读全文 →
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">路由示例</h3>
        <div className="space-y-1 text-sm text-yellow-700">
          <p>• <code className="bg-yellow-200 px-1 rounded">/blog</code> - 博客列表页</p>
          <p>• <code className="bg-yellow-200 px-1 rounded">/blog/react-hooks-guide</code> - 具体文章</p>
          <p>• <code className="bg-yellow-200 px-1 rounded">/blog/any-slug</code> - 任意文章 slug</p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
