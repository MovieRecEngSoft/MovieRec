import React from 'react';
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";

import './styles.css';

function Arrow({value}){
    return (
      <button>
        {value == ">" ? (
          <RightCircleOutlined className="arrow" />
        ) : (
          <LeftCircleOutlined className="arrow"  />
        )}
      </button>
    );
}

export default Arrow;