import React from "react";

import "./styles.css";

function Input({ label, placeholder, type, name, ...rest }) {
  return (
    <div className="input-block">
      <input placeholder={placeholder} type={type} id={name} {...rest} />
    </div>
  );
};

export default Input;
