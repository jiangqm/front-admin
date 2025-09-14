import React, { useEffect, useMemo } from 'react';
import { Form, Row, Col, Button, Space } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { FieldRenderer } from './FieldRenderer';
import type { DynamicFormProps, FormFieldConfig } from './types';

export const DynamicForm: React.FC<DynamicFormProps> = ({
  config,
  initialValues,
  loading = false,
  className,
  style,
  form: externalForm,
}) => {
  const [internalForm] = Form.useForm();
  const form: FormInstance = externalForm || internalForm;

  const {
    name,
    layout = 'vertical',
    labelCol,
    wrapperCol,
    fields,
    submitText = '提交',
    resetText = '重置',
    showSubmit = true,
    showReset = true,
    gutter = [16, 16],
    onFinish,
    onFinishFailed,
    onValuesChange,
  } = config;

  // 设置初始值
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [form, initialValues]);

  // 处理条件显示的字段
  const visibleFields = useMemo(() => {
    return fields.filter(field => {
      if (field.hidden) return false;
      
      // 如果有条件显示逻辑
      if (field.condition && field.dependencies) {
        const formValues = form.getFieldsValue();
        return field.condition(formValues);
      }
      
      return true;
    });
  }, [fields, form]);

  // 监听表单值变化，用于条件显示
  const handleValuesChange = (changedValues: Record<string, unknown>, allValues: Record<string, unknown>) => {
    // 触发重新渲染以处理条件显示
    form.setFieldsValue(allValues);
    
    if (onValuesChange) {
      onValuesChange(changedValues, allValues);
    }
  };

  // 渲染单个字段
  const renderField = (field: FormFieldConfig) => {
    const {
      name,
      label,
      required,
      rules = [],
      defaultValue,
      span = 24,
      offset = 0,
      dependencies = [],
    } = field;

    // 构建验证规则
    const fieldRules = [...rules];
    if (required && !fieldRules.some(rule => typeof rule === 'object' && rule !== null && 'required' in rule && rule.required)) {
      fieldRules.unshift({ required: true, message: `请输入${label}` });
    }

    return (
      <Col key={name} span={span} offset={offset}>
        <Form.Item
          name={name}
          label={layout === 'inline' || (labelCol?.span === 0) ? undefined : label} // 内联布局或标签列为0时不显示标签
          rules={fieldRules}
          initialValue={defaultValue}
          dependencies={dependencies}
          style={{ marginBottom: layout === 'inline' ? 4 : 16 }}
        >
          <FieldRenderer field={field} form={form} />
        </Form.Item>
      </Col>
    );
  };

  return (
    <Form
      form={form}
      name={name}
      layout={layout}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onValuesChange={handleValuesChange}
      className={className}
      style={style}
      autoComplete="off"
    >
      <Row gutter={gutter}>
        {visibleFields.map(renderField)}
      </Row>

      {/* 操作按钮 */}
      {(showSubmit || showReset) && (
        <Form.Item>
          <Space>
            {showSubmit && (
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
              >
                {submitText}
              </Button>
            )}
            {showReset && (
              <Button 
                htmlType="button" 
                onClick={() => form.resetFields()}
              >
                {resetText}
              </Button>
            )}
          </Space>
        </Form.Item>
      )}
    </Form>
  );
};
