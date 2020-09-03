import React from "react";

import './styles.css';
import Menu from "../../Components/Menu";

// Gerenciar perfil
// Como usuário, eu quero ter um ambiente no sistema que represente meu perfil, onde possa apresentar uma imagem como avatar e compartilhar informações sobre mim.

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
          </div>
          <div class="pfsection txtsection">
            <div class="txtblk1">
              <span>Rusro</span>
            </div>
            <div class="txtblk2">
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum et dolor vitae sapien ullamcorper suscipit at vitae
                odio. Nunc in dignissim enim. Fusce venenatis sagittis ipsum,
                vitae elementum metus fringilla congue. Curabitur condimentum
                libero orci, eget imperdiet purus consectetur eget.
              </span>
            </div>
          </div>
          <div class="pfsection timeline">
            Array [Atividades (resenhas publicadas,comentários ...)]
          </div>
        </div>
      </div>
    </>
  );
  
}

export default Profile;
