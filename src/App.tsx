import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import '@ant-design/v5-patch-for-react-19';
// 加载中组件
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">页面加载中...</p>
    </div>
  </div>
);

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
