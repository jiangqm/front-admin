import {   Typography,  } from 'antd';

const { Title,  } = Typography;

// 首页组件 - 使用 Ant Design
const Home = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <Title level={1} className="!mb-4">
          欢迎来到 Vite React 应用
        </Title>
     
      </div>

   

    </div>
  );
};

export default Home;
