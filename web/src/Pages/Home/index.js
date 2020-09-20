import React from 'react';
import { Link, Redirect, useHistory } from "react-router-dom";
import axios from "axios";

import Carousel from '../../Components/Carousel';
import Menu from '../../Components/Menu';

import dadosIniciais from "../../data/dados_iniciais.json";
import movies from "../../data/movies.json";
import Main from '../../Components/Main';
import Feed from '../../Components/Feed';

const Home = () => {

    let history = useHistory()
    
    let jjja = "hoi"

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
      .catch(err => {
        alert('ERR');
        history.push('/login');
      });
    }
    CheckLogged()

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