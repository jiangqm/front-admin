import React, { useState } from 'react';
import {
  Row,
  Col,
  Button,
  Tooltip,
  Dropdown,
  Checkbox,
  Space,
  Typography,
} from 'antd';
import {
  ReloadOutlined,
  SettingOutlined,
  ColumnHeightOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import type { ToolbarConfig, ColumnConfig } from './types';

const { Title } = Typography;

interface TableToolbarProps {
  config: ToolbarConfig;
  columns: ColumnConfig[];
  onRefresh?: () => void;
  onColumnChange?: (visibleColumns: string[]) => void;
  onDensityChange?: (density: 'large' | 'middle' | 'small') => void;
}

export const TableToolbar: React.FC<TableToolbarProps> = ({
  config,
  columns,
  onRefresh,
  onColumnChange,
  onDensityChange,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map(col => col.key)
  );

  const {
    showRefresh = true,
    showColumnSetting = true,
    showDensity = true,
    showFullscreen = true,
    title,
    extra,
  } = config;

  // 列设置菜单
  const columnMenu = (
    <div className="p-2 min-w-48">
      <div className="mb-2 pb-2 border-b">
        <Button
          type="link"
          size="small"
          onClick={() => {
            const allKeys = columns.map(col => col.key);
            setVisibleColumns(allKeys);
            onColumnChange?.(allKeys);
          }}
        >
          全选
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            setVisibleColumns([]);
            onColumnChange?.([]);
          }}
        >
          清空
        </Button>
      </div>
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        {columns.map(column => (
          <Checkbox
            key={column.key}
            checked={visibleColumns.includes(column.key)}
            onChange={(e) => {
              const newVisible = e.target.checked
                ? [...visibleColumns, column.key]
                : visibleColumns.filter(key => key !== column.key);
              setVisibleColumns(newVisible);
              onColumnChange?.(newVisible);
            }}
          >
            {column.title}
          </Checkbox>
        ))}
      </Space>
    </div>
  );

  // 密度设置菜单
  const densityItems: MenuProps['items'] = [
    {
      key: 'large',
      label: '默认',
      onClick: () => onDensityChange?.('large'),
    },
    {
      key: 'middle',
      label: '中等',
      onClick: () => onDensityChange?.('middle'),
    },
    {
      key: 'small',
      label: '紧凑',
      onClick: () => onDensityChange?.('small'),
    },
  ];

  // 全屏切换
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <Row justify="space-between" align="middle" className="mb-4">
      <Col>
        {title && (
          <Title level={4} style={{ margin: 0 }}>
            {title}
          </Title>
        )}
      </Col>
      <Col>
        <Space size="small">
          {extra}
          
          {showRefresh && (
            <Tooltip title="刷新">
              <Button
                type="text"
                icon={<ReloadOutlined />}
                onClick={onRefresh}
              />
            </Tooltip>
          )}

          {showColumnSetting && (
            <Dropdown
              overlay={columnMenu}
              trigger={['click']}
              placement="bottomRight"
            >
              <Tooltip title="列设置">
                <Button type="text" icon={<SettingOutlined />} />
              </Tooltip>
            </Dropdown>
          )}

          {showDensity && (
            <Dropdown
              menu={{ items: densityItems }}
              trigger={['click']}
              placement="bottomRight"
            >
              <Tooltip title="密度">
                <Button type="text" icon={<ColumnHeightOutlined />} />
              </Tooltip>
            </Dropdown>
          )}

          {showFullscreen && (
            <Tooltip title={isFullscreen ? '退出全屏' : '全屏'}>
              <Button
                type="text"
                icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
                onClick={toggleFullscreen}
              />
            </Tooltip>
          )}
        </Space>
      </Col>
    </Row>
  );
};
