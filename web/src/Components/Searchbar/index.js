import React from 'react';
import { Link } from 'react-router-dom';
import { UserOutlined } from "@ant-design/icons";

import './styles.css';

function SearchBar() {
  return (
    <nav className="search-bar-nav">
      <form action="" class="search-bar">
        <input type="search" name="search" pattern=".*\S.*" required/>
        <button class="search-btn" type="submit">
          <span>Search</span>
        </button>
      </form>
    </nav>
  );
}

export default SearchBar;