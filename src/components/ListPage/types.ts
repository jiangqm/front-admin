import type { ReactNode } from 'react';
import type { FormInstance } from 'antd';
import type { DynamicTableConfig } from '@/components/DynamicTable';

// 搜索字段类型
export type SearchFieldType = 
  | 'input'           // 输入框
  | 'textarea'        // 多行文本
  | 'select'          // 下拉选择
  | 'multiSelect'     // 多选下拉
  | 'dateRange'       // 日期范围
  | 'datePicker'      // 日期选择
  | 'timePicker'      // 时间选择
  | 'number'          // 数字输入
  | 'switch'          // 开关
  | 'radio'           // 单选
  | 'checkbox'        // 多选
  | 'cascader'        // 级联选择
  | 'treeSelect'      // 树选择
  | 'custom';         // 自定义

// 搜索字段选项
export interface SearchFieldOption {
  label: string;
  value: any;
  disabled?: boolean;
  children?: SearchFieldOption[];
}

// 搜索字段配置
export interface SearchFieldConfig {
  name: string;                    // 字段名
  label: string;                   // 字段标签
  type: SearchFieldType;           // 字段类型
  span?: number;                   // 栅格占位 (1-24)
  placeholder?: string;            // 占位文本
  disabled?: boolean;              // 是否禁用
  allowClear?: boolean;            // 是否显示清除按钮
  
  // 选项配置（select、radio、checkbox 等使用）
  options?: SearchFieldOption[];
  
  // 数字输入配置
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  
  // 日期配置
  format?: string;
  showTime?: boolean;
  
  // 级联/树选择配置
  changeOnSelect?: boolean;
  multiple?: boolean;
  
  // 自定义渲染
  render?: (form: FormInstance) => ReactNode;
  
  // 其他原生属性
  componentProps?: Record<string, any>;
}

// 搜索表单配置
export interface SearchConfig {
  fields: SearchFieldConfig[];     // 搜索字段配置
  layout?: 'horizontal' | 'vertical' | 'inline'; // 表单布局
  labelCol?: { span: number };     // 标签列配置
  wrapperCol?: { span: number };   // 输入框列配置
  gutter?: [number, number];       // 栅格间距
  showSearchButton?: boolean;      // 是否显示搜索按钮
  showResetButton?: boolean;       // 是否显示重置按钮
  searchButtonText?: string;       // 搜索按钮文字
  resetButtonText?: string;        // 重置按钮文字
  searchButtonProps?: Record<string, any>; // 搜索按钮属性
  resetButtonProps?: Record<string, any>;  // 重置按钮属性
  onSearch?: (values: Record<string, any>) => void;    // 搜索回调
  onReset?: () => void;            // 重置回调
  onValuesChange?: (changedValues: Record<string, any>, allValues: Record<string, any>) => void;
}

// 工具栏配置
export interface ToolbarConfig {
  title?: string;                  // 标题
  showRefresh?: boolean;           // 显示刷新按钮
  extra?: ReactNode;               // 额外的工具栏内容
  onRefresh?: () => void;          // 刷新回调
  showSearchButtons?: boolean;     // 显示搜索和重置按钮
  searchButtonText?: string;       // 搜索按钮文字
  resetButtonText?: string;        // 重置按钮文字
  onSearch?: (values: Record<string, unknown>) => void;  // 搜索回调
  onReset?: () => void;            // 重置回调
}

// 列表页面配置
export interface ListPageConfig {
  searchConfig?: SearchConfig;     // 搜索配置
  tableConfig: DynamicTableConfig; // 表格配置
  toolbarConfig?: ToolbarConfig;   // 工具栏配置
}

// 列表页面组件属性
export interface ListPageProps {
  config: ListPageConfig;          // 页面配置
  dataSource: any[];               // 表格数据
  loading?: boolean;               // 加载状态
  searchValues?: Record<string, any>; // 搜索表单初始值
  onSearchChange?: (values: Record<string, any>) => void; // 搜索变化回调
  className?: string;
  style?: React.CSSProperties;
}
