import type { Rule, FormInstance } from 'antd/es/form';
import type { SelectProps, InputProps, DatePickerProps, SwitchProps, RadioGroupProps } from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox';

/**
 * 表单字段类型枚举
 * 定义了动态表单支持的所有字段类型
 */
export type FormFieldType = 
  | 'input'           // 单行文本输入框
  | 'textarea'        // 多行文本输入框
  | 'password'        // 密码输入框，输入内容会被隐藏
  | 'number'          // 数字输入框，支持步进器
  | 'select'          // 单选下拉选择器
  | 'multiSelect'     // 多选下拉选择器
  | 'radio'           // 单选按钮组
  | 'checkbox'        // 多选框组
  | 'switch'          // 开关切换器
  | 'datePicker'      // 日期选择器
  | 'dateRange'       // 日期范围选择器
  | 'timePicker'      // 时间选择器
  | 'upload'          // 文件上传组件
  | 'rate'            // 星级评分组件
  | 'slider';         // 数值滑块组件

/**
 * 选项配置接口
 * 用于 select、radio、checkbox 等选择类组件的选项定义
 */
export interface OptionConfig {
  /** 选项显示文本 */
  label: string;
  /** 选项值，支持字符串、数字、布尔类型 */
  value: string | number | boolean;
  /** 是否禁用该选项 */
  disabled?: boolean;
}

/**
 * 表单字段配置接口
 * 定义单个表单字段的所有配置选项
 */
export interface FormFieldConfig {
  // ==================== 基础配置 ====================
  /** 字段名称，对应表单数据的字段名 */
  name: string;
  /** 字段显示标签 */
  label: string;
  /** 字段组件类型 */
  type: FormFieldType;
  /** 是否为必填字段 */
  required?: boolean;
  /** 是否禁用该字段 */
  disabled?: boolean;
  /** 是否隐藏该字段 */
  hidden?: boolean;
  
  // ==================== 默认值配置 ====================
  /** 字段默认值 */
  defaultValue?: unknown;
  
  // ==================== 布局配置 ====================
  /** 栅格占位格数 (1-24)，控制字段宽度 */
  span?: number;
  /** 栅格左侧的间隔格数，用于布局调整 */
  offset?: number;
  
  // ==================== 验证配置 ====================
  /** 表单验证规则数组 */
  rules?: Rule[];
  
  // ==================== 选项配置 ====================
  /** 选择类组件的选项配置（select、radio、checkbox 使用） */
  options?: OptionConfig[];
  
  // ==================== 组件特定属性 ====================
  /** 输入框占位文本 */
  placeholder?: string;
  /** 输入框最大长度 */
  maxLength?: number;
  /** 数字输入框最小值 */
  min?: number;
  /** 数字输入框最大值 */
  max?: number;
  /** 数字输入框步长 */
  step?: number;
  
  // ==================== 原生属性扩展 ====================
  /** 组件原生属性，用于传递给具体的 Ant Design 组件 */
  componentProps?: 
    | InputProps 
    | SelectProps 
    | DatePickerProps 
    | SwitchProps 
    | RadioGroupProps 
    | CheckboxGroupProps 
    | Record<string, unknown>;
  
  // ==================== 条件显示配置 ====================
  /** 依赖的其他字段名数组，用于条件显示 */
  dependencies?: string[];
  /** 条件显示判断函数，返回 true 时显示该字段 */
  condition?: (values: Record<string, unknown>) => boolean;
  
  // ==================== 自定义渲染 ====================
  /** 自定义渲染函数，优先级最高 */
  render?: (field: FormFieldConfig, form: unknown) => React.ReactNode;
}

/**
 * 动态表单配置接口
 * 定义整个表单的配置选项，包括布局、字段、提交等
 */
export interface DynamicFormConfig {
  // ==================== 表单基础配置 ====================
  /** 表单名称，用于标识表单实例 */
  name?: string;
  /** 表单布局方式 */
  layout?: 'horizontal' | 'vertical' | 'inline';
  /** 标签列配置，用于 horizontal 布局 */
  labelCol?: { span: number };
  /** 输入框列配置，用于 horizontal 布局 */
  wrapperCol?: { span: number };
  
  // ==================== 字段配置 ====================
  /** 表单字段配置数组 */
  fields: FormFieldConfig[];
  
  // ==================== 提交按钮配置 ====================
  /** 提交按钮显示文字 */
  submitText?: string;
  /** 重置按钮显示文字 */
  resetText?: string;
  /** 是否显示提交按钮 */
  showSubmit?: boolean;
  /** 是否显示重置按钮 */
  showReset?: boolean;
  
  // ==================== 布局配置 ====================
  /** 栅格间距，可以是数字或数组 [水平间距, 垂直间距] */
  gutter?: number | [number, number];
  
  // ==================== 事件回调 ====================
  /** 表单提交成功时的回调函数 */
  onFinish?: (values: Record<string, unknown>) => void;
  /** 表单提交失败时的回调函数 */
  onFinishFailed?: (errorInfo: unknown) => void;
  /** 表单字段值变化时的回调函数 */
  onValuesChange?: (changedValues: Record<string, unknown>, allValues: Record<string, unknown>) => void;
}

/**
 * 动态表单组件 Props 接口
 * 定义动态表单组件的输入属性
 */
export interface DynamicFormProps {
  /** 表单配置对象，包含字段定义、布局、验证等所有配置 */
  config: DynamicFormConfig;
  /** 表单初始值 */
  initialValues?: Record<string, unknown>;
  /** 表单加载状态 */
  loading?: boolean;
  /** 组件的 CSS 类名 */
  className?: string;
  /** 组件的内联样式 */
  style?: React.CSSProperties;
  /** 外部表单实例，如果提供则使用外部实例，否则创建内部实例 */
  form?: FormInstance;
}
