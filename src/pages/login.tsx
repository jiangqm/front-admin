import { Card, Form, Input, Button, Checkbox, Divider } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

// 用户登录页面组件
const UserLogin = () => {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log('登录信息:', values);
    // 模拟登录成功，跳转到首页
    navigate('/');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('登录失败:', errorInfo);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            用户登录
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            请输入您的登录凭据
          </p>
        </div>
        
        <Card className="shadow-lg">
          <Form
            name="login"
            size="large"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[
                { required: true, message: '请输入用户名!' },
                { min: 3, message: '用户名至少3个字符!' }
              ]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="请输入用户名" 
              />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[
                { required: true, message: '请输入密码!' },
                { min: 6, message: '密码至少6个字符!' }
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="请输入密码" 
              />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>记住我</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                icon={<LoginOutlined />}
                block
              >
                登录
              </Button>
            </Form.Item>

            <Divider>或</Divider>

            <div className="text-center space-y-2">
              <Button type="link" size="small">
                忘记密码？
              </Button>
              <br />
              <Button type="link" size="small">
                还没有账号？立即注册
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default UserLogin;
