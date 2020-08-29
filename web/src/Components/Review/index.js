import React from 'react';
import ReviewPage from '../../Pages/Review';

import './styles.css';

function getYouTubeId(youtubeURL) {
  return youtubeURL.replace(
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/,
    "$7"
  );
}

function Review(props) {
  const image = `https://img.youtube.com/vi/${getYouTubeId(`url(${props.url}`)}/hqdefault.jpg`;
  return (
    <>
        <div className="content-wrap">
            <div className="col col-6 thumb-div">
                <img className="thumb" src={image} />
            </div>
            <div className="col col-17 review">
                <div className="title">{props.title}</div>
                <p className="review-text">{props.text}</p>
            </div> 
        </div>
    </>
  );
}

export default Review;