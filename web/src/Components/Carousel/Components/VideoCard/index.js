import React from 'react';
import { VideoCardContainer } from './styles';
import { Link } from 'react-router-dom';
import getImageAddress from '../../../../assets/utils/getImageAddress';

function imageExists(image_url) {
  var http = new XMLHttpRequest();

  http.open("HEAD", image_url, false);
  http.send();

  return http.status != 404;
}

function VideoCard({ videoTitle, videoURL, categoryColor, videoImage }) {
  const image = imageExists(getImageAddress(videoImage))
    ? getImageAddress(videoImage)
    : "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX3851270.jpg";

  return (
    <Link to="/movie">
      <VideoCardContainer
        url={image}
        target="_blank"
        style={{ borderColor: categoryColor || "black" }}
        title={videoTitle}
      />
    </Link>
  );
}

export default VideoCard;
