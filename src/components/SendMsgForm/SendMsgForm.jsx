// src/App.js
import React from 'react';
import {Button, Form, Input} from 'antd';

const SendMsgForm = ({onFormSubmit = () => {}, isReady = false}) => {
  const [form] = Form.useForm();

  const handleSubmit = values => {
    form.setFieldsValue({title: '', body: ''});
    onFormSubmit(values);
  };

  return (
    <Form
      form={form}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={handleSubmit}
      onFinishFailed={() => {}}
      autoComplete="off">
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            message: 'Please input title',
            required: true,
          },
          {min: 1, message: 'Enter at least 1 character'},
          {max: 50, message: 'Too long'},
        ]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Text"
        name="body"
        rules={[
          {
            message: 'Please input text',
            required: true,
          },
          {min: 1, message: 'Enter at least 1 character'},
          {max: 200, message: 'Too long'},
        ]}>
        <Input.TextArea rows={8} style={{resize: 'none'}} />
      </Form.Item>

      <Form.Item label={null} style={{display: 'flex', justifyContent: 'center'}}>
        <Button type="primary" htmlType="submit" size="large" disabled={!isReady}>
          Send
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SendMsgForm;
