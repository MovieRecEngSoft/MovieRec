import React, { useEffect, useState } from "react";
import axios from "axios";

import Input from "../../Components/Input";
import Menu from "../../Components/Menu";
import getImageAddress from "../../assets/utils/getImageAddress";
import Card from "../../Components/Card";

import checkIfUrlExists from "../../assets/utils/checkIfUrlExists";

import { FullscreenOutlined } from "@ant-design/icons";

import './styles.css';
import Review from "../../Components/Review";
import { Link, useParams } from "react-router-dom";

function FilmDetails() {
  
  function addReview(movieId, score){
    fetch("http://localhost:3333/review", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movieId: movieId,
        score: score,
        text: input,
      }),
    });
    window.location.reload(false);
  }
    
  let { id } = useParams();
  
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        let movieAux = {};
        let API_URL = `http://localhost:3333`;
        
        const result = await axios.get(`${API_URL}/movie/?id=${id}`);
        movieAux = result.data;
        console.log(movieAux);
        
        setMovie(movieAux);
      } catch (error) {}
    };
    
    fetchMovie();
  }, []);
  
  let image = "";
  if(!(movie.poster_path === undefined)){
    image = checkIfUrlExists(getImageAddress(movie.poster_path))
      ? getImageAddress(movie.poster_path)
      : "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX3851270.jpg";
  }

  let year = "";
  if(!(movie.release_date === undefined)){
    year = movie.release_date.split("-")[0];
  }

  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        let reviewsAux = [];
        let API_URL = `http://localhost:3333`;

        const result = await axios.get(
          `${API_URL}/reviews/?movieId=${id}`
        );
        reviewsAux = result.data;

        setReviews(reviewsAux);
      } catch (error) {}
    };

    fetchReviews();
  }, []);

  if (reviews === undefined){
    reviews = [];
  }

  const [input, setInput] = useState("");

  return (
    <>
      <Menu />
      <div className="wrapper">
        <div className="info-block">
          <div className="row">
            <div className="detail-leftcolumn">
              <img className="cover" src={image} />
            </div>
            <div className="detail-rightcolumn">
              <Card>
                <h2 className="film-title">
                  <strong>{movie.title}</strong>
                </h2>
                <h3 className="film-details">{year}</h3>
                <p className="summary">{movie.overview}</p>
                <br />
              </Card>

              <br />
              <h1 className="title-separator">Reviews</h1>

              <Card>
                <div className="comment-session">
                  <Input
                    className="add-comment-input"
                    placeholder="Write your review here"
                    type="text"
                    value={input}
                    onInput={(e) => setInput(e.target.value)}
                  />
                </div>
                <div className="comment-session">
                  <Input
                    className="review-score"
                    placeholder="Score"
                    type="number"
                  />
                  <button
                    className="add-comment-button"
                    onClick={() => addReview(id, 5.5)}
                  >
                    Add review
                  </button>
                </div>
              </Card>

              {reviews
                .slice(0)
                .reverse()
                .map((review, index) => {
                  return (
                    <Card>
                      <Review
                        reviewId={review._id}
                        type="review-item"
                        text={review.text}
                        author={review.username}
                        likes={review.likes}
                        avatar={
                          !reviews.userImgUrl
                            ? "https://simpleicon.com/wp-content/uploads/user1.png"
                            : reviews.userImgUrl
                        }
                        userId={review.userId}
                      />
                      <Link to={"/review/" + review._id}>
                        <div className="row expand-row">
                          <FullscreenOutlined className="expand-icon" />
                        </div>
                      </Link>
                    </Card>
                  );
                })}
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilmDetails;
