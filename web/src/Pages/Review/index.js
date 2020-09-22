import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link, useLocation, useParams } from "react-router-dom";

import Menu from '../../Components/Menu';
import Card from '../../Components/Card';
import Input from '../../Components/Input';
import ReviewItem from '../../Components/Review';
import Comment from '../../Components/Comment';
import getImageAddress from "../../assets/utils/getImageAddress";
import checkIfUrlExists from "../../assets/utils/checkIfUrlExists";

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

  const location = useLocation()
  useEffect(()=> {
    if (location.hash) {
        let highlightedElement = document.getElementById(location.hash.slice(1))
        if (highlightedElement) {
            highlightedElement.classList.add("highlighted")
            highlightedElement.scrollIntoView({behavior: "smooth"})
        }
    }
  }, [review])

  if (!review.comments) review.comments = [];

  let image;
  if(review.moviePosterPath)
  image = checkIfUrlExists(getImageAddress(review.moviePosterPath))
    ? getImageAddress(review.moviePosterPath)
    : "https://pngimage.net/wp-content/uploads/2018/06/image-not-available-png-5.png";


  const [input, setInput] = useState("");
  console.log(review)
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
                    <strong>{review.movieTitle}</strong>
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
                    userId={review.userId}
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
                    <Card id={comment._id}>
                      <Comment
                        text={comment.text}
                        author={comment.username}
                        userId={comment.userId}
                        reviewId={id}
                        commentId={comment._id}
                        avatar={
                          !comment.userImgUrl
                            ? "https://simpleicon.com/wp-content/uploads/user1.png"
                            : comment.userImgUrl
                        }
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
