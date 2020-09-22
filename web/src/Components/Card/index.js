import React from 'react';

import "./styles.css";

function Card(props){
    return (
      <div className="card" id={props.id}>
        {props.children}
      </div>
    );
}

export default Card;
