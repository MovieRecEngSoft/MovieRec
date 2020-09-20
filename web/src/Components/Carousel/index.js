import React, {useState} from 'react';
import ItemsCarousel from "react-items-carousel";
import VideoCard from './Components/VideoCard';
import Arrow from './Components/Arrow';
import { UserOutlined } from "@ant-design/icons";

import './styles.css';

function Carousel({
    category,
}) {
    
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40;
    
    let movies = [];
    let title = "";
    if(!(category === undefined)){
      movies = category.movies;
      title = category.title;
    }

    return (
      <div style={{ padding: `0 ${chevronWidth}px` }}>
        
        <h1>{title}</h1>
        <ItemsCarousel
          
          requestToChangeActive={setActiveItemIndex}
          activeItemIndex={activeItemIndex}
          numberOfCards={6}
          gutter={20}
          leftChevron={<Arrow value="<" />}
          rightChevron={<Arrow value=">" />}
          outsideChevron
          chevronWidth={chevronWidth}
        >
          {movies.map((video, index) => {
            return (
              <VideoCard
                videoId={video._id}
                videoTitle={video.title}
                videoImage={video.poster_path}
              />
            );
          })}
        </ItemsCarousel>
      </div>
    );
}

export default Carousel;