import React from "react";

import './styles.css';
import Menu from "../../Components/Menu";

// Seguir outros usuários
// Como usuário, eu quero poder seguir e poder ser seguido por outras pessoas, 
// para que minhas atividades possam ser vistas pelos outros e que eu possa ver 
// a atividade de pessoas que considero interessantes.

function Activity() {
  return (
    <>
      <Menu /> 
      <div class="wrapper">
        <div class="profile-block">
          <div class="timeline">
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

export default Activity;
