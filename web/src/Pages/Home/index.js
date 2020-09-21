import React, { useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import axios from "axios";

import Carousel from '../../Components/Carousel';
import Menu from '../../Components/Menu';

import dadosIniciais from "../../data/dados_iniciais.json";
import movies from "../../data/movies.json";
import Main from '../../Components/Main';
import Feed from '../../Components/Feed';

function createCategory(title, movies) {
  var category = {};
  category.title = title;
  category.movies = movies;

  return category;
}

const Home = () => {

    let history = useHistory()
    
    const [categories, setCategories] = useState([]);
    useEffect(() => {
      const fetchMovies = async () => {
        try {
          let categoriesAux = [];
          let API_URL = `http://localhost:3333`;

          const result_all = await axios.get(`${API_URL}/movies`);
          categoriesAux.push(createCategory("All movies", result_all.data));

          const result_recom = await axios.get(`${API_URL}/user/recommendedMovies`, {withCredentials: true});
          categoriesAux.push(createCategory("Recommended for you", result_recom.data));

          setCategories(categoriesAux);
        } catch (error) {}
      };

      fetchMovies();
    }, []);

    return (
      <>
        <Menu />
          <div class="wrapper">
            <div class="nav">
              <div class="nav-block lists">
                {categories.map(category => <div class="carousel-wrapper"> <Carousel category={category} /> </div>)}
              </div>
              <div class="nav-block activity">
                <h1>Recent Activity</h1>
                <Feed scope="followingUsers" userId={sessionStorage.getItem('_id')}/>
              </div>

            </div>
          </div>
      </>
    );
}

export default Home;