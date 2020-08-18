import React from "react";

import "./styles.css";

function Button({ name }) {
  return (
    <div className="button">
      <div>{name}</div>
    </div>
  );
};

export default Button;
