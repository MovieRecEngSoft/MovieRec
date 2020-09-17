import React from "react";

import './styles.css';
import { Link } from "react-router-dom";
import Menu from "../../Components/Menu";
import Feed from "../../Components/Feed";
import movies from "../../data/movies.json";
import Carousel from '../../Components/Carousel';

// Gerenciar perfil
// Como usuário, eu quero ter um ambiente no sistema que represente meu perfil, onde possa apresentar uma imagem como avatar e compartilhar informações sobre mim.
// Seguir outros usuários
// Como usuário, eu quero poder seguir e poder ser seguido por outras pessoas, 
// para que minhas atividades possam ser vistas pelos outros e que eu possa ver 
// a atividade de pessoas que considero interessantes.

function ProfileLists() {
  return (
    <>
      <Menu /> 
      <div class="wrapper">
        <div class="profile-block">
          <div class="pfsection imgsection">
            <div class="pfimgblock">
              <img class="avatar" src="https://i.imgur.com/UctWXrz.png" />
            </div>
            <div class="bkground">
            </div>
            {/* <div class="follow-button">Follow</div> */}
            <Link to="/profile/edit">
              <div class="edit-button">Edit</div>
            </Link>
          </div>
          <div class="pfsection txtsection">
            <div class="txtblk1">
              <span>Rusro</span>
            </div>
            <div class="txtblk2">
              <span>
                #Android is made for everyone. Follow along for the latest updates and stories behind our tech. Questions? Get assistance by using #AndroidHelp.
              </span>
            </div>
            <div class="followage-info">
              <div>
                <span>1</span>
                <span>Following </span>
              </div>
              <div>
                <span>3036</span>
                <span>Followers </span>
              </div>
            </div>
          </div>
          <div class="switchsection">
            <div>
              <Link to="/profile/activity">
                <span>ACTIVITY</span>
              </Link>
            </div>
            <div  class="activesection">
              <Link to="/profile/lists">
                <span>LISTS</span>
              </Link>
            </div>
          </div>
            <div class="listsection">
              <div class="carousel-wrapper">
                <Carousel category={movies.categorias[0]} />
              </div>

              <div class="carousel-wrapper">
                <Carousel category={movies.categorias[1]} />
              </div>

              <div class="carousel-wrapper">
                <Carousel category={movies.categorias[2]} />
              </div>
            </div>
        </div>
      </div>
    </>
  );
  
}

export default ProfileLists;
