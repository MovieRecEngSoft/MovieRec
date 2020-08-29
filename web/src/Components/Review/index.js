import React from 'react';

import './styles.css';
import getYouTubeId from '../../assets/utils/getYouTubeId';

function Review(props) {

  return (
    <>
      <div className="row">
          <img className="avatar" src={props.avatar} />
          <h5>Review by <strong>{props.author}</strong></h5>
        </div>
        <div className="row">
          <p className="review-text">
            {props.text}
          </p>
        </div>
    </>
  );
}

export default Review;