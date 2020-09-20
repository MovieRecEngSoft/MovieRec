import React, { useState } from 'react';
import { Link, Redirect, useHistory } from "react-router-dom";
import Logo from '../../assets/img/Logo.png';
import SearchBar from '../Searchbar';
import axios from "axios";

import { UserOutlined } from "@ant-design/icons";

import './styles.css';

function Menu() {

  const [avatarSrc, setAvatarSrc] = useState("");

  let history = useHistory()

  const HandleLogout = () =>{
      let API_URL = 'http://localhost:3333/logout';
  
      axios.post(API_URL, { withCredentials: true })
      .then(response => {
        if (response.status == 200) {
          //NICE
          // sessionStorage.clear();
          history.push('/login');
        } else {
          const error = new Error(response.error);
          throw error;
        }
      })
      .catch(err => {console.error(err);alert('Error logging out. Please try again');});    
  }

  const SetUp = () =>{
    setAvatarSrc(sessionStorage.getItem('img_path'))
  }

  return (
    <nav className="Menu" onLoad={SetUp}>
      <Link to="/">
        <img className="Logo" src={Logo} alt="Logo" />
      </Link>
      <SearchBar/>
      {/* <Link to="/login">
        <UserOutlined className="user-icon" />
      </Link> */}
      <div>
        <button class="grey-button logout-button" onClick={HandleLogout}>LOGOUT</button>
        <img class="avatar" src={avatarSrc}/>
      </div>
    </nav>
  );
}

export default Menu;