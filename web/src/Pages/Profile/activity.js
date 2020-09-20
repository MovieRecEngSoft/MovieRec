import React from "react";

import './styles.css';
import Menu from "../../Components/Menu";
import Feed from "../../Components/Feed";
import { Link } from "react-router-dom";
import ProfileHeader from './header.js';

// Listas de filmes
// Como usuário, eu quero construir listas de filmes, públicas ou secretas, 
// para catalogar filmes de algum tópico e compartilhar com outras pessoas.

function ProfileActivity() {
  const Follow = () => {
    alert('Follow');
  };

  return (
    <>
      <Menu /> 
      <div class="wrapper">
        <div class="profile-block">
          <ProfileHeader/>
          <Feed/>
        </div>
      </div>
    </>
  );
  
}

export default ProfileActivity;
