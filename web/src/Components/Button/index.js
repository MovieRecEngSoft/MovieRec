import React from "react";

import "./styles.css";

function Button({ name }) {
  return (
    <div className="button">
      <a>{name}</a>
    </div>
  );
};

export default Button;
