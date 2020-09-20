import React from "react";
import LoginForm from "../../Components/LoginForm";

import './styles.css';
import Main from "../../Components/Main";
import Menu from "../../Components/Menu";

function Login() {
  return (
    <>
      {/* <Menu /> */}
      <Main background="https://i.pinimg.com/564x/4c/86/60/4c86600a82bb109d4e9ae48c993d73a0.jpg">
        <div className="page-register">
          <LoginForm title="Login" />
        </div>
      </Main>
    </>
  );
}

export default Login;
