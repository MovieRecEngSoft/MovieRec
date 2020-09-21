import React from 'react';
import { VideoCardContainer } from './styles';
import { Link } from 'react-router-dom';
import getImageAddress from '../../../../assets/utils/getImageAddress';
import checkIfUrlExists from "../../../../assets/utils/checkIfUrlExists";

function VideoCard({ videoTitle, videoId, categoryColor, videoImage }) {
  const image = checkIfUrlExists(getImageAddress(videoImage))
    ? getImageAddress(videoImage)
    : "https://pngimage.net/wp-content/uploads/2018/06/image-not-available-png-5.png";

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
