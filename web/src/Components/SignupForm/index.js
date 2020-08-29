import React from "react";
import { Form } from "antd";

import "./styles.css";
import Input from "../Input";
import Button from "../Button";
import { Link } from "react-router-dom";

const SignupForm = ({title}) => {
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
            <h1 className="form-title">{title}</h1>
            <Input name="name" placeholder="Name" />

            <Input name="email" placeholder="Email" />

            <Input name="password" type="password" placeholder="Password" />

            <Input
              name="c-password"
              type="password"
              placeholder="Confirm Password"
            />

            <Button type="button" htmlType="submit" name="Register" />

            <p>
              Already a member? <Link to="/login">Login</Link>
            </p>
          </Form>
        </div>
      </>
    );
};

export default SignupForm;
