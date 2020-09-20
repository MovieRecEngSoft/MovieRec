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
    <div className="row">
      
      <div className="col">
        <img className="avatar" src={props.avatar} />
      </div>
      <div className="col">
        <h5>
          <div className="row space">
            <div>
              <span>Review by </span>{" "}
              <strong className="reviewer">{props.author}</strong>
            </div>
            <div className="likes">
              <p>522</p>
              <LikeOutlined className="like-button" />
            </div>
          </div>
        </h5>
        <p className={reviewClassName}>{props.text}</p>
      </div>
    </div>
    </>
  );
}

export default Review;