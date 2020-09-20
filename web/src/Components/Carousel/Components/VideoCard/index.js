import React from 'react';
import { VideoCardContainer } from './styles';
import { Link } from 'react-router-dom';
import getImageAddress from '../../../../assets/utils/getImageAddress';

function VideoCard({ videoTitle, videoURL, categoryColor, videoImage }) {
  const image = getImageAddress(videoImage);

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
