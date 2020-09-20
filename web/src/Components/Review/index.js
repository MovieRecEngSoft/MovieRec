import React from 'react';

import { LikeOutlined, FullscreenOutlined } from "@ant-design/icons";
import './styles.css';
import { Link } from 'react-router-dom';

function Review(props) {
  let reviewClassName = 'review-text';
  if(props.type == "review-item"){
    reviewClassName += ' review-item';
  }

  return (
    <>
      <div className="row">
        <div className="col">
          <Link to={"/profile/activity?id=" + props.userId}>
            <img className="avatar" src={props.avatar} />
          </Link>
        </div>
        <div className="col">
          <h5>
            <div className="row space">
              <div>
                <span>Review by </span>{" "}
                <Link to={"/profile/activity?id=" + props.userId}>
                  <strong className="reviewer">{props.author}</strong>
                </Link>
              </div>
              <div className="likes">
                <p>{props.likes}</p>
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