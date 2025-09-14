import React from 'react';
import {
  Input,
  Select,
  Radio,
  Checkbox,
  Switch,
  DatePicker,
  TimePicker,
  InputNumber,
  Rate,
  Slider,
  Upload,
  Button,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { FormFieldConfig } from './types';

const { TextArea, Password } = Input;
const { Option } = Select;
const { Group: RadioGroup } = Radio;
const { Group: CheckboxGroup } = Checkbox;
const { RangePicker } = DatePicker;

interface FieldRendererProps {
  field: FormFieldConfig;
  form?: any;
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({ field, form }) => {
  const {
    type,
    placeholder,
    disabled,
    options = [],
    componentProps = {},
    maxLength,
    min,
    max,
    step,
  } = field;

  // 如果有自定义渲染函数，优先使用
  if (field.render) {
    return field.render(field, form);
  }

  // 构建通用属性
  const commonProps = {
    placeholder: placeholder || `请输入${field.label}`,
    disabled,
    ...componentProps,
  };

  switch (type) {
    case 'input':
      return (
        <Input
          {...commonProps}
          maxLength={maxLength}
        />
      );

    case 'textarea':
      return (
        <TextArea
          {...commonProps}
          maxLength={maxLength}
          rows={4}
          showCount
        />
      );

    case 'password':
      return (
        <Password
          {...commonProps}
          maxLength={maxLength}
        />
      );

    case 'number':
      return (
        <InputNumber
          {...commonProps}
          min={min}
          max={max}
          step={step}
          style={{ width: '100%' }}
        />
      );

    case 'select':
      return (
        <Select
          {...commonProps}
          placeholder={placeholder || `请选择${field.label}`}
        >
          {options.map((option) => (
            <Option 
              key={option.value} 
              value={option.value} 
              disabled={option.disabled}
            >
              {option.label}
            </Option>
          ))}
        </Select>
      );

    case 'multiSelect':
      return (
        <Select
          {...commonProps}
          mode="multiple"
          placeholder={placeholder || `请选择${field.label}`}
        >
          {options.map((option) => (
            <Option 
              key={option.value} 
              value={option.value} 
              disabled={option.disabled}
            >
              {option.label}
            </Option>
          ))}
        </Select>
      );

    case 'radio':
      return (
        <RadioGroup {...commonProps}>
          {options.map((option) => (
            <Radio 
              key={option.value} 
              value={option.value} 
              disabled={option.disabled}
            >
              {option.label}
            </Radio>
          ))}
        </RadioGroup>
      );

    case 'checkbox':
      return (
        <CheckboxGroup
          {...commonProps}
          options={options.map(opt => ({
            label: opt.label,
            value: opt.value,
            disabled: opt.disabled,
          }))}
        />
      );

    case 'switch':
      return (
        <Switch
          {...commonProps}
          checkedChildren="开"
          unCheckedChildren="关"
        />
      );

    case 'datePicker':
      return (
        <DatePicker
          {...commonProps}
          placeholder={placeholder || `请选择${field.label}`}
          style={{ width: '100%' }}
        />
      );

    case 'dateRange':
      return (
        <RangePicker
          {...commonProps}
          placeholder={['开始日期', '结束日期']}
          style={{ width: '100%' }}
        />
      );

    case 'timePicker':
      return (
        <TimePicker
          {...commonProps}
          placeholder={placeholder || `请选择${field.label}`}
          style={{ width: '100%' }}
        />
      );

    case 'rate':
      return (
        <Rate
          {...commonProps}
          count={max || 5}
        />
      );

    case 'slider':
      return (
        <Slider
          {...commonProps}
          min={min || 0}
          max={max || 100}
          step={step || 1}
        />
      );

    case 'upload':
      return (
        <Upload
          {...commonProps}
          action="/api/upload" // 可以通过 componentProps 覆盖
          listType="text"
        >
          <Button icon={<UploadOutlined />}>点击上传</Button>
        </Upload>
      );

    default:
      return (
        <Input
          {...commonProps}
          placeholder={`不支持的字段类型: ${type}`}
          disabled
        />
      );
  }
};
