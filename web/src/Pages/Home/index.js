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
    
    function CheckLogged(){    
      let API_URL = 'http://localhost:3333/session';

      axios.get(API_URL,{ withCredentials: true })
      .then(response => {
        if (response.status == 200) {
          console.log(response.data)
          console.log(response.data.authenticated)
          if(response.data.authenticated == false){ history.push('/login'); return}
          else{
            sessionStorage.setItem('_id', response.data.user._id );
            sessionStorage.setItem('name', response.data.user.nam );
            sessionStorage.setItem('img_path', response.data.user.img_path );
            sessionStorage.setItem('description', response.data.user.description );
          }
        }else{const error = new Error(response.error);throw error;}
      })
      .catch(err => {alert('ERR');history.push('/login');});
    }
    CheckLogged()

    const [categories, setCategories] = useState([]);
    useEffect(() => {
      const fetchMovies = async () => {
        try {
          let categoriesAux = [];
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
          <div class="wrapper">
            <div class="nav">
              <div class="nav-block lists">
                <div class="carousel-wrapper">
                  <Carousel category={categories[0]} />
                </div>
                {/* <div class="carousel-wrapper">
                  <Carousel category={categories[1]} />
                </div> */}
              </div>
              <div class="nav-block activity">
                <h1>Recent Activity</h1>
                <Feed />
              </div>

            </div>
          </div>
      </>
    );
}

export default Home;