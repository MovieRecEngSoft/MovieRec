import React, {useState} from 'react';
import ItemsCarousel from "react-items-carousel";
import VideoCard from './Components/VideoCard';

function Carousel({
    category,
}) {
    
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40;
    
    const categoryTitle = category.titulo;
    const categoryColor = category.cor;
    const videos = category.videos;

    return (
      <div style={{ padding: `0 ${chevronWidth}px` }}>
          <h1>{categoryTitle}</h1>
        <ItemsCarousel
          requestToChangeActive={setActiveItemIndex}
          activeItemIndex={activeItemIndex}
          numberOfCards={4}
          gutter={20}
          leftChevron={<button>{"<"}</button>}
          rightChevron={<button>{">"}</button>}
          outsideChevron
          chevronWidth={chevronWidth}
        >
          {videos.map((video, index) => {
            return (
              <>
                <VideoCard
                  videoTitle={video.titulo}
                  videoURL={video.url}
                  categoryColor={categoryColor}
                />
              </>
            );
          })}
        </ItemsCarousel>
      </div>
    );
}

export default Carousel;