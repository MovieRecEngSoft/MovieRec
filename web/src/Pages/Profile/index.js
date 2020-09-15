import React from "react";

import './styles.css';
import Menu from "../../Components/Menu";
import Feed from "../../Components/Feed";

// Gerenciar perfil
// Como usuário, eu quero ter um ambiente no sistema que represente meu perfil, onde possa apresentar uma imagem como avatar e compartilhar informações sobre mim.
// Seguir outros usuários
// Como usuário, eu quero poder seguir e poder ser seguido por outras pessoas, 
// para que minhas atividades possam ser vistas pelos outros e que eu possa ver 
// a atividade de pessoas que considero interessantes.

function Profile() {
  return (
    <>
      <Menu /> 
      <div class="wrapper">
        <div class="profile-block">
          <div class="pfsection imgsection">
            <div class="pfimgblock">
              <img class="avatar" src="https://pbs.twimg.com/profile_images/1295555226720641026/gTnCg1RF_400x400.jpg" />
            </div>
            <div class="bkground">
            </div>
            <div class="follow-button" >Follow</div>
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
          </div>
          <Feed />
        </div>
      </div>
    </>
  );
  
}

export default Profile;
