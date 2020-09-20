import React from 'react';
import { Link } from "react-router-dom";
import { LikeOutlined, DeleteOutlined } from "@ant-design/icons";
import './styles.css';

function Review(props) {
  let reviewClassName = 'review-text';
  let likesClassName = 'likes';
  
  if(props.type == "review-item"){
    reviewClassName += ' review-item';
    likesClassName += ' right-like';
  }

  function deleteReview(reviewId){
    fetch("http://localhost:3333/review", {
      method: "DELETE",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reviewId: reviewId,
      }),
    });
    window.location.reload(false);
  }
  
  function like(reviewId){
    fetch("http://localhost:3333/review/like", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reviewId: reviewId,
      }),
    });
    window.location.reload(false);
  }

  return (
    <>
      <div className="row">
        <div className="col">
          <Link to={"/profile/activity/"+props.userId}>
            <img className="avatar" src={props.avatar} />
          </Link>
        </div>
        <div className="col">
          <div className="row">
            <div>
              <h5>
                <span>Review by </span>{" "}
                <Link to={"/profile/activity/"+props.userId}>
                  <strong className="reviewer">{props.author}</strong>
                </Link>
              </h5>
            </div>
            <div className={likesClassName}>
              {props.userId == sessionStorage.getItem("_id") && (
                <DeleteOutlined
                  onClick={() => deleteReview(props.reviewId)}
                  className="delete-button"
                />
              )}
              <p>{props.likes}</p>
              <LikeOutlined
                className="like-button"
                onClick={() => like(props.reviewId)}
              />
            </div>
          </div>
          <p className={reviewClassName}>{props.text}</p>
        </div>
      </div>
    </>
  );
}

export default Review;