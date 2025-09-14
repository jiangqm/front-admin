import React, { useState } from 'react';
import { Card, Typography, Divider, message, Space, Button, Modal } from 'antd';
import { DynamicTable } from '@/components/DynamicTable';
import { DynamicForm } from '@/components/DynamicForm';
import type { DynamicTableConfig } from '@/components/DynamicTable';
import type { DynamicFormConfig } from '@/components/DynamicForm';

const { Title, Paragraph, Text } = Typography;

const DynamicTableDemo: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<Record<string, any> | null>(null);
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);

  // 模拟数据
  const mockData = React.useMemo(() => [
    {
      id: 1,
      name: '张三',
      email: 'zhangsan@example.com',
      age: 28,
      gender: 'male',
      city: 'beijing',
      avatar: 'https://joeschmoe.io/api/v1/random',
      status: 'active',
      role: 'admin',
      salary: 15000,
      rating: 4.5,
      progress: 85,
      isVip: true,
      joinDate: '2023-01-15',
      tags: ['frontend', 'react'],
    },
    {
      id: 2,
      name: '李四',
      email: 'lisi@example.com',
      age: 32,
      gender: 'female',
      city: 'shanghai',
      avatar: 'https://joeschmoe.io/api/v1/random',
      status: 'inactive',
      role: 'user',
      salary: 12000,
      rating: 3.8,
      progress: 60,
      isVip: false,
      joinDate: '2023-03-20',
      tags: ['backend', 'nodejs'],
    },
    {
      id: 3,
      name: '王五',
      email: 'wangwu@example.com',
      age: 25,
      gender: 'male',
      city: 'guangzhou',
      avatar: 'https://joeschmoe.io/api/v1/random',
      status: 'pending',
      role: 'editor',
      salary: 10000,
      rating: 4.2,
      progress: 75,
      isVip: true,
      joinDate: '2023-06-10',
      tags: ['design', 'ui'],
    },
    {
      id: 4,
      name: '赵六',
      email: 'zhaoliu@example.com',
      age: 29,
      gender: 'female',
      city: 'shenzhen',
      avatar: 'https://joeschmoe.io/api/v1/random',
      status: 'active',
      role: 'manager',
      salary: 18000,
      rating: 4.8,
      progress: 95,
      isVip: true,
      joinDate: '2022-12-01',
      tags: ['management', 'strategy'],
    },
  ], []);

  // 初始化表格数据
  React.useEffect(() => {
    setTableData(mockData);
  }, [mockData]);

  // 编辑表单配置
  const editFormConfig: DynamicFormConfig = {
    name: 'editUserForm',
    layout: 'vertical',
    gutter: [16, 16],
    fields: [
      {
        name: 'name',
        label: '姓名',
        type: 'input',
        required: true,
        span: 12,
      },
      {
        name: 'email',
        label: '邮箱',
        type: 'input',
        required: true,
        span: 12,
        rules: [{ type: 'email', message: '请输入有效邮箱' }],
      },
      {
        name: 'age',
        label: '年龄',
        type: 'number',
        span: 12,
        min: 1,
        max: 120,
      },
      {
        name: 'gender',
        label: '性别',
        type: 'radio',
        span: 12,
        options: [
          { label: '男', value: 'male' },
          { label: '女', value: 'female' },
        ],
      },
      {
        name: 'city',
        label: '城市',
        type: 'select',
        span: 12,
        options: [
          { label: '北京', value: 'beijing' },
          { label: '上海', value: 'shanghai' },
          { label: '广州', value: 'guangzhou' },
          { label: '深圳', value: 'shenzhen' },
        ],
      },
      {
        name: 'status',
        label: '状态',
        type: 'radio',
        span: 12,
        options: [
          { label: '活跃', value: 'active' },
          { label: '非活跃', value: 'inactive' },
          { label: '待审核', value: 'pending' },
        ],
      },
      {
        name: 'salary',
        label: '薪资',
        type: 'number',
        span: 12,
        min: 0,
        step: 1000,
      },
      {
        name: 'rating',
        label: '评分',
        type: 'rate',
        span: 12,
        max: 5,
      },
      {
        name: 'isVip',
        label: 'VIP会员',
        type: 'switch',
        span: 12,
      },
    ],
    onFinish: (values) => {
      // 更新表格数据
      const updatedData = tableData.map(item => 
        item.id === editingRecord?.id ? { ...item, ...values } : item
      );
      setTableData(updatedData);
      setEditModalVisible(false);
      setEditingRecord(null);
      message.success('用户信息更新成功！');
    },
    submitText: '保存',
    resetText: '重置',
  };

  // 处理编辑
  const handleEdit = (record: Record<string, any>) => {
    setEditingRecord(record);
    setEditModalVisible(true);
  };

  // 处理删除
  const handleDelete = (record: Record<string, any>) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除用户 "${record.name}" 吗？`,
      onOk: () => {
        const updatedData = tableData.filter(item => item.id !== record.id);
        setTableData(updatedData);
        message.success('删除成功！');
      },
    });
  };

  // 处理刷新
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setTableData([...mockData]); // 重新加载数据
      message.success('数据已刷新');
    }, 1000);
  };

  // 基础表格配置
  const basicTableConfig: DynamicTableConfig = {
    columns: [
      {
        key: 'avatar',
        title: '头像',
        dataIndex: 'avatar',
        renderType: 'avatar',
        width: 80,
        imageSize: 40,
      },
      {
        key: 'name',
        title: '姓名',
        dataIndex: 'name',
        renderType: 'text',
        width: 100,
        sortable: true,
      },
      {
        key: 'email',
        title: '邮箱',
        dataIndex: 'email',
        renderType: 'link',
        width: 200,
      },
      {
        key: 'age',
        title: '年龄',
        dataIndex: 'age',
        renderType: 'text',
        width: 80,
        sortable: true,
      },
      {
        key: 'gender',
        title: '性别',
        dataIndex: 'gender',
        renderType: 'tag',
        width: 80,
        tagConfig: [
          { value: 'male', text: '男', color: 'blue' },
          { value: 'female', text: '女', color: 'pink' },
        ],
      },
      {
        key: 'status',
        title: '状态',
        dataIndex: 'status',
        renderType: 'status',
        width: 100,
        statusConfig: [
          { value: 'active', text: '活跃', color: 'green' },
          { value: 'inactive', text: '非活跃', color: 'red' },
          { value: 'pending', text: '待审核', color: 'orange' },
        ],
        filterable: true,
        filters: [
          { text: '活跃', value: 'active' },
          { text: '非活跃', value: 'inactive' },
          { text: '待审核', value: 'pending' },
        ],
      },
      {
        key: 'salary',
        title: '薪资',
        dataIndex: 'salary',
        renderType: 'currency',
        width: 120,
        sortable: true,
      },
      {
        key: 'rating',
        title: '评分',
        dataIndex: 'rating',
        renderType: 'rate',
        width: 150,
      },
      {
        key: 'progress',
        title: '完成度',
        dataIndex: 'progress',
        renderType: 'progress',
        width: 150,
      },
      {
        key: 'isVip',
        title: 'VIP',
        dataIndex: 'isVip',
        renderType: 'switch',
        width: 80,
      },
      {
        key: 'joinDate',
        title: '入职日期',
        dataIndex: 'joinDate',
        renderType: 'date',
        dateFormat: 'YYYY年MM月DD日',
        width: 150,
        sortable: true,
      },
      {
        key: 'actions',
        title: '操作',
        dataIndex: 'actions',
        renderType: 'actions',
        width: 200,
        fixed: 'right',
        actions: [
          {
            key: 'view',
            label: '查看',
            type: 'link',
            icon: 'view',
            onClick: (record) => {
              message.info(`查看用户：${record.name}`);
            },
          },
          {
            key: 'edit',
            label: '编辑',
            type: 'link',
            icon: 'edit',
            onClick: handleEdit,
          },
          {
            key: 'delete',
            label: '删除',
            type: 'link',
            danger: true,
            icon: 'delete',
            onClick: handleDelete,
            visible: (record) => record.role !== 'admin', // 管理员不显示删除按钮
          },
        ],
      },
    ],
    rowKey: 'id',
    pagination: {
      pageSize: 10,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
    },
    rowSelection: {
      type: 'checkbox',
      selectedRowKeys,
      onChange: (newSelectedRowKeys, selectedRows) => {
        setSelectedRowKeys(newSelectedRowKeys);
        console.log('选中的行:', selectedRows);
      },
    },
    toolbar: {
      title: '用户管理',
      showRefresh: true,
      showColumnSetting: true,
      showDensity: true,
      showFullscreen: true,
      extra: (
        <Space>
          <Button type="primary">新增用户</Button>
          <Button disabled={selectedRowKeys.length === 0}>
            批量删除({selectedRowKeys.length})
          </Button>
          <Button onClick={handleRefresh}>手动刷新</Button>
        </Space>
      ),
    },
    bordered: true,
    onChange: (pagination, filters, sorter, extra) => {
      console.log('表格变化:', { pagination, filters, sorter, extra });
    },
  };

  // 简单表格配置
  const simpleTableConfig: DynamicTableConfig = {
    columns: [
      {
        key: 'name',
        title: '产品名称',
        dataIndex: 'name',
        renderType: 'text',
      },
      {
        key: 'price',
        title: '价格',
        dataIndex: 'price',
        renderType: 'currency',
        currencySymbol: '$',
      },
      {
        key: 'category',
        title: '分类',
        dataIndex: 'category',
        renderType: 'tag',
        tagConfig: [
          { value: 'electronics', text: '电子产品', color: 'blue' },
          { value: 'clothing', text: '服装', color: 'green' },
          { value: 'books', text: '图书', color: 'orange' },
        ],
      },
      {
        key: 'stock',
        title: '库存',
        dataIndex: 'stock',
        renderType: 'text',
      },
    ],
    rowKey: 'id',
    size: 'small',
    pagination: false,
  };

  const simpleData = [
    { id: 1, name: 'iPhone 15', price: 999, category: 'electronics', stock: 50 },
    { id: 2, name: 'T恤', price: 29, category: 'clothing', stock: 100 },
    { id: 3, name: 'React 入门指南', price: 49, category: 'books', stock: 20 },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <Typography>
        <Title level={2}>动态表格组件示例</Title>
        <Paragraph>
          基于 Ant Design 封装的动态表格组件，支持通过 JSON 配置渲染各种列类型和功能。
        </Paragraph>
      </Typography>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 功能完整的表格示例 */}
        <Card title="功能完整的表格示例" size="small">
          <Paragraph>
            <Text type="secondary">
              展示各种列类型：头像、标签、状态、货币、评分、进度条、开关、日期格式化、操作按钮等
            </Text>
          </Paragraph>
          <DynamicTable 
            config={{
              ...basicTableConfig,
              loading,
            }}
            dataSource={tableData}
          />
        </Card>

        <Divider />

        {/* 简单表格示例 */}
        <Card title="简单表格示例" size="small">
          <Paragraph>
            <Text type="secondary">
              简洁的表格配置，无分页、无工具栏
            </Text>
          </Paragraph>
          <DynamicTable 
            config={simpleTableConfig}
            dataSource={simpleData}
          />
        </Card>

        <Divider />

        {/* 配置说明 */}
        <Card title="配置说明" size="small">
          <Typography>
            <Title level={4}>支持的列渲染类型</Title>
            <ul>
              <li><Text code>text</Text> - 纯文本</li>
              <li><Text code>link</Text> - 链接</li>
              <li><Text code>image</Text> - 图片</li>
              <li><Text code>avatar</Text> - 头像</li>
              <li><Text code>tag</Text> - 标签</li>
              <li><Text code>badge</Text> - 徽章</li>
              <li><Text code>status</Text> - 状态</li>
              <li><Text code>date</Text> - 日期格式化</li>
              <li><Text code>currency</Text> - 货币格式化</li>
              <li><Text code>percent</Text> - 百分比</li>
              <li><Text code>actions</Text> - 操作按钮组</li>
              <li><Text code>switch</Text> - 开关</li>
              <li><Text code>rate</Text> - 评分</li>
              <li><Text code>progress</Text> - 进度条</li>
              <li><Text code>custom</Text> - 自定义渲染</li>
            </ul>

            <Title level={4}>主要特性</Title>
            <ul>
              <li>✅ 支持多种列渲染类型</li>
              <li>✅ 完整的 TypeScript 类型支持</li>
              <li>✅ 表格工具栏（刷新、列设置、密度、全屏）</li>
              <li>✅ 行选择功能</li>
              <li>✅ 排序和筛选</li>
              <li>✅ 分页配置</li>
              <li>✅ 操作按钮组</li>
              <li>✅ 条件显示/隐藏</li>
              <li>✅ 自定义渲染函数</li>
              <li>✅ 响应式设计</li>
            </ul>
          </Typography>
        </Card>
      </Space>

      {/* 编辑用户模态框 */}
      <Modal
        title="编辑用户"
        open={editModalVisible}
        onCancel={() => {
          setEditModalVisible(false);
          setEditingRecord(null);
        }}
        footer={null}
        width={600}
        destroyOnClose
      >
        {editingRecord && (
          <DynamicForm
            config={editFormConfig}
            initialValues={editingRecord}
          />
        )}
      </Modal>
    </div>
  );
};

export default DynamicTableDemo;
