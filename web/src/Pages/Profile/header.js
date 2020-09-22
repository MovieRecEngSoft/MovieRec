import React, { useEffect, useState } from "react";
import axios from "axios";

import './styles.css';
import Menu from "../../Components/Menu";
import Feed from "../../Components/Feed";
import { Link } from "react-router-dom";

// Listas de filmes
// Como usuário, eu quero construir listas de filmes, públicas ou secretas, 
// para catalogar filmes de algum tópico e compartilhar com outras pessoas.

const ProfileHeader = (props) => {

  // const [name, setName] = useState("");
  // const [avatar, setAvatar] = useState("");
  // const [background, setBackground] = useState("");
  // const [description, setDescription] = useState("");
  // const [followers, setFollowers] = useState(""); 
  // const [following, setFollowing] = useState(""); 

  const [profileInfo, setProfileInfo] = useState([]);
  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        let profileInfoAux = {};
        let API_URL = `http://localhost:3333`;
        
        const requestOptions = {
          method: 'GET',
          credentials: "include",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'      
          }
        };
        fetch(`${API_URL}/user/?userId=${props.userId}`, requestOptions)
        .then(response => response.json())
        .then(response => {
            setProfileInfo(response)
          }
        )
      } catch (error) {}
    };
    
    fetchProfileInfo();
  }, []);


  const HandleFollow = () => {
    // alert('Follow');
    console.log("HANDLE FOLLOW")
    let API_URL = `http://localhost:3333/user/follow`;

    axios.post(API_URL,{ userId: props.userId },{ withCredentials: true })
      .then(response => {
        if (response.status == 204) {
          console.log(response.data)
          window.location.reload(false);
        }else{const error = new Error(response.error);throw error;}
      })
      .catch(err => {alert('Error on Follow request. Please try again.');});

  };

  function GetActiveSection(val,val2){
    if(val == val2){return('activesection')}
  }
  
  function InteractionInfo(props){
    //self
    console.log("VM VER")
    console.log(profileInfo)
    console.log(sessionStorage.getItem("_id"))
    if(sessionStorage.getItem("_id")==props.userId){
      return(<Link to={`/profile/edit/${props.userId}`}><div class="grey-button">Edit</div></Link>)
    }
    //following
    if(profileInfo.userIsFollowing)
      return(<div class="grey-button" onClick={HandleFollow} >Unfollow</div>)
    //not following
    return(<div class="red-button" onClick={HandleFollow}>Follow</div>)
  }

  function movieListComponent() {
    if (sessionStorage.getItem("_id") === profileInfo._id) 
      return <Link to={`/profile/lists/${props.userId}`}>
        <div class={GetActiveSection(1,props.activeSection)}>
          <span>LISTS</span>
        </div>
      </Link>
  }

  return (
    <>      
      <div>
        <div class="pfsection imgsection">
          <div class="pfimgblock">
            <img class="avatar" src={profileInfo.img_path==undefined ? "https://simpleicon.com/wp-content/uploads/user1.png" :profileInfo.img_path} />
          </div>
          <div class="bkground">
          </div>
          {InteractionInfo(props)}
        </div>
        <div class="pfsection txtsection">
          <div class="txtblk1">
            <span>{profileInfo.name}</span>
          </div>
          <div class="txtblk2">
            <span>
              {profileInfo.description}
            </span>
          </div>
          <div class="followage-info">
            <div>
              <span>{profileInfo.numFollowing}</span>
              <span>Following </span>
            </div>
            <div>
              <span>{profileInfo.numFollowers}</span>
              <span>Followers </span>
            </div>
          </div>
        </div>
        <div class="switchsection">
          <Link to={`/profile/activity/${props.userId}`}>
            <div class={GetActiveSection(0,props.activeSection)}>
              <span>ACTIVITY</span>
            </div>
          </Link>
          {movieListComponent()}
        </div>
      </div>
    </>
  );
  
}

export default ProfileHeader;
