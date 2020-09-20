import React, { useState } from "react";
import axios from "axios";

import './styles.css';
import Menu from "../../Components/Menu";
import Feed from "../../Components/Feed";
import { Link } from "react-router-dom";

// Listas de filmes
// Como usuário, eu quero construir listas de filmes, públicas ou secretas, 
// para catalogar filmes de algum tópico e compartilhar com outras pessoas.

const ProfileHeader = ({activeSection}) => {

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [background, setBackground] = useState("");
  const [description, setDescription] = useState("");
  const [followers, setFollowers] = useState(""); 
  const [following, setFollowing] = useState(""); 

  const fetchData  = async () => {
    let API_URL = `localhost:3333`;

    try {
      //fetch 
        //avatar
        //description
        //name
        //background
        //following
        //followers
    } catch (error) {}
  }

  const HandleFollow = () => {
    //req follow
    alert('Follow');
  };

  // const HandleUnfollow = () => {
  //   //req unfollow
  //   alert('Follow');
  // };

  function GetActiveSection(val,val2){
    if(val == val2){return('activesection')}
  }
  
  function InteractionInfo(props){
    //self
    return(
     <div class="grey-button">Edit</div> 
    )
    //not following
    return(
      <div class="red-button" onClick={HandleFollow}>Follow</div>
    )
    //following
    return(
     <div class="grey-button" onClick={HandleFollow} >Unfollow</div> 
    //  <div class="grey-button" onClick={HandleUnfollow} >Unfollow</div> 
    )
  }

  return (
    <>      
      <div>
        <div class="pfsection imgsection">
          <div class="pfimgblock">
            <img class="avatar" src="https://i.imgur.com/UctWXrz.png" />
          </div>
          <div class="bkground">
          </div>
          {InteractionInfo()}
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
          <div class={GetActiveSection(0,activeSection)}>
            <Link to="/profile/activity">
              <span>ACTIVITY</span>
            </Link>
          </div>
          <div class={GetActiveSection(1,activeSection)}>
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
