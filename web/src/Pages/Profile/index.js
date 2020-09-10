import React from "react";

import './styles.css';
import Menu from "../../Components/Menu";
import Button from "../../Components/Button";

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
              <img class="avatar" src="https://pbs.twimg.com/profile_images/1295555226720641026/gTnCg1RF_400x400.jpg" />
            </div>
            <div class="bkground">
            </div>
            {/* <div class="bkground">
            </div> */}
            <div class="follow-button" >Follow</div>
            
            {/* <Button type="button" htmlType="submit" name="Register" class="follow-button" /> */}

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

          <div class="pfsection timeline">
            <div class="timeline-node">
              <div class="avatar-box">
                <div>
                  <a>
                    <img class="avatar-miniature" src="https://i.imgur.com/UctWXrz.png" />
                  </a>
                </div>
              </div>
              <div class="content-box">
                <div class="pre-textual">
                  <span>Rusro</span>
                  <span class="action">publicou uma nova resenha</span>
                </div>
                <div class="text-content">
                  Even with the challenges of going back to school, Peter and Anthony understand their need for one another, and that together, they can tackle whatever comes their way.
                </div>
              </div>
            </div>
            <div class="blank-spacing"></div>

            <div class="timeline-node">
              <div class="avatar-box">
                <div>
                  <a>
                    <img class="avatar-miniature" src="https://i.imgur.com/UctWXrz.png" />
                  </a>
                </div>
              </div>
              <div class="content-box">
                <div class="pre-textual">
                  <span>Rusro</span>
                  <span class="action">publicou uma nova resenha</span>
                </div>
                <div class="text-content">
                  Even with the challenges of going back to school, Peter and Anthony understand their need for one another, and that together, they can tackle whatever comes their way.
                </div>
              </div>
            </div>
            <div class="blank-spacing"></div>

            <div class="timeline-node">
              <div class="avatar-box">
                <div>
                  <a>
                    <img class="avatar-miniature" src="https://i.imgur.com/UctWXrz.png" />
                  </a>
                </div>
              </div>
              <div class="content-box">
                <div class="pre-textual">
                  <span>Rusro</span>
                  <span class="action">publicou uma nova resenha</span>
                </div>
                <div class="text-content">
                  Even with the challenges of going back to school, Peter and Anthony understand their need for one another, and that together, they can tackle whatever comes their way.
                </div>
              </div>
            </div>
            <div class="blank-spacing"></div>

            <div class="timeline-node">
              <div class="avatar-box">
                <div>
                  <a>
                    <img class="avatar-miniature" src="https://i.imgur.com/UctWXrz.png" />
                  </a>
                </div>
              </div>
              <div class="content-box">
                <div class="pre-textual">
                  <span>Rusro</span>
                  <span class="action">publicou uma nova resenha</span>
                </div>
                <div class="text-content">
                  Even with the challenges of going back to school, Peter and Anthony understand their need for one another, and that together, they can tackle whatever comes their way.
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
  
}

export default Profile;
