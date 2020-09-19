import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../../Components/Carousel';
import Menu from '../../Components/Menu';

import dadosIniciais from "../../data/dados_iniciais.json";
import movies from "../../data/movies.json";
import Main from '../../Components/Main';
import Feed from '../../Components/Feed';

function Home(){
    return (
      <>
        <Menu />
        <Main background="https://d1yn1kh78jj1rr.cloudfront.net/image/thumbnail/rDtN98Qoishumwih/dark-red-blurred-background_mkP0t-_thumb.jpg">
          <div class="wrapper">
            <div class="nav">
              <div class="nav-block lists">
                <div class="carousel-wrapper">
                  <Carousel category={movies.categorias[0]} />
                </div>

                <div class="carousel-wrapper">
                  <Carousel category={movies.categorias[1]} />
                </div>

                <div class="carousel-wrapper">
                  <Carousel category={movies.categorias[2]} />
                </div>

                <div class="carousel-wrapper">
                  <Carousel category={movies.categorias[3]} />
                </div>
              </div>      

              <div class="nav-block activity">
                <h1>Recent Activity</h1>
                <Feed/>    
              </div>
            </div>
          </div>      
        </Main>
      </>
    );
}

export default Home;