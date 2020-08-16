import React from "react";
import { Form, Input, InputNumber, Button, DatePicker } from "antd";

import "./styles.css";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const validateMessages = {
    required: "${label} is required!",
    types: {
        email: "${label} is not validate email!",
        number: "${label} is not a validate number!",
    },
    number: {
        range: "${label} must be between ${min} and ${max}",
    },
};

const RegisterForm = () => {
    const layout = {
        labelCol: {
        span: 8,
        },
        wrapperCol: {
        span: 16,
        },
    };

    const validateMessages = {
        required: "${label} is required!",
        types: {
            email: "${label} is not validate email!",
            number: "${label} is not a validate number!",
        },
        number: {
            range: "${label} must be between ${min} and ${max}",
        },
    };

    const onFinish = (values) => {
        console.log(values);
    };

    return (
      <div className="content">
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["user", "name"]}
            label="Name"
            rules={[
                {
                    required: true,
                },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["user", "email"]}
            label="Email"
            rules={[
                {
                    required: true,
                    type: "email",
                },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name={["user", "age"]}
            label="Age"
            rules={[
                {
                    type: "number",
                    min: 0,
                    max: 99,
                },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item name={["user", "birth"]} label="Birth">
            <DatePicker />
          </Form.Item>

          <Form.Item name={["user", "avatar"]} label="Avatar">
            <Input />
          </Form.Item>

          <Form.Item name={["user", "aboutme"]} label="About me">
            <Input.TextArea />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
};

export default RegisterForm;
