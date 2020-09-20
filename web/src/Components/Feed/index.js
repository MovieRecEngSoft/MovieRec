import React from "react";
import { Link } from "react-router-dom";

import './styles.css';

// Seguir outros usuários
// Como usuário, eu quero poder seguir e poder ser seguido por outras pessoas, 
// para que minhas atividades possam ser vistas pelos outros e que eu possa ver 
// a atividade de pessoas que considero interessantes.

function Feed(props) {

  function Extract(props){
    return Object.keys(props).map((key) => {
      return(
        <div class="feed-node">
          <div class="avatar-box">
            <div>
              <Link to="/profile/activity">
                <img class="avatar-miniature" src="https://i.imgur.com/UctWXrz.png" />
                {/* <img class="avatar-miniature" src="{props.?}" /> */}
              </Link>
            </div>
          </div>
          <div class="content-box">
            <div class="pre-textual">
              <span>Rusro</span>
              {/* <span>{props.?}</span> */}
              <span class="action">publicou uma nova resenha</span>
              {/* <span class="action">{props.?}</span> */}
            </div>
            <div class="text-content">Even with the challenges of going back to school, Peter and Anthony understand their need for one another, and that together, they can tackle whatever comes their way.</div>
            {/* <div class="text-content">{props.?}</div> */}
          </div>
        </div>
      )
    }); 
  }

  return(
    <>
      <div class="feed">
        {Extract(props)}
      </div>
    </>
  );
}

export default Feed;
