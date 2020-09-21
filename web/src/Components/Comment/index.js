import React from 'react';
import Card from '../Card';
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';

function Comment(props){
  function deleteComment(commentId, reviewId) {
    fetch("http://localhost:3333/review/comment", {
      method: "DELETE",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        commentId: commentId,
        reviewId: reviewId,
      }),
    })
      .then((response) => {
        window.location.reload(false);
      })
      .catch((response) => {
        // Error
      });
  }

  return (
    <>
      <div className="row">
        <div className="col">
          <Link to={"/profile/activity/" + props.userId}>
            <img className="avatar" src={props.avatar} />
          </Link>
        </div>
        <div className="col">
          <h5>
            <Link to={"/profile/activity/" + props.userId}>
              <strong className="reviewer">{props.author}</strong>
            </Link>
          </h5>
          <p className="review-text">{props.text}</p>
        </div>
      </div>
      {props.userId == sessionStorage.getItem("_id") && (
        <DeleteOutlined
          className="delete-button"
          onClick={() => deleteComment(props.commentId, props.reviewId)}
        />
      )}
    </>
  );
}

export default Comment;