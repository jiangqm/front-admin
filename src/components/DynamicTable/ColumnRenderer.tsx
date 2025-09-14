import React from 'react';
import {
  Tag,
  Badge,
  Avatar,
  Image,
  Button,
  Space,
  Rate,
  Progress,
  Switch,
  Tooltip,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import type { ColumnConfig, ActionConfig } from './types';

interface ColumnRendererProps {
  column: ColumnConfig;
  value: any;
  record: any;
  index: number;
}

// 图标映射
const iconMap: Record<string, React.ReactNode> = {
  edit: <EditOutlined />,
  delete: <DeleteOutlined />,
  view: <EyeOutlined />,
  more: <MoreOutlined />,
};

export const ColumnRenderer: React.FC<ColumnRendererProps> = ({
  column,
  value,
  record,
  index,
}) => {
  const {
    renderType = 'text',
    dateFormat = 'YYYY-MM-DD',
    currencySymbol = '¥',
    precision = 2,
    statusConfig = [],
    tagConfig = [],
    actions = [],
    imageSize = 50,
    linkTarget = '_self',
  } = column;

  // 如果有自定义渲染函数，优先使用
  if (column.render) {
    return column.render(value, record, index);
  }

  switch (renderType) {
    case 'text':
      return <span>{value}</span>;

    case 'link':
      return (
        <a
          href={value}
          target={linkTarget}
          rel={linkTarget === '_blank' ? 'noopener noreferrer' : undefined}
        >
          {value}
        </a>
      );

    case 'image':
      return (
        <Image
          src={value}
          alt=""
          width={imageSize}
          height={imageSize}
          style={{ objectFit: 'cover' }}
          fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
        />
      );

    case 'avatar':
      return (
        <Avatar
          src={value}
          size={imageSize}
          style={{ backgroundColor: '#f56a00' }}
        >
          {typeof value === 'string' ? value.charAt(0).toUpperCase() : 'U'}
        </Avatar>
      );

    case 'tag': {
      const tagItem = tagConfig.find(item => item.value === value);
      return (
        <Tag color={tagItem?.color || 'default'}>
          {tagItem?.text || value}
        </Tag>
      );
    }

    case 'badge':
      return <Badge count={value} showZero />;

    case 'status': {
      const statusItem = statusConfig.find(item => item.value === value);
      if (statusItem) {
        return <Badge color={statusItem.color} text={statusItem.text} />;
      }
      return <Badge color="default" text={value} />;
    }

    case 'date':
      if (!value) return '-';
      return <span>{dayjs(value).format(dateFormat)}</span>;

    case 'currency':
      if (typeof value !== 'number') return '-';
      return (
        <span>
          {currencySymbol}{value.toFixed(precision).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
        </span>
      );

    case 'percent':
      if (typeof value !== 'number') return '-';
      return <span>{(value * 100).toFixed(precision)}%</span>;

    case 'switch':
      return (
        <Switch
          checked={Boolean(value)}
          size="small"
          disabled
        />
      );

    case 'rate':
      return (
        <Rate
          value={Number(value) || 0}
          disabled
          allowHalf
        />
      );

    case 'progress':
      return (
        <Progress
          percent={Number(value) || 0}
          size="small"
          style={{ minWidth: 100 }}
        />
      );

    case 'actions': {
      const visibleActions = actions.filter(action => {
        if (typeof action.visible === 'function') {
          return action.visible(record);
        }
        return action.visible !== false;
      });

      return (
        <Space size="small">
          {visibleActions.map((action: ActionConfig) => {
            const isDisabled = typeof action.disabled === 'function' 
              ? action.disabled(record) 
              : action.disabled;

            const icon = action.icon ? iconMap[action.icon] : null;

            return (
              <Tooltip key={action.key} title={action.label}>
                <Button
                  type={action.type || 'text'}
                  size="small"
                  danger={action.danger}
                  disabled={isDisabled}
                  icon={icon}
                  onClick={() => action.onClick(record, index)}
                >
                  {!icon && action.label}
                </Button>
              </Tooltip>
            );
          })}
        </Space>
      );
    }

    case 'custom':
      // 自定义类型应该提供 render 函数
      return <span>{value}</span>;

    default:
      return <span>{value}</span>;
  }
};
