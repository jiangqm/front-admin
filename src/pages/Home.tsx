import { Card, Row, Col, Button, Space, Typography, Tag } from 'antd';
import { RocketOutlined, ThunderboltOutlined, CrownOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

// 首页组件 - 使用 Ant Design
const Home = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <Title level={1} className="!mb-4">
          欢迎来到 Vite React 应用
        </Title>
        <Paragraph className="text-lg text-gray-600">
          这是一个使用 Vite + React + Tailwind CSS + React Router + Ant Design 构建的现代化应用
        </Paragraph>
      </div>

      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24} md={8}>
          <Card
            hoverable
            cover={
              <div className="p-6 text-center">
                <ThunderboltOutlined className="text-4xl text-blue-500" />
              </div>
            }
          >
            <Card.Meta
              title="⚡ Vite"
              description="超快的构建工具，提供即时的热重载和优化的开发体验"
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card
            hoverable
            cover={
              <div className="p-6 text-center">
                <RocketOutlined className="text-4xl text-blue-500" />
              </div>
            }
          >
            <Card.Meta
              title="⚛️ React"
              description="用于构建用户界面的 JavaScript 库，组件化开发"
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card
            hoverable
            cover={
              <div className="p-6 text-center">
                <CrownOutlined className="text-4xl text-blue-500" />
              </div>
            }
          >
            <Card.Meta
              title="🎨 Ant Design"
              description="企业级 UI 设计语言和 React 组件库"
            />
          </Card>
        </Col>
      </Row>

      <div className="mt-8">
        <Title level={2} className="text-center !mb-6">
          动态路由演示
        </Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card title="单参数动态路由" size="small">
              <Space direction="vertical" className="w-full">
                <Button type="link" href="/user/123" className="!p-0 !h-auto">
                  /user/123 - 用户详情页
                </Button>
                <Button type="link" href="/user/456" className="!p-0 !h-auto">
                  /user/456 - 另一个用户
                </Button>
              </Space>
            </Card>
          </Col>
          
          <Col xs={24} md={12}>
            <Card title="多参数动态路由" size="small">
              <Space direction="vertical" className="w-full">
                <Button type="link" href="/product/electronics/phone-001" className="!p-0 !h-auto">
                  /product/electronics/phone-001
                </Button>
                <Button type="link" href="/product/clothing/shirt-202" className="!p-0 !h-auto">
                  /product/clothing/shirt-202
                </Button>
              </Space>
            </Card>
          </Col>
          
          <Col xs={24} md={12}>
            <Card title="可选参数路由" size="small">
              <Space direction="vertical" className="w-full">
                <Button type="link" href="/blog" className="!p-0 !h-auto">
                  /blog - 博客列表
                </Button>
                <Button type="link" href="/blog/react-hooks-guide" className="!p-0 !h-auto">
                  /blog/react-hooks-guide - 具体文章
                </Button>
              </Space>
            </Card>
          </Col>
          
          <Col xs={24} md={12}>
            <Card title="路由特性" size="small">
              <Space direction="vertical" size="small" className="w-full">
                <Tag color="blue">懒加载组件</Tag>
                <Tag color="green">代码分割</Tag>
                <Tag color="orange">动态参数解析</Tag>
                <Tag color="purple">统一路由表管理</Tag>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
