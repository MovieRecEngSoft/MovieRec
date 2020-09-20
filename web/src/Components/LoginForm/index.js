import React, { useState } from "react";
import axios from "axios";

import { Form, Checkbox } from "antd";
import { Link } from 'react-router-dom';

import "./styles.css";
import Input from "../Input";
import Button from "../Button";

const LoginForm = (props) => {

  const [email, setEmail] = useState("nm");
    const [password, setPassword] = useState("pss");

    // const onFinish = (values) => {
    //     console.log(values);
    // };

    const HandleLogin = () => {
      let API_URL = 'http://localhost:3333/login';
      axios.post(API_URL, {
        username: email,
        password: password
      })
      .then(response => {
        if (response.status == 200) {
          //NICE
          // this.props.history.push('/');
        } else {
          const error = new Error(response.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error logging in. Please try again');
      });

    }

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

    return (
      <>
        <div className="content">
          <Form
            {...layout}
            name="nest-messages"
            // onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <h1 className="form-title">{props.title}</h1>

            <Input name="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>

            <Input name="password" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>

            <Checkbox className="remember-me">Remember me</Checkbox>

            <button
              className="button"
              type="button"
              onClick={HandleLogin}
              htmlType="submit"
              name="Login"
            >Login</button>

            <p>
              Not a member yet? <Link to="/signup">Register</Link>
            </p>
          </Form>
        </div>
      </>
    );
};

export default LoginForm;
