import React from "react";
import LoginForm from "../../Components/LoginForm";

import './styles.css';

function Login() {
  return (
    <>
      <div className="bg-image">
        <div className="page-register">
          <LoginForm title="Login" />
        </div>
      </div>
    </>
  );
}

export default Login;
