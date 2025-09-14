import React, { useState } from 'react';
import { Card, Typography, Divider, message, Space } from 'antd';
import { DynamicForm } from '@/components/DynamicForm';
import type { DynamicFormConfig } from '@/components/DynamicForm';

const { Title, Paragraph, Text } = Typography;

const DynamicFormDemo: React.FC = () => {
  const [loading, setLoading] = useState(false);

  // 基础表单配置示例
  const basicFormConfig: DynamicFormConfig = {
    name: 'basicForm',
    layout: 'vertical',
    gutter: [16, 16],
    fields: [
      {
        name: 'username',
        label: '用户名',
        type: 'input',
        required: true,
        span: 12,
        placeholder: '请输入用户名',
        rules: [
          { min: 3, message: '用户名至少3个字符' },
          { max: 20, message: '用户名最多20个字符' }
        ]
      },
      {
        name: 'email',
        label: '邮箱',
        type: 'input',
        required: true,
        span: 12,
        placeholder: '请输入邮箱地址',
        rules: [
          { type: 'email', message: '请输入有效的邮箱地址' }
        ]
      },
      {
        name: 'password',
        label: '密码',
        type: 'password',
        required: true,
        span: 12,
        placeholder: '请输入密码',
        rules: [
          { min: 6, message: '密码至少6个字符' }
        ]
      },
      {
        name: 'age',
        label: '年龄',
        type: 'number',
        span: 12,
        min: 1,
        max: 120,
        placeholder: '请输入年龄'
      },
      {
        name: 'gender',
        label: '性别',
        type: 'radio',
        span: 12,
        options: [
          { label: '男', value: 'male' },
          { label: '女', value: 'female' },
          { label: '其他', value: 'other' }
        ]
      },
      {
        name: 'city',
        label: '城市',
        type: 'select',
        span: 12,
        placeholder: '请选择城市',
        options: [
          { label: '北京', value: 'beijing' },
          { label: '上海', value: 'shanghai' },
          { label: '广州', value: 'guangzhou' },
          { label: '深圳', value: 'shenzhen' }
        ]
      },
      {
        name: 'hobbies',
        label: '爱好',
        type: 'checkbox',
        span: 24,
        options: [
          { label: '读书', value: 'reading' },
          { label: '运动', value: 'sports' },
          { label: '音乐', value: 'music' },
          { label: '旅行', value: 'travel' },
          { label: '摄影', value: 'photography' }
        ]
      },
      {
        name: 'birthday',
        label: '生日',
        type: 'datePicker',
        span: 12,
      },
      {
        name: 'isVip',
        label: 'VIP会员',
        type: 'switch',
        span: 12,
      },
      {
        name: 'rating',
        label: '评分',
        type: 'rate',
        span: 12,
        max: 5
      },
      {
        name: 'satisfaction',
        label: '满意度',
        type: 'slider',
        span: 12,
        min: 0,
        max: 100,
        step: 10
      },
      {
        name: 'description',
        label: '个人描述',
        type: 'textarea',
        span: 24,
        placeholder: '请输入个人描述',
        maxLength: 500
      }
    ],
    onFinish: async (values) => {
      setLoading(true);
      console.log('表单提交:', values);
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      message.success('提交成功！');
      setLoading(false);
    },
    onFinishFailed: (errorInfo) => {
      console.log('表单验证失败:', errorInfo);
      message.error('请检查表单填写');
    }
  };

  // 条件显示表单配置示例
  const conditionalFormConfig: DynamicFormConfig = {
    name: 'conditionalForm',
    layout: 'vertical',
    gutter: [16, 16],
    fields: [
      {
        name: 'userType',
        label: '用户类型',
        type: 'radio',
        required: true,
        span: 24,
        options: [
          { label: '个人用户', value: 'individual' },
          { label: '企业用户', value: 'company' }
        ]
      },
      {
        name: 'companyName',
        label: '公司名称',
        type: 'input',
        required: true,
        span: 12,
        dependencies: ['userType'],
        condition: (values) => values.userType === 'company'
      },
      {
        name: 'companySize',
        label: '公司规模',
        type: 'select',
        span: 12,
        dependencies: ['userType'],
        condition: (values) => values.userType === 'company',
        options: [
          { label: '1-10人', value: '1-10' },
          { label: '11-50人', value: '11-50' },
          { label: '51-200人', value: '51-200' },
          { label: '200人以上', value: '200+' }
        ]
      },
      {
        name: 'personalId',
        label: '身份证号',
        type: 'input',
        required: true,
        span: 12,
        dependencies: ['userType'],
        condition: (values) => values.userType === 'individual'
      }
    ],
    onFinish: (values) => {
      console.log('条件表单提交:', values);
      message.success('提交成功！');
    }
  };

  return (
    <div className=" max-w-6xl mx-auto">
      <Typography>
        <Title level={2}>动态表单组件示例</Title>
        <Paragraph>
          基于 Ant Design 封装的动态表单组件，支持通过 JSON 配置渲染各种表单控件。
        </Paragraph>
      </Typography>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 基础表单示例 */}
        <Card title="基础表单示例" size="small">
          <Paragraph>
            <Text type="secondary">
              展示各种表单控件类型：输入框、选择器、单选框、多选框、开关、日期选择器、评分、滑块等
            </Text>
          </Paragraph>
          <DynamicForm 
            config={basicFormConfig} 
            loading={loading}
          />
        </Card>

        <Divider />

        {/* 条件显示表单示例 */}
        <Card title="条件显示表单示例" size="small">
          <Paragraph>
            <Text type="secondary">
              根据用户类型选择，动态显示不同的表单字段
            </Text>
          </Paragraph>
          <DynamicForm config={conditionalFormConfig} />
        </Card>

        <Divider />

        {/* 配置说明 */}
        <Card title="配置说明" size="small">
          <Typography>
            <Title level={4}>支持的字段类型</Title>
            <ul>
              <li><Text code>input</Text> - 输入框</li>
              <li><Text code>textarea</Text> - 多行文本</li>
              <li><Text code>password</Text> - 密码框</li>
              <li><Text code>number</Text> - 数字输入框</li>
              <li><Text code>select</Text> - 下拉选择</li>
              <li><Text code>multiSelect</Text> - 多选下拉</li>
              <li><Text code>radio</Text> - 单选按钮组</li>
              <li><Text code>checkbox</Text> - 多选框组</li>
              <li><Text code>switch</Text> - 开关</li>
              <li><Text code>datePicker</Text> - 日期选择器</li>
              <li><Text code>dateRange</Text> - 日期范围选择器</li>
              <li><Text code>timePicker</Text> - 时间选择器</li>
              <li><Text code>rate</Text> - 评分</li>
              <li><Text code>slider</Text> - 滑块</li>
              <li><Text code>upload</Text> - 文件上传</li>
            </ul>

            <Title level={4}>主要特性</Title>
            <ul>
              <li>✅ 支持所有常用的 Ant Design 表单控件</li>
              <li>✅ 完整的 TypeScript 类型支持</li>
              <li>✅ 响应式栅格布局</li>
              <li>✅ 表单验证和规则配置</li>
              <li>✅ 条件显示字段</li>
              <li>✅ 自定义渲染函数</li>
              <li>✅ 灵活的组件属性配置</li>
            </ul>
          </Typography>
        </Card>
      </Space>
    </div>
  );
};

export default DynamicFormDemo;
