import React, { useEffect, useState } from "react";
import axios from "axios";

import Input from "../../Components/Input";
import Menu from "../../Components/Menu";
import getImageAddress from "../../assets/utils/getImageAddress";
import Card from "../../Components/Card";

import checkIfUrlExists from "../../assets/utils/checkIfUrlExists";

import { FullscreenOutlined, PlusOutlined } from "@ant-design/icons";

import './styles.css';
import Review from "../../Components/Review";
import { Link, useLocation, useParams } from "react-router-dom";

function FilmDetails() {

  function addReview(movieId){
    fetch("http://localhost:3333/review", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movieId: movieId,
        score: parseFloat(score),
        text: input,
      }),
    })
      .then((response) => {
        window.location.reload(false);
      })
      .catch((response) => {
        // Error
      });
  }

  function addToList(listName, movieId){
    fetch("http://localhost:3333/movieList/movie", {
      method: "PUT",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movieId: movieId,
        name: listName
      }),
    })
      .then((response) => {
        window.location.reload(false);
      })
      .catch((response) => {
        // Error
      });
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

        setMovie(movieAux);
      } catch (error) {}
    };

    fetchMovie();
  }, []);


  let image = "";
  if(!(movie.poster_path === undefined)){
    image = checkIfUrlExists(getImageAddress(movie.poster_path))
      ? getImageAddress(movie.poster_path)
      : "https://pngimage.net/wp-content/uploads/2018/06/image-not-available-png-5.png";
  }

  let year = "";
  if(!(movie.release_date === undefined)){
    year = movie.release_date.split("-")[0];
  }

  let [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        let reviewsAux = [];
        let API_URL = `http://localhost:3333`;

        fetch(`${API_URL}/reviews/?movieId=${id}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          }
        })
        .then(response => response.json())
        .then(reviewsAux => {
          setReviews(reviewsAux);
        })
      } catch (error) {}
    };

    fetchReviews();
  }, []);

  if (reviews === undefined){
    reviews = [];
  }

  const [lists, setLists] = useState([]);
  useEffect(() => {
    const fetchLists = async () => {
      try {
        let listsAux = [];
        let API_URL = `http://localhost:3333`;

        const result = await axios.get(`${API_URL}/movieLists`, {
          withCredentials: true,
        });
        listsAux = result.data;

        setLists(listsAux);
      } catch (error) {}
    };

    fetchLists();
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
}, [reviews])

  function onScoreChange(event) {
    const value = event.target.value;
    setScore(event.target.value);
    if (!value || value < 0 || value > 10) {
      event.target.value = "";
    }
  }

  const [score, setScore] = useState("");
  const [input, setInput] = useState("");
  const [select, setSelect] = useState("");

  return (
    <>
      <Menu />
      <div className="wrapper">
        <div className="info-block">
          <div className="row">
            <div className="detail-leftcolumn">
              <div className="row">
                <img className="cover" src={image} />
              </div>
              <div className="row add-to-list">
                <span className="add-to-list-text">Add to list</span>
              </div>
              <div className="row add-to-list">
                <select
                  value={select}
                  onChange={(e) => setSelect(e.target.value)}>
                    <option key={0}></option>
                  {lists.map((list, index) => {
                    return <option key={index+1}>{list.name}</option>;
                  })};
                </select>
                <span>
                  <PlusOutlined
                    className="add-to-list-icon"
                    onClick={() => addToList(select, id)}
                  />
                </span>
              </div>
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
                    min="0"
                    max="10"
                    step="0.1"
                    onChange={onScoreChange}
                    value={score}
                    onInput={(e) => setScore(e.target.value)}
                  />
                  <button
                    className="add-comment-button"
                    onClick={() => addReview(id, score)}
                  >
                    Add review
                  </button>
                </div>
              </Card>

              {reviews.map((review, index) => {
                return (
                  <Card key={index} id={review._id}>
                    <Review
                      reviewId={review._id}
                      type="review-item"
                      text={review.text}
                      author={review.username}
                      likes={review.likes}
                      liked={review.userLiked}
                      score={review.score}
                      avatar={
                        !review.userImgUrl
                          ? "https://simpleicon.com/wp-content/uploads/user1.png"
                          : review.userImgUrl
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
