
import React, { useState } from "react";
import axios from "axios";

import './styles.css';
import Menu from "../../Components/Menu";
import Button from "../../Components/Button";
import { Link } from "react-router-dom";

// Gerenciar perfil
// Como usuário, eu quero ter um ambiente no sistema que represente meu perfil, onde possa apresentar uma imagem como avatar e compartilhar informações sobre mim.

function ProfileEditor() {

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [background, setBackground] = useState("");
  const [description, setDescription] = useState("");

  const fetchData  = async () => {
    let API_URL = `localhost:3333`;

    try {
      //fetch 
        //avatar
        //description
        //name
        //background


    //     const result_all = await axios.get(`${API_URL}/movies`);
    //     aux.push(createCategory("All movies", result_all.data));

    //     const result_recom = await axios.get(`${API_URL}/user/recommended_movies`);
    //     aux.push(createCategory("Recommended for you", result_recom.data));

    //     setCategories(aux);
    } catch (error) {}
  }

  fetchData();

  const handleSubmit = async () => {
    // alert(`:: ${description}`)

    let API_URL = `localhost:3333`;

    try {
      //post avatar change
      //post background change
      //post description change
    }catch(error){}
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
          
          <input class="hidden" accept="image/*" id="contained-button-file" type="file" onChange={e => setAvatar(e.target.value)}/>
          <label class="red-button upload-avatar" for="contained-button-file">Upload</label>

          <input class="hidden" accept="image/*" id="contained-button-file" type="file" onChange={e => setBackground(e.target.value)}/>
          <label class="red-button upload-background" for="contained-button-file">Upload</label>

          <div class="pfsection txtsection">
            <div class="txtblk1">
              <span>Rusro</span>
            </div>

            <div class="txtblk2 edit-section" contentEditable="true" onInput={e => setDescription(e.target.textContent)}>
              #Android is (not) made for everyone. Follow along for the latest updates and stories behind our tech. Questions? Get assistance by using #AndroidHelp.
            </div>
          </div>   
          
            {/* <Link to="/profile/activity"> */}
              <button
              className="button"
              type="button"
              onClick={handleSubmit}
              htmlType="submit"
              name="Apply">
                APPLY
              </button>
            {/* </Link> */}
        </div>
      </div>
    </>
  );
  
}

export default ProfileEditor;
