import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link } from 'react-router-dom';
import Carousel from '../../Components/Carousel';
import Menu from '../../Components/Menu';

import dadosIniciais from "../../data/dados_iniciais.json";
import movies from "../../data/movies.json";
import Main from '../../Components/Main';
import Feed from '../../Components/Feed';

function createCategory(title, movies){
  var category = {};
  category.title = title;
  category.movies = movies;

  return category;
}

function Home(){

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let categoriesAux = []
        let API_URL = `http://localhost:3333`;

        const result_all = await axios.get(`${API_URL}/movies`);
        categoriesAux.push(createCategory("All movies", result_all.data));

        // const result_recom = await axios.get(`${API_URL}/user/recommended_movies`);
        // categoriesAux.push(createCategory("Recommended for you", result_recom.data));

        setCategories(categoriesAux);
      } catch (error) {}
    };

    fetchMovies();
  }, []);

    return (
      <>
        <Menu />
        <Main background="https://d1yn1kh78jj1rr.cloudfront.net/image/thumbnail/rDtN98Qoishumwih/dark-red-blurred-background_mkP0t-_thumb.jpg">
          <div class="wrapper">
            <div class="nav">
              <div class="nav-block lists">
                <div class="carousel-wrapper">
                  <Carousel category={categories[0]} />
                </div>
                <div class="carousel-wrapper">
                  <Carousel category={categories[1]} />
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
