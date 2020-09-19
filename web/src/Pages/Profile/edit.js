import React from "react";

import './styles.css';
import Menu from "../../Components/Menu";
import Button from "../../Components/Button";
import { Link } from "react-router-dom";

// Gerenciar perfil
// Como usuário, eu quero ter um ambiente no sistema que represente meu perfil, onde possa apresentar uma imagem como avatar e compartilhar informações sobre mim.

function ProfileEditor() {

  const uploadBackground = () => {
    alert('UP BG');
  };

  const uploadAvatar = () => {
    alert('UP AV');
  };

  return (
    <>
      <Menu /> 
      <div class="wrapper">
        
        <div class="profile-block">

          <div class="edit-header">
            <div class="txtblk1">
              <span class="grayed">EDIT YOUR PROFILE</span>
            </div>
            <div class="txtblk2">
              <span class="grayed">PREVIEW
              </span>
            </div>
          </div>

          <div class="pfsection imgsection">
            <div class="pfimgblock">
              <img class="avatar" src="https://i.imgur.com/UctWXrz.png" />
            </div>
            <div class="bkground">
            </div>
          </div>

          <div class="red-button upload-avatar" onClick={uploadAvatar}>Upload</div>
          <div class="red-button upload-background" onClick={uploadBackground}>Upload</div>

          <div class="pfsection txtsection">
            <div class="txtblk1">
              <span>Rusro</span>
            </div>

            {/* <div class="txtblk2">
              <span class="grayed">EDIT YOUR DESCRIPTION
              </span>
            </div> */}

            <div class="txtblk2 edit-section" contentEditable="true">
              <span>
              #Android is (not) made for everyone. Follow along for the latest updates and stories behind our tech. Questions? Get assistance by using #AndroidHelp.
              </span>
            </div>
          </div>
          
          {/* <div class="pfsection">
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
                  <span class="action">is editing their profile</span>
                </div>
                <div class="text-content">
                  Sample text.
                </div>
              </div>
            </div>            
          </div> */}
          
            <Link to="/profile/activity">
              <Button type="button" htmlType="submit" name="APPLY" />
            </Link>
        </div>
      </div>
    </>
  );
  
}

export default ProfileEditor;
