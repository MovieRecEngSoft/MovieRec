
import React, { useEffect, useState } from "react";
import axios from "axios";

import './styles.css';
import Menu from "../../Components/Menu";
import Button from "../../Components/Button";
import { Link, useParams, useHistory } from "react-router-dom";

// Gerenciar perfil
// Como usuário, eu quero ter um ambiente no sistema que represente meu perfil, onde possa apresentar uma imagem como avatar e compartilhar informações sobre mim.

function ProfileEditor() {

  let history = useHistory()
  let { id } = useParams();

  const checkIntegrity = () =>{
    if(id != sessionStorage.getItem("_id")){
      let errURL  = `/profile/activity/${id}`;
      history.push(errURL);
    }
  }
  checkIntegrity()

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [background, setBackground] = useState("");
  const [description, setDescription] = useState("");

  const [profileInfo, setProfileInfo] = useState([]);
  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        let profileInfoAux = {};
        let API_URL = `http://localhost:3333`;
        
        const result = await axios.get(`${API_URL}/user/?userId=${id}`);
        profileInfoAux = result.data;
        console.log(profileInfoAux);

        setName(profileInfoAux.name);
        setDescription(profileInfoAux.description);
        setAvatar(profileInfoAux.avatar);

        setProfileInfo(profileInfoAux);

      } catch (error) {}
    };
    fetchProfileInfo();
  }, []);


  const handleSubmit = async () => {
    console.log("Handler Activation required")
    console.log(avatar)
    console.log(description)

    let API_URL = 'http://localhost:3333/user';
    let redirectURL  = `/profile/activity/${id}`;

    axios.patch(API_URL,{description: description, img_path: avatar},{ withCredentials: true })
    .then(response => {
      if (response.status == 204) {
        console.log("GREAT SUCCESS")
        history.push(redirectURL);
      }else{const error = new Error(response.error);throw error;}
    })
    .catch(err => {alert('ERR'); history.push(redirectURL);});
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
              <img class="avatar" src={profileInfo.img_path}/>
            </div>
            <div class="bkground">
            </div>
          </div>
          
          {/* <input class="hidden" accept="image/*" id="contained-button-file" type="file" onChange={e => setAvatar(e.target.value)}/>
          <label class="red-button upload-avatar" for="contained-button-file">Upload</label>

          <input class="hidden" accept="image/*" id="contained-button-file" type="file" onChange={e => setBackground(e.target.value)}/>
          <label class="red-button upload-background" for="contained-button-file">Upload</label> */}

          <div class="pfsection txtsection">
            <div class="txtblk1">
              <span>{profileInfo.name}</span>
            </div>
            <span class="txtblk2">Edit your description below</span>
            <div id="description-input" class="txtblk2 edit-section" contentEditable="true" onInput={e => setDescription(e.target.textContent)}>
              {profileInfo.description}
            </div>

            <span class="txtblk2">Paste your new avatar URL below</span>
            <div class="txtblk2 edit-section" contentEditable="true" onInput={e => setAvatar(e.target.textContent)}>
              {profileInfo.img_path}
            </div>

          </div>   
            <button
              className="button"
              type="button"
              onClick={handleSubmit}
              htmlType="submit"
              name="Apply"
              id="apply">
              APPLY
            </button>
        </div>
      </div>
    </>
  );
  
}

export default ProfileEditor;
