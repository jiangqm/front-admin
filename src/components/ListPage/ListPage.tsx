import React, { useState, useEffect } from 'react';
import { Button, Form, Space } from 'antd';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { SearchForm } from './SearchForm';
import { DynamicTable } from '@/components/DynamicTable';
import type { ListPageProps } from './types';

export const ListPage: React.FC<ListPageProps> = ({
  config,
  dataSource,
  loading = false,
  searchValues = {},
  onSearchChange,
  className,
  style,
}) => {
  const [searchForm] = Form.useForm();
  const [currentSearchValues, setCurrentSearchValues] = useState(searchValues);

  const {
    searchConfig,
    tableConfig,
    toolbarConfig,
  } = config;

  // 同步外部搜索值
  useEffect(() => {
    if (searchValues && Object.keys(searchValues).length > 0) {
      searchForm.setFieldsValue(searchValues);
      setCurrentSearchValues(searchValues);
    }
  }, [searchValues, searchForm]);

  // 处理搜索
  const handleSearch = (values: Record<string, unknown>) => {
    setCurrentSearchValues(values);
    onSearchChange?.(values);
    searchConfig?.onSearch?.(values);
  };

  // 处理重置
  const handleReset = () => {
    const resetValues = {};
    setCurrentSearchValues(resetValues);
    onSearchChange?.(resetValues);
    searchConfig?.onReset?.();
  };

  // 处理刷新
  const handleRefresh = () => {
    toolbarConfig?.onRefresh?.();
  };



  return (
    <div 
      className={`bg-gray-50 min-h-screen ${className || ''}`}
      style={style}
    >
      {/* 整体内容区域 - 白色背景 */}
      <div className="bg-white  p-[12px] rounded-xl">
        {/* 主要内容容器 */}
          <div className="bg-white  overflow-hidden">
            {/* 搜索表单区域 */}
            {searchConfig && (
              <div className=" py-2">
                <SearchForm
                  config={{
                    ...searchConfig,
                    layout: 'inline', // 强制使用内联布局
                    gutter: [0,0],
                  }}
                  form={searchForm}
                  initialValues={currentSearchValues}
                  onSearch={handleSearch}
                  onReset={handleReset}
                />
              </div>
            )}

            {/* 工具栏区域 */}
            {toolbarConfig && (
              <div className=" pb-2 border-b border-gray-100 bg-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {toolbarConfig.title && (
                    <span className="text-sm text-gray-600">
                      {toolbarConfig.title}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {toolbarConfig.extra}
              {/* 搜索和重置按钮 */}
              {toolbarConfig.showSearchButtons && (
                <Space size="small">
                  <Button
                    size="middle"
                    icon={<ReloadOutlined />}
                    onClick={() => {
                      searchForm.resetFields();
                      toolbarConfig.onReset?.();
                    }}
                  >
                    {toolbarConfig.resetButtonText || '重置'}
                  </Button>
                  <Button
                    type="primary"
                    size="middle"
                    icon={<SearchOutlined />}
                    onClick={() => {
                      const values = searchForm.getFieldsValue();
                      toolbarConfig.onSearch?.(values);
                    }}
                  >
                    {toolbarConfig.searchButtonText || '查询'}
                  </Button>
                </Space>
              )}
              {toolbarConfig.showRefresh && (
                <Button
                  size="middle"
                  icon={<ReloadOutlined />}
                  onClick={handleRefresh}
                  className="border-none shadow-none text-gray-600"
                />
              )}
                </div>
              </div>
            )}

            {/* 数据表格区域 */}
            <div className="bg-white">
              <DynamicTable
                config={{
                  ...tableConfig,
                  loading,
                  // 移除表格的边框和圆角，使其与容器融合
                }}
                dataSource={dataSource}
              />
            </div>
          </div>
       
      </div>
    </div>
  );
};
