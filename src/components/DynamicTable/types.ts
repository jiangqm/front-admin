import type { TableProps, TablePaginationConfig } from 'antd';
import type { ColumnType } from 'antd/es/table';
import type { SorterResult, FilterValue } from 'antd/es/table/interface';

/**
 * 列渲染类型枚举
 * 定义了表格列支持的所有渲染类型
 */
export type ColumnRenderType = 
  | 'text'           // 纯文本显示
  | 'link'           // 超链接，可点击跳转
  | 'image'          // 图片展示，支持预览
  | 'avatar'         // 头像显示，圆形图片
  | 'tag'            // 标签样式，带颜色分类
  | 'badge'          // 徽章数字显示
  | 'status'         // 状态指示器，带颜色和文字
  | 'date'           // 日期格式化显示
  | 'currency'       // 货币格式化，带符号和千分位
  | 'percent'        // 百分比显示
  | 'actions'        // 操作按钮组，支持编辑删除等
  | 'switch'         // 开关组件，只读状态
  | 'rate'           // 星级评分显示
  | 'progress'       // 进度条显示
  | 'custom';        // 自定义渲染函数

/**
 * 操作按钮配置接口
 * 用于配置表格行操作按钮的属性和行为
 */
export interface ActionConfig {
  /** 按钮唯一标识符 */
  key: string;
  /** 按钮显示文字 */
  label: string;
  /** 按钮类型，影响样式 */
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  /** 是否为危险按钮（红色样式） */
  danger?: boolean;
  /** 是否禁用，支持函数动态判断 */
  disabled?: boolean | ((record: any) => boolean);
  /** 按钮图标名称，对应 iconMap 中的键 */
  icon?: string;
  /** 按钮点击事件处理函数 */
  onClick: (record: any, index: number) => void;
  /** 是否显示按钮，支持函数动态判断 */
  visible?: boolean | ((record: any) => boolean);
}

/**
 * 状态配置接口
 * 用于 status 类型列的状态映射配置
 */
export interface StatusConfig {
  /** 状态值，用于匹配数据中的值 */
  value: any;
  /** 状态颜色，支持 Ant Design 预设颜色 */
  color: string;
  /** 状态显示文字 */
  text: string;
}

/**
 * 标签配置接口
 * 用于 tag 类型列的标签映射配置
 */
export interface TagConfig {
  /** 标签值，用于匹配数据中的值 */
  value: any;
  /** 标签颜色，可选，支持 Ant Design 预设颜色 */
  color?: string;
  /** 标签显示文字 */
  text: string;
}

/**
 * 表格列配置接口
 * 定义表格列的所有配置选项，包括显示、渲染、交互等
 */
export interface ColumnConfig {
  // ==================== 基础配置 ====================
  /** 列的唯一标识符，必须唯一 */
  key: string;
  /** 列头显示标题 */
  title: string;
  /** 数据字段名，对应数据源中的字段 */
  dataIndex: string;
  /** 列宽度，可以是数字（像素）或字符串（百分比） */
  width?: number | string;
  /** 列固定位置，左固定或右固定 */
  fixed?: 'left' | 'right';
  /** 列内容对齐方式 */
  align?: 'left' | 'center' | 'right';
  
  // ==================== 渲染配置 ====================
  /** 列渲染类型，决定数据如何显示 */
  renderType?: ColumnRenderType;
  
  // ==================== 排序和筛选 ====================
  /** 是否支持排序 */
  sortable?: boolean;
  /** 是否支持筛选 */
  filterable?: boolean;
  /** 筛选选项配置 */
  filters?: Array<{ text: string; value: any }>;
  
  // ==================== 特定渲染类型的配置 ====================
  /** 日期格式化字符串，用于 date 类型 */
  dateFormat?: string;
  /** 货币符号，用于 currency 类型 */
  currencySymbol?: string;
  /** 数值精度，用于 currency、percent 类型 */
  precision?: number;
  /** 状态映射配置，用于 status 类型 */
  statusConfig?: StatusConfig[];
  /** 标签映射配置，用于 tag 类型 */
  tagConfig?: TagConfig[];
  /** 操作按钮配置，用于 actions 类型 */
  actions?: ActionConfig[];
  /** 图片尺寸，用于 image、avatar 类型 */
  imageSize?: number;
  /** 链接打开方式，用于 link 类型 */
  linkTarget?: '_blank' | '_self';
  
