import React, { useState, useEffect } from 'react';
import { Button, message, Modal, Space } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { ListPage } from '@/components/ListPage';
import { DynamicForm } from '@/components/DynamicForm';
import type { ListPageConfig } from '@/components/ListPage';
import type { DynamicFormConfig } from '@/components/DynamicForm';

const GenericListDemo: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useState<Record<string, any>>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  // 模拟数据
  const mockData = [
    {
      id: 1,
      name: '张三',
      email: 'zhangsan@example.com',
      phone: '13800138001',
      department: 'tech',
      position: 'frontend',
      status: 'active',
      joinDate: '2023-01-15',
      salary: 15000,
    },
    {
      id: 2,
      name: '李四',
      email: 'lisi@example.com',
      phone: '13800138002',
      department: 'product',
      position: 'manager',
      status: 'active',
      joinDate: '2022-08-20',
      salary: 18000,
    },
    {
      id: 3,
      name: '王五',
      email: 'wangwu@example.com',
      phone: '13800138003',
      department: 'design',
      position: 'designer',
      status: 'inactive',
      joinDate: '2023-06-10',
      salary: 12000,
    },
  ];

  // 处理打开新增模态框


  // 初始化数据
  useEffect(() => {
    handleSearch({});
  }, []);

  // 通用列表页面配置
  const listPageConfig: ListPageConfig = {
    // 搜索表单配置
    searchConfig: {
      fields: [
        {
          name: 'name',
          label: '姓名',
          type: 'input',
          span: 6, // 一行4个字段
          placeholder: '请输入组合商品ID/前台组合商...',
        },
        {
          name: 'status',
          label: '状态',
          type: 'select',
          span: 6,
          placeholder: '请选择组合商品状态',
          options: [
            { label: '启用', value: 'active' },
            { label: '禁用', value: 'inactive' },
          ],
        },
        {
          name: 'itemId',
          label: 'Item_ID',
          type: 'input',
          span: 6,
          placeholder: '请输入Item_ID',
        },
        {
          name: 'dateRange',
          label: '日期范围',
          type: 'dateRange',
          span: 6,
        },
        {
          name: 'discountType',
          label: '折扣方式',
          type: 'select',
          span: 6,
          placeholder: '请选择折扣方式',
          options: [
            { label: '百分比折扣', value: 'percentage' },
            { label: '满减折扣', value: 'amount' },
          ],
        },
        {
          name: 'priority',
          label: '优先级',
          type: 'select',
          span: 6,
          placeholder: '请选择优先级',
          options: [
            { label: '高', value: 'high' },
            { label: '中', value: 'medium' },
            { label: '低', value: 'low' },
          ],
        },
      ],
      showSearchButton: false,  // 不在搜索表单中显示按钮
      showResetButton: false,   // 不在搜索表单中显示按钮
    },
    
    // 表格配置
    tableConfig: {
      columns: [
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
          renderType: 'text',
          width: 200,
        },
        {
          key: 'phone',
          title: '手机号',
          dataIndex: 'phone',
          renderType: 'text',
          width: 120,
        },
        {
          key: 'department',
          title: '部门',
          dataIndex: 'department',
          renderType: 'tag',
          width: 100,
          tagConfig: [
            { value: 'tech', text: '技术部', color: 'blue' },
            { value: 'product', text: '产品部', color: 'green' },
            { value: 'design', text: '设计部', color: 'purple' },
            { value: 'marketing', text: '市场部', color: 'orange' },
          ],
     
        },
        {
          key: 'position',
          title: '职位',
          dataIndex: 'position',
          renderType: 'text',
          width: 120,
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
          key: 'joinDate',
          title: '入职日期',
          dataIndex: 'joinDate',
          renderType: 'date',
          dateFormat: 'YYYY-MM-DD',
          width: 120,
          sortable: true,
        },
        {
          key: 'actions',
          title: '操作',
          dataIndex: 'actions',
          renderType: 'actions',
          width: 120,
          fixed: 'right',
          actions: [
            {
              key: 'edit',
              label: '编辑',
              type: 'link',
              icon: 'edit',
              onClick: handleEditUser,
            },
            {
              key: 'delete',
              label: '删除',
              type: 'link',
              danger: true,
              icon: 'delete',
              onClick: handleDeleteUser,
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
        onChange: (newSelectedRowKeys) => {
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      
    },
    
    // 工具栏配置
    toolbarConfig: {
      showRefresh: true,
      showSearchButtons: true,
      searchButtonText: '查询',
      resetButtonText: '重置',
      onSearch: handleSearch,
      onReset: handleReset,
      extra: (
        <Space>
          <Button size="middle">批量操作</Button>
          <Button size="middle">一键启用/禁用</Button>
          <Button size="middle" icon={<ReloadOutlined />}>收起</Button>
        </Space>
      ),
      onRefresh: handleRefresh,
    },
  };

  // 用户表单配置
  const userFormConfig: DynamicFormConfig = {
    name: 'userForm',
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
        name: 'phone',
        label: '手机号',
        type: 'input',
        required: true,
        span: 12,
      },
      {
        name: 'department',
        label: '部门',
        type: 'select',
        required: true,
        span: 12,
        options: [
          { label: '技术部', value: 'tech' },
          { label: '产品部', value: 'product' },
          { label: '设计部', value: 'design' },
          { label: '市场部', value: 'marketing' },
        ],
      },
      {
        name: 'position',
        label: '职位',
        type: 'input',
        required: true,
        span: 12,
      },
      {
        name: 'status',
        label: '状态',
        type: 'radio',
        span: 12,
        defaultValue: 'active',
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
      },
      {
        name: 'joinDate',
        label: '入职日期',
        type: 'datePicker',
        span: 12,
      },
    ],
    onFinish: editingRecord ? handleUpdateUser : handleAddUser,
    submitText: editingRecord ? '更新' : '添加',
  };

  // 处理搜索
  function handleSearch(values: Record<string, any>) {
    setLoading(true);
    setSearchParams(values);
    
    setTimeout(() => {
      let filteredData = [...mockData];
      
      if (values.name) {
        filteredData = filteredData.filter(user => 
          user.name.includes(values.name)
        );
      }
      if (values.email) {
        filteredData = filteredData.filter(user => 
          user.email.includes(values.email)
        );
      }
      if (values.department) {
        filteredData = filteredData.filter(user => 
          user.department === values.department
        );
      }
      if (values.status) {
        filteredData = filteredData.filter(user => 
          user.status === values.status
        );
      }
      
      setTableData(filteredData);
      setLoading(false);
    }, 800);
  }

  // 处理重置
  function handleReset() {
    handleSearch({});
  }

  // 处理刷新
  function handleRefresh() {
    handleSearch(searchParams);
  }

  // 处理新增
  function handleAddUser(values: Record<string, any>) {
    const newUser = {
      ...values,
      id: Date.now(),
      joinDate: values.joinDate?.format('YYYY-MM-DD') || new Date().toISOString().split('T')[0],
    };
    
    setTableData([newUser, ...tableData]);
    setAddModalVisible(false);
    message.success('员工添加成功！');
  }

  // 处理编辑
  function handleEditUser(record: any) {
    setEditingRecord(record);
    setEditModalVisible(true);
  }

  // 处理更新
  function handleUpdateUser(values: Record<string, any>) {
    const updatedData = tableData.map(item =>
      item.id === editingRecord?.id 
        ? { 
            ...item, 
            ...values,
            joinDate: values.joinDate?.format('YYYY-MM-DD') || item.joinDate,
          }
        : item
    );
    
    setTableData(updatedData);
    setEditModalVisible(false);
    setEditingRecord(null);
    message.success('员工信息更新成功！');
  }

  // 处理删除
  function handleDeleteUser(record: any) {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除员工 "${record.name}" 吗？`,
      onOk: () => {
        const updatedData = tableData.filter(item => item.id !== record.id);
        setTableData(updatedData);
        message.success('删除成功！');
      },
    });
  }

  // 处理批量删除

  return (
    <div >
      {/* 使用通用列表页面组件 */}
      <ListPage
        config={listPageConfig}
        dataSource={tableData}
        loading={loading}
        searchValues={searchParams}
        onSearchChange={setSearchParams}
      />

      {/* 新增员工模态框 */}
      <Modal
        title="新增员工"
        open={addModalVisible}
        onCancel={() => setAddModalVisible(false)}
        footer={null}
        width={800}
        destroyOnClose
      >
        <DynamicForm config={userFormConfig} />
      </Modal>

      {/* 编辑员工模态框 */}
      <Modal
        title="编辑员工"
        open={editModalVisible}
        onCancel={() => {
          setEditModalVisible(false);
          setEditingRecord(null);
        }}
        footer={null}
        width={800}
        destroyOnClose
      >
        {editingRecord && (
          <DynamicForm
            config={userFormConfig}
            initialValues={editingRecord}
          />
        )}
      </Modal>
    </div>
  );
};

export default GenericListDemo;
