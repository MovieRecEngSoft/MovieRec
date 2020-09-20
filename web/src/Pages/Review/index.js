import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link, useParams } from "react-router-dom";

import Menu from '../../Components/Menu';
import Card from '../../Components/Card';
import Input from '../../Components/Input';
import ReviewItem from '../../Components/Review';
import Comment from '../../Components/Comment';
import getImageAddress from "../../assets/utils/getImageAddress";

import './styles.css';

function Review(){
  let { id } = useParams();

  function addComment(reviewId) {
    fetch(`http://localhost:3333/review/comment`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reviewId: reviewId,
        text: input,
      }),
    });
    window.location.reload(false);
  }

  const [review, setReview] = useState([]);
  useEffect(() => {
    const fetchReview = async () => {
      try {
        let reviewAux = {};
        let API_URL = `http://localhost:3333`;

        const result = await axios.get(`${API_URL}/review/?reviewId=${id}`);
        reviewAux = result.data;

        setReview(reviewAux);
      } catch (error) {}
    };

    fetchReview();
  }, []);

  if (!review.comments) review.comments = [];
  
  const image = getImageAddress("/HORpg5CSkmeQlAolx3bKMrKgfi.jpg");



  const [input, setInput] = useState("");

  return (
    <>
      <Menu />
      <div className="wrapper">
        <div className="info-block">
          <div className="row">
            <div className="review-leftcolumn">
              <div className="row">
                <Card>
                  <h2 className="film-title">
                    <strong>Skyfall - 007</strong>
                  </h2>
                  <br />

                  <ReviewItem
                    className="review-text"
                    text={review.text}
                    likes={review.likes}
                    author={review.username}
                    avatar={
                      !review.userImgUrl
                        ? "https://simpleicon.com/wp-content/uploads/user1.png"
                        : review.userImgUrl
                    }
                  />
                  <br />
                </Card>
              </div>
              <br />
              <h1 className="title-separator">Comments</h1>
              <Card>
                <div className="comment-session">
                  <Input
                    className="add-comment-input"
                    value={input}
                    onInput={(e) => setInput(e.target.value)}
                  />
                  <button
                    className="add-comment-button"
                    name="Add comment"
                    onClick={() => addComment(id)}
                  >
                    Add comment
                  </button>
                </div>
              </Card>

              {review.comments
                .slice(0)
                .reverse()
                .map((comment, index) => {
                  return (
                    <Card>
                      <Comment
                        text={comment.text}
                        author={comment.username}
                        avatar={
                          !review.userImgUrl
                            ? "https://simpleicon.com/wp-content/uploads/user1.png"
                            : review.userImgUrl}
                      />
                    </Card>
                  );
                })}
              <br />
            </div>
            <div className="review-rightcolumn">
              <img className="cover" src={image} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Review;