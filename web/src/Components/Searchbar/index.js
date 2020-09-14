import React from 'react';
import { Link } from 'react-router-dom';
import { UserOutlined } from "@ant-design/icons";

import './styles.css';

function Searchbar() {
  return (
    <nav className="Searchbar">
      <form action="" class="search-bar">
        <input type="search" name="search" pattern=".*\S.*" required/>
        <button class="search-btn" type="submit">
          <span>Search</span>
        </button>
      </form>
    </nav>
  );
}

export default Searchbar;