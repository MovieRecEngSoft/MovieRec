import React, {useState} from 'react';
import ItemsCarousel from "react-items-carousel";
import VideoCard from './Components/VideoCard';
import Arrow from './Components/Arrow';
import { UserOutlined } from "@ant-design/icons";

import './styles.css';

function Carousel({
    category,
}) {
  
    if(category === undefined){category = []};
    
    const categoryTitle = category.title;
    let movies = category.movies;
    if(movies === undefined){movies = []};
    
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40;
    

    return (
      <div style={{ padding: `0 ${chevronWidth}px` }}>
          <h1>{categoryTitle}</h1>
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
          {movies.map((movie, index) => {
            return (
              <VideoCard
                videoTitle={movie.title}
                videoImage={movie.poster_path}
              />
            );
          })}
        </ItemsCarousel>
      </div>
    );
}

export default Carousel;