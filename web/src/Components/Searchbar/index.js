import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

import './styles.css';

function SearchBar() {
  
  const [query, setQuery] = useState("");
  
  let history = useHistory()
  
  const HandleSearch = () =>{
    console.log("SEARCHING")
    console.log(query);
    if(query!=""){
      history.push(`/search/${query}`)
    }
  }

  return (
    <nav className="search-bar-nav">
      <div class="search-bar">
        <input type="text" onChange={e => setQuery(e.target.value)} />
        {/* <input type="text" name="search"  onChange={e => setQuery(e.target.value)} required/> */}
        <button class="search-btn" onClick={HandleSearch}>
          <span>Search</span>
        </button>
      </div>
    </nav>
  );
}

export default SearchBar;