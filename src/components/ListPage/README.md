# ListPage 通用列表页面组件

一个基于 Ant Design 的通用列表页面组件，支持通过 JSON 配置快速构建包含搜索表单和数据表格的列表页面。

## 特性

- 🔍 **灵活的搜索表单** - 支持多种字段类型和布局
- 📊 **强大的数据表格** - 基于 DynamicTable 组件
- 🛠️ **可配置工具栏** - 支持自定义操作按钮
- 🎨 **响应式布局** - 适配不同屏幕尺寸
- 📝 **完整的 TypeScript 支持** - 类型安全
- ⚡ **开箱即用** - 最小化配置即可使用

## 基础用法

```tsx
import { ListPage } from '@/components/ListPage';
import type { ListPageConfig } from '@/components/ListPage';

const config: ListPageConfig = {
  searchConfig: {
    fields: [
      {
        name: 'name',
        label: '姓名',
        type: 'input',
        span: 6,
      },
      {
        name: 'status',
        label: '状态',
        type: 'select',
        span: 6,
        options: [
          { label: '活跃', value: 'active' },
          { label: '非活跃', value: 'inactive' },
        ],
      },
    ],
    onSearch: (values) => console.log('搜索:', values),
    onReset: () => console.log('重置'),
  },
  tableConfig: {
    columns: [
      {
        key: 'name',
        title: '姓名',
        dataIndex: 'name',
        renderType: 'text',
      },
      {
        key: 'status',
        title: '状态',
        dataIndex: 'status',
        renderType: 'tag',
        tagConfig: [
          { value: 'active', text: '活跃', color: 'green' },
          { value: 'inactive', text: '非活跃', color: 'red' },
        ],
      },
    ],
    rowKey: 'id',
  },
};

<ListPage
  config={config}
  dataSource={data}
  loading={loading}
  onSearchChange={(values) => setSearchParams(values)}
/>
```

## 搜索字段类型

### 基础字段

- `input` - 输入框
- `textarea` - 多行文本
- `select` - 下拉选择
- `multiSelect` - 多选下拉
- `number` - 数字输入

### 日期时间字段

- `datePicker` - 日期选择器
- `dateRange` - 日期范围选择器
- `timePicker` - 时间选择器

### 选择字段

- `radio` - 单选按钮组
- `checkbox` - 多选框组
- `switch` - 开关
- `cascader` - 级联选择
- `treeSelect` - 树选择

### 自定义字段

```tsx
{
  name: 'customField',
  label: '自定义字段',
  type: 'custom',
  render: (form) => (
    <CustomComponent />
  ),
}
```

## 配置选项

### SearchConfig

```tsx
interface SearchConfig {
  fields: SearchFieldConfig[];           // 搜索字段配置
  layout?: 'horizontal' | 'vertical';    // 表单布局
  gutter?: [number, number];             // 栅格间距
  showSearchButton?: boolean;            // 显示搜索按钮
  showResetButton?: boolean;             // 显示重置按钮
  searchButtonText?: string;             // 搜索按钮文字
  resetButtonText?: string;              // 重置按钮文字
  onSearch?: (values) => void;           // 搜索回调
  onReset?: () => void;                  // 重置回调
}
```

### ToolbarConfig

```tsx
interface ToolbarConfig {
  title?: string;                        // 标题
  showRefresh?: boolean;                 // 显示刷新按钮
  extra?: ReactNode;                     // 额外内容
  onRefresh?: () => void;                // 刷新回调
}
```

## 高级用法

### 自定义工具栏

```tsx
const config: ListPageConfig = {
  toolbarConfig: {
    title: '用户管理',
    showRefresh: true,
    extra: (
      <Space>
        <Button type="primary" icon={<PlusOutlined />}>
          新增用户
        </Button>
        <Button icon={<DownloadOutlined />}>
          导出
        </Button>
      </Space>
    ),
    onRefresh: () => {
      // 刷新逻辑
    },
  },
};
```

### 搜索表单联动

```tsx
const config: ListPageConfig = {
  searchConfig: {
    fields: [
      {
        name: 'province',
        label: '省份',
        type: 'select',
        options: provinces,
      },
      {
        name: 'city',
        label: '城市',
        type: 'select',
        // 根据省份动态加载城市
        options: cities.filter(city => city.provinceId === selectedProvince),
      },
    ],
    onValuesChange: (changedValues, allValues) => {
      if (changedValues.province) {
        // 省份改变时清空城市
        form.setFieldsValue({ city: undefined });
      }
    },
  },
};
```

## 最佳实践

1. **合理设置 span** - 根据字段数量调整栅格占位
2. **使用 allowClear** - 为选择类字段启用清除功能
3. **适当的 placeholder** - 提供清晰的输入提示
4. **表单验证** - 在具体业务组件中处理表单验证
5. **状态管理** - 合理管理搜索参数和表格数据状态

## API

### ListPage Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| config | ListPageConfig | - | 页面配置 |
| dataSource | any[] | - | 表格数据 |
| loading | boolean | false | 加载状态 |
| searchValues | Record<string, any> | {} | 搜索表单初始值 |
| onSearchChange | (values) => void | - | 搜索变化回调 |
| className | string | - | CSS 类名 |
| style | CSSProperties | - | 内联样式 |
