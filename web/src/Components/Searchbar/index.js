import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

import './styles.css';

function SearchBar() {
  
  const [query, setQuery] = useState("");
  
  let history = useHistory()
  
  const HandleSearch = () =>{

  }

  return (
    <nav className="search-bar-nav">
      <form action="" className="search-bar">
        <input type="search" name="search" pattern=".*\S.*" required/>
        <button className="search-btn" type="submit">
          <span>Search</span>
        </button>
      </form>
    </nav>
  );
}

export default SearchBar;