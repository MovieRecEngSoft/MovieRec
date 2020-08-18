import React from "react";

import "./styles.css";

function Input({ label, name, ...rest }) {
  return (
    <div className="input-block">
      <input type="text" id={name} {...rest} />
    </div>
  );
};

export default Input;
