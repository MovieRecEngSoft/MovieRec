import React, { useState } from 'react';
import { Link, Redirect, useHistory } from "react-router-dom";
import Logo from '../../assets/img/Logo.png';
import SearchBar from '../Searchbar';
import axios from "axios";

import { UserOutlined } from "@ant-design/icons";

import './styles.css';

const Menu = (props) => {

  const [avatarSrc, setAvatarSrc] = useState("https://simpleicon.com/wp-content/uploads/user1.png");
  const [profileLink, setProfileLink] = useState(`/profile/activity/${sessionStorage.getItem('_id')}`);

  let history = useHistory()

  const HandleLogout = () =>{
      let API_URL = 'http://localhost:3333/logout';
  
      fetch("http://localhost:3333/logout", {
        method: "POST",
        credentials: "include",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
      }).then(response => {
          if (response.status == 204) {
            //NICE
            sessionStorage.clear();
            history.push('/login');
          } else {
            const error = new Error(response.error);
            throw error;
          }
        })
        .catch(err => {console.error(err);alert('Error logging out. Please try again');});   
  }

  const SetUp = () =>{
    setTimeout(function() { //Start the timer
      console.log("INC AV SR")
      console.log(sessionStorage.getItem('img_path'))
      if(sessionStorage.getItem('img_path') != "undefined"){
        setAvatarSrc(sessionStorage.getItem('img_path'))
      }else{
        setAvatarSrc("https://simpleicon.com/wp-content/uploads/user1.png")
      }
      setProfileLink(`/profile/activity/${sessionStorage.getItem('_id')}`)
    }.bind(this), 350)
  }

  const ShowSearchBar = () =>{
    if(!props.HideSearchBar)
      return (<SearchBar/>)
  } 

  return (
    <nav className="Menu" onLoad={SetUp}>
      <Link to="/">
        <img className="Logo" src={Logo} alt="Logo" />
      </Link>
      
      {ShowSearchBar()}

      <div>
        <button class="grey-button logout-button" onClick={HandleLogout}>LOGOUT</button>
        <Link to={profileLink}>
          <img class="avatar" src={avatarSrc}/>
        </Link>
      </div>
    </nav>
  );
}

export default Menu;