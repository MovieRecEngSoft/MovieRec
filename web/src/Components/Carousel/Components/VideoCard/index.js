import React from 'react';
import { VideoCardContainer } from './styles';
import { Link } from 'react-router-dom';
import getImageAddress from '../../../../assets/utils/getImageAddress';
import checkIfUrlExists from "../../../../assets/utils/checkIfUrlExists";

function VideoCard({ videoTitle, videoId, categoryColor, videoImage }) {
  const image = checkIfUrlExists(getImageAddress(videoImage))
    ? getImageAddress(videoImage)
    : "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX3851270.jpg";

  let path = "/movie/" + videoId;
  
  return (
    <Link to={path}>
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
