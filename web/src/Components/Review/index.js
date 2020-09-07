import React from 'react';

import { LikeOutlined, FullscreenOutlined } from "@ant-design/icons";
import './styles.css';

function Review(props) {
  let reviewClassName = 'review-text';
  if(props.type == "review-item"){
    reviewClassName += ' review-item';
  }

  return (
    <>
      <div className="row review-header">
        <div className="row">
          <img className="avatar" src={props.avatar} />
          <h5>
            Review by <strong>{props.author}</strong>
          </h5>
        </div>
        <div className="likes">
          <p>522</p>
          <LikeOutlined className="like-button" />
        </div>
      </div>
      
      <div className="row">
        <p className={reviewClassName}>{props.text}</p>
      </div>
    </>
  );
}

export default Review;