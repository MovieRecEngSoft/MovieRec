import React, { useState } from "react";
import axios from "axios";

import './styles.css';
import Menu from "../../Components/Menu";
import Feed from "../../Components/Feed";
import { Link } from "react-router-dom";

// Listas de filmes
// Como usuário, eu quero construir listas de filmes, públicas ou secretas, 
// para catalogar filmes de algum tópico e compartilhar com outras pessoas.

function ProfileHeader() {
  const Follow = () => {
    alert('Follow');
  };

  return (
    <>      
      <div>
        <div class="pfsection imgsection">
          <div class="pfimgblock">
            <img class="avatar" src="https://i.imgur.com/UctWXrz.png" />
          </div>
          <div class="bkground">
          </div>
          <div class="red-button" onClick={Follow}>Follow</div>
          {/* <div class="grey-button">Unfollow</div> */}
          {/* <div class="grey-button">Edit</div> */}
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
          <div class="activesection">
            <Link to="/profile/activity">
              <span>ACTIVITY</span>
            </Link>
          </div>
          <div>
            <Link to="/profile/lists">
              <span>LISTS</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
  
}

export default ProfileHeader;
