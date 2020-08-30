import React from 'react';
import Card from '../Card';

function Comment(props){
    return (
      <>
        <div className="row">
          <img className="avatar" src={props.avatar} />
          <h5>
            <strong>{props.author}</strong>
          </h5>
        </div>
        <div className="row">
          <p className="review-text">{props.text}</p>
        </div>
      </>
    );
}

export default Comment;