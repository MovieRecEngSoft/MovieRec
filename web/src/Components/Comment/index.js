import React from 'react';
import Card from '../Card';

function Comment(props){
    return (
      <>
        <div className="row">
          <div className="col">
            <img className="avatar" src={props.avatar} />
          </div>
          <div className="col">
            <h5>
              <strong>{props.author}</strong>
            </h5>
            <p className="review-text">{props.text}</p>
          </div>
        </div>
      </>
    );
}

export default Comment;