import React from "react";

import './styles.css';
import { Link, useParams } from "react-router-dom";
import Menu from "../../Components/Menu";
import Feed from "../../Components/Feed";
import movies from "../../data/movies.json";
import Carousel from '../../Components/Carousel';
import ProfileHeader from './header.js';

// import checkIfUrlExists from "../../assets/utils/checkIfUrlExists";

// Gerenciar perfil
// Como usuário, eu quero ter um ambiente no sistema que represente meu perfil, onde possa apresentar uma imagem como avatar e compartilhar informações sobre mim.
// Seguir outros usuários
// Como usuário, eu quero poder seguir e poder ser seguido por outras pessoas, 
// para que minhas atividades possam ser vistas pelos outros e que eu possa ver 
// a atividade de pessoas que considero interessantes.

const ProfileLists = (props) => {
  
  let { id } = useParams();

  function ExtractProfileLists(props){
    // return Object.keys(props).map((key) => {
    //   return(
    //     <div class="listsection">
    //       <div class="carousel-wrapper">
    //         <Carousel category={movies.categorias[0]} />
    //         {/* <Carousel category={props.?} /> */}
    //       </div>
    //     </div>
    //   )
    // }); 
  }

  return (
    <>
      <Menu /> 
      <div class="wrapper">
        <div class="profile-block">
        <ProfileHeader activeSection={1} userId={id}/>
            {ExtractProfileLists(props)}
        </div>
      </div>
    </>
  );
  
}

export default ProfileLists;
