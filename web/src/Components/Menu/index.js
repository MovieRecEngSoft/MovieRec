import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/Logo.png';
import { UserOutlined } from "@ant-design/icons";


import './styles.css';

function Menu() {
  return (
    <nav className="Menu">
      <Link to="/">
        <img className="Logo" src={Logo} alt="Logo" />
      </Link>
      <Link to="/login">
        <UserOutlined className="user-icon" />
      </Link>
    </nav>
  );
}

export default Menu;