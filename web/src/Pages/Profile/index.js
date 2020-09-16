import React from "react";

import './styles.css';
import Menu from "../../Components/Menu";
import Feed from "../../Components/Feed";

// Listas de filmes
// Como usuário, eu quero construir listas de filmes, públicas ou secretas, 
// para catalogar filmes de algum tópico e compartilhar com outras pessoas.

function Profile() {
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
            <div class="follow-button">Follow</div>
            <div class="edit-button">Edit</div>
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
              <span>ACTIVITY</span>
            </div>
            <div>
              <span>LISTS</span>
            </div>
          </div>
          <Feed />
        </div>
      </div>
    </>
  );
  
}

export default Profile;
