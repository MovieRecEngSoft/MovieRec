import React, { useState } from "react";
import { Form } from "antd";
import axios from "axios";

import { Link, Redirect, useHistory } from "react-router-dom";

import Input from "../Input";
import Button from "../Button";

import "./styles.css";

const SignupForm = ({title}) => {

  let history = useHistory()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const HandleRegister = () => {
    alert("No /singUp on Backend");
    let API_URL = 'http://localhost:3333/user';

    axios.post(API_URL, { name: name, email: email, password: password, confirmPassword: confirmPassword }, { withCredentials: true })
    .then(response => {
      if (response.status == 201) {
        //NICE
        history.push('/login');
      } else {
        const error = new Error(response.error);
        throw error;
      }
    })
    .catch(err => {console.error(err);alert('Error signing up. Please try again');});
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

    const onFinish = (values) => {
        console.log(values);
    };

    function shoot() {
      alert("Register!");
      console.log("Register!");
    }

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
            <Input name="name" placeholder="Name" onChange={e => setName(e.target.value)}/>

            <Input name="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>

            <Input name="password" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>

            <Input name="c-password" type="password" placeholder="Confirm Password" onChange={e => setConfirmPassword(e.target.value)}/>

            <button
              className="button"
              type="button"
              onClick={HandleRegister}
              htmlType="submit"
              name="Register"
            >Register
            </button>

            <p>
              Already a member? <Link to="/login">Login</Link>
            </p>
          </Form>
        </div>
      </>
    );
};

export default SignupForm;
