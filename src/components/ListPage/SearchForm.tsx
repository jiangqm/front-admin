import React, { useMemo } from 'react';
import { DynamicForm } from '@/components/DynamicForm';
import type { FormInstance } from 'antd';
import type { SearchConfig } from './types';
import type { DynamicFormConfig, FormFieldConfig } from '@/components/DynamicForm';

interface SearchFormProps {
  config: SearchConfig;
  form: FormInstance;
  initialValues?: Record<string, unknown>;
  onSearch: (values: Record<string, unknown>) => void;
  onReset: () => void;
}


export const SearchForm: React.FC<SearchFormProps> = ({
  config,
  form,
  initialValues,
}) => {
  const {
    fields,
    layout = 'horizontal',
    labelCol,
    wrapperCol,
    gutter = [16, 8],
    onValuesChange,
  } = config;

  // 直接使用动态表单配置，将 SearchFieldConfig 当作 FormFieldConfig 使用
  const dynamicFormConfig: DynamicFormConfig = useMemo(() => {
    return {
      name: 'searchForm',
      layout,
      labelCol,
      wrapperCol,
      gutter,
      fields: fields as FormFieldConfig[], // 直接使用，类型基本兼容
      showSubmit: false, // 搜索表单不使用内置按钮
      showReset: false,
      onValuesChange,
    };
  }, [fields, layout, labelCol, wrapperCol, gutter, onValuesChange]);

  // 处理内联布局时的字段配置
  const processFieldsForInline = (fields: FormFieldConfig[]): FormFieldConfig[] => {
    return fields.map(field => ({
      ...field,
      // 内联布局时不显示标签，将标签内容作为占位符
      placeholder: field.placeholder || `请输入${field.label}`,
    }));
  };

  // 根据布局调整表单配置
  const finalFormConfig: DynamicFormConfig = useMemo(() => {
    const isInlineLayout = layout === 'inline';
    
    return {
      ...dynamicFormConfig,
      layout: isInlineLayout ? 'inline' : layout,
      fields: isInlineLayout ? processFieldsForInline(dynamicFormConfig.fields) : dynamicFormConfig.fields,
      gutter: isInlineLayout ? [0,0] : gutter,
    };
  }, [dynamicFormConfig, layout, gutter]);

  return (
    <>
      <style>{`
        .search-form-no-radius .ant-input,
        .search-form-no-radius .ant-select .ant-select-selector,
        .search-form-no-radius .ant-picker,
        .search-form-no-radius .ant-input-number,
        .search-form-no-radius .ant-cascader-picker {
          border-radius: 0 !important;
        }
        .search-form-no-radius .ant-select-dropdown {
          border-radius: 0 !important;
        }
      `}</style>
      <div style={{ marginBottom: 0 }}>
        {/* 使用栅格布局的搜索表单，不显示按钮 */}
        <div className="search-form-no-radius">
          <DynamicForm
            config={{
              ...finalFormConfig,
              layout: 'horizontal', // 使用水平布局而不是内联
              labelCol: { span: 0 }, // 不显示标签列
              wrapperCol: { span: 24 }, // 输入框占满整列
              gutter: [8,0], // 设置栅格间距
              showSubmit: false,
              showReset: false,
            }}
            initialValues={initialValues}
            form={form}
          />
        </div>
      </div>
    </>
  );
};
