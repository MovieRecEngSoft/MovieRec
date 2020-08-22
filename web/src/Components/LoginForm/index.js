import React from "react";
import { Form, Checkbox } from "antd";
import { Link } from 'react-router-dom';

import "./styles.css";
import Input from "../Input";
import Button from "../Button";

const LoginForm = ({title}) => {
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
      <>
        <div className="content">
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <h1>{title}</h1>

            <Input name="email" placeholder="Email" />

            <Input name="password" type="password" placeholder="Password" />

            <Checkbox className="remember-me">Remember me</Checkbox>

            <Button type="button" htmlType="submit" name="Login" />

            <p>
              Not a member yet? <Link to="/signup">Register</Link>
            </p>
          </Form>
        </div>
      </>
    );
};

export default LoginForm;