  // ==================== 自定义渲染 ====================
  /** 自定义渲染函数，优先级最高 */
  render?: (value: any, record: any, index: number) => React.ReactNode;
  
  // ==================== 原生属性扩展 ====================
  /** Ant Design 原生列属性，用于扩展功能 */
  columnProps?: Omit<ColumnType<any>, 'key' | 'title' | 'dataIndex' | 'render'>;
}

/**
 * 表格工具栏配置接口
 * 定义表格顶部工具栏的显示和功能配置
 */
export interface ToolbarConfig {
  /** 是否显示刷新按钮 */
  showRefresh?: boolean;
  /** 是否显示列设置按钮（显示/隐藏列） */
  showColumnSetting?: boolean;
  /** 是否显示密度设置按钮（紧凑/默认/宽松） */
  showDensity?: boolean;
  /** 是否显示全屏按钮 */
  showFullscreen?: boolean;
  /** 工具栏标题 */
  title?: string;
  /** 额外的工具栏内容，如操作按钮 */
  extra?: React.ReactNode;
}

/**
 * 动态表格配置接口
 * 定义动态表格组件的完整配置选项
 */
export interface DynamicTableConfig {
  // ==================== 数据配置 ====================
  /** 列配置数组，定义表格的列结构和渲染方式 */
  columns: ColumnConfig[];
  /** 行数据的唯一标识字段名或获取函数 */
  rowKey?: string | ((record: any) => string);
  
  // ==================== 分页配置 ====================
  /** 分页配置，设为 false 则不显示分页 */
  pagination?: false | TablePaginationConfig;
  
  // ==================== 行选择配置 ====================
  /** 行选择配置，支持单选和多选 */
  rowSelection?: {
    /** 选择类型：复选框或单选框 */
    type?: 'checkbox' | 'radio';
    /** 当前选中的行 key 数组 */
    selectedRowKeys?: React.Key[];
    /** 选中项发生变化时的回调 */
    onChange?: (selectedRowKeys: React.Key[], selectedRows: any[]) => void;
    /** 选中/取消选中某行的回调 */
    onSelect?: (record: any, selected: boolean, selectedRows: any[], nativeEvent: Event) => void;
    /** 全选/取消全选的回调 */
    onSelectAll?: (selected: boolean, selectedRows: any[], changeRows: any[]) => void;
    /** 选择框的默认属性配置 */
    getCheckboxProps?: (record: any) => { disabled?: boolean; name?: string };
  };
  
  // ==================== 工具栏配置 ====================
  /** 表格工具栏配置 */
  toolbar?: ToolbarConfig;
  
  // ==================== 表格样式 ====================
  /** 表格尺寸 */
  size?: 'large' | 'middle' | 'small';
  /** 是否显示边框 */
  bordered?: boolean;
  /** 是否显示表头 */
  showHeader?: boolean;
  
  // ==================== 状态配置 ====================
  /** 加载状态 */
  loading?: boolean;
  /** 空数据时的显示文字 */
  emptyText?: string;
  
  // ==================== 事件回调 ====================
  /** 分页、排序、筛选变化时触发 */
  onChange?: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
    extra: { currentDataSource: any[]; action: 'paginate' | 'sort' | 'filter' }
  ) => void;
  
  /** 设置行属性 */
  onRow?: (record: any, index?: number) => React.HTMLAttributes<any>;
  
  // ==================== 原生属性扩展 ====================
  /** Ant Design 原生表格属性，用于扩展功能 */
  tableProps?: Omit<TableProps<any>, 
    'columns' | 'dataSource' | 'rowKey' | 'pagination' | 'rowSelection' | 
    'loading' | 'size' | 'bordered' | 'showHeader' | 'onChange' | 'onRow'
  >;
}

/**
 * 动态表格组件 Props 接口
 * 定义动态表格组件的输入属性
 */
export interface DynamicTableProps {
  /** 表格配置对象，包含列定义、样式、行为等所有配置 */
  config: DynamicTableConfig;
  /** 表格数据源，数组格式 */
  dataSource: any[];
  /** 组件的 CSS 类名 */
  className?: string;
  /** 组件的内联样式 */
  style?: React.CSSProperties;
}
