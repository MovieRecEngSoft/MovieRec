import React from "react";

import './styles.css';
import Menu from "../../Components/Menu";
import Feed from "../../Components/Feed";
import { Link } from "react-router-dom";
import ProfileHeader from './header.js';

// Listas de filmes
// Como usuário, eu quero construir listas de filmes, públicas ou secretas, 
// para catalogar filmes de algum tópico e compartilhar com outras pessoas.

const ProfileActivity = (props) =>{

  return (
    <>
      <Menu /> 
      <div class="wrapper">
        <div class="profile-block">
          <ProfileHeader activeSection={0}/>
          <Feed scope="singleUser" userId={props.userId}/>
        </div>
      </div>
    </>
  );
  
}

export default ProfileActivity;
