import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import './styles.css';

// Seguir outros usuários
// Como usuário, eu quero poder seguir e poder ser seguido por outras pessoas, 
// para que minhas atividades possam ser vistas pelos outros e que eu possa ver 
// a atividade de pessoas que considero interessantes.

const Feed = (props) => {

  const HandleFeedFetch = () => {
    // alert("a");
    if(props.scope == "followingUsers"){      
      let API_URL = 'http://localhost:3333/user/followingActivity';

      axios.get(API_URL,{ withCredentials: true })
      .then(response => {
        // if (response.status == 200) {
          console.log("FollowingUsers FEEDLIST below")
          console.log(response.data)
          // console.log(response.data.authenticated)
          // if(response.data.authenticated == false){ history.push('/login'); return}
          // else{
          //   sessionStorage.setItem('_id', response.data.user._id );
          //   sessionStorage.setItem('name', response.data.user.nam );
          //   sessionStorage.setItem('img_path', response.data.user.img_path );
          //   sessionStorage.setItem('description', response.data.user.description );
          // }
        // }else{const error = new Error(response.error);throw error;}
      })
      // .catch(err => {alert('ERR');history.push('/login');});

    }else if(props.scope == "singleUser"){
    // }else if(props.scope == "singleUser" && props.userId){
      let API_URL = 'http://localhost:3333/user';
      axios.get(API_URL,{ userId : props.userId },{ withCredentials: true })      
      .then(response => {
          console.log("SingleUser FEEDLIST below")
          console.log(response.data)
      })      
    }
  }

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

  HandleFeedFetch();

  return(
    <>
      <div class="feed">
        {/* <h1 className="form-title">{props.scope}</h1> */}
        {/* {Extract(props)} */}
      </div>
    </>
  );
}

export default Feed;
