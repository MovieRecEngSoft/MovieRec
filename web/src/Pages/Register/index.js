import React from "react";
import SignupForm from "../../Components/SignupForm";

import './styles.css';

function Register() {
  return (
    <>
      <div className="bg-image">
        <div className="page-register">
          <SignupForm title="Sign Up" />
        </div>
      </div>
    </>
  );
}

export default Register;
