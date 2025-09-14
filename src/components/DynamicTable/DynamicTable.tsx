import React, { useState, useMemo } from 'react';
import { Table, Empty } from 'antd';
import { TableToolbar } from './TableToolbar';
import { ColumnRenderer } from './ColumnRenderer';
import type { ColumnsType } from 'antd/es/table';
import type { DynamicTableProps, ColumnConfig } from './types';

export const DynamicTable: React.FC<DynamicTableProps> = ({
  config,
  dataSource,
  className,
  style,
}) => {
  const [visibleColumnKeys, setVisibleColumnKeys] = useState<string[]>(
    config.columns.map(col => col.key)
  );
  const [tableSize, setTableSize] = useState<'large' | 'middle' | 'small'>(
    config.size || 'middle'
  );

  const {
    columns: columnConfigs,
    rowKey = 'id',
    pagination = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
    },
    rowSelection,
    toolbar,
    bordered = false,
    showHeader = true,
    loading = false,
    emptyText,
    onChange,
    onRow,
    tableProps = {},
  } = config;

  // 生成 Ant Design 表格列配置
  const antdColumns: ColumnsType<any> = useMemo(() => {
    return columnConfigs
      .filter(col => visibleColumnKeys.includes(col.key))
      .map((column: ColumnConfig) => {
        const {
          key,
          title,
          dataIndex,
          width,
          fixed,
          align,
          sortable,
          filterable,
          filters,
          columnProps = {},
        } = column;

        return {
          key,
          title,
          dataIndex,
          width,
          fixed,
          align,
          sorter: sortable ? true : false,
          filterable,
          filters,
          render: (value: any, record: any, index: number) => (
            <ColumnRenderer
              column={column}
              value={value}
              record={record}
              index={index}
            />
          ),
          ...columnProps,
        };
      });
  }, [columnConfigs, visibleColumnKeys]);

  // 处理刷新
  const handleRefresh = () => {
    // 这里可以触发数据重新加载的回调
    console.log('刷新表格数据');
  };

  // 处理列显示/隐藏
  const handleColumnChange = (newVisibleColumns: string[]) => {
    setVisibleColumnKeys(newVisibleColumns);
  };

  // 处理密度变化
  const handleDensityChange = (density: 'large' | 'middle' | 'small') => {
    setTableSize(density);
  };

  // 空状态配置
  const locale = {
    emptyText: emptyText ? <Empty description={emptyText} /> : undefined,
  };

  return (
    <div className={className} style={style}>
      {/* 工具栏 */}
      {toolbar && (
        <TableToolbar
          config={toolbar}
          columns={columnConfigs}
          onRefresh={handleRefresh}
          onColumnChange={handleColumnChange}
          onDensityChange={handleDensityChange}
        />
      )}

      {/* 表格 */}
      <Table
        columns={antdColumns}
        dataSource={dataSource}
        rowKey={rowKey}
        pagination={pagination}
        rowSelection={rowSelection}
        size={tableSize}
        bordered={bordered}
        showHeader={showHeader}
        loading={loading}
        onChange={onChange}
        onRow={onRow}
        locale={locale}
        scroll={{ x: 'max-content' }}
        {...tableProps}
      />
    </div>
  );
};
