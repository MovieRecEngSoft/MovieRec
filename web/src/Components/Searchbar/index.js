import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";

import Input from "../../Components/Input";
import './styles.css';

const SearchBar = (props) => {
  
  const [query, setQuery] = useState("-");
  const [genre, setGenre] = useState("-");
  const [year, setYear] = useState("-");
  const [rating, setRating] = useState("-");
  
  const [genreList, setGenreList] = useState("");

  let history = useHistory()
  
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        let API_URL = `http://localhost:3333`;
        
        const result = await axios.get(`${API_URL}/genres`);
        console.log(result.data);
        setGenreList(result.data);
      } catch (error) {}
    };
    fetchGenres();
  }, []);

  const PresentGenres = () =>{
    if(!genreList)
      return
    return(
        <div>
          <select onChange={e => setGenre(e.target.value)} id="genres" class="search-genre-filter" name="genres">
            <option value="" selected="selected"></option>
            {genreList.map((genre, index) => {
              return (
                <option value={genre._id}>{genre.name}</option>
              );
            })}           
          </select>
        </div>
    )
  }

  const HandleSearch = () =>{
    // console.log("SEARCHING")
    // console.log(query);
    // console.log(genre);
    // console.log(year);
    // console.log(rating);

    if(props.filters){
      if(query!="" || genre!="" || year!="" || rating!=""){
        history.push(`/search/${query}/${genre}/${year}/${rating}`)
        window.location.reload()
      }
    }else{
      if(query!=""){
          history.push(`/search/${query}`)
          // window.location.reload()
        }
    }
  }

  if(props.filters){
    return (
      <nav className="search-bar-nav">
          <div class="search-bar">
            <input type="text" placeholder="Movie name" onChange={e => setQuery(e.target.value)} />
            {/* <input type="text" placeholder="Movie name" name="search"  onChange={e => setQuery(e.target.value)} required/> */}
            <button class="search-btn"  onClick={HandleSearch}>
              <span>Search</span>
            </button>
          </div>

          <div class="filter-section">
            <div class="filter-sub-section">
              <span>Genre</span>
              {PresentGenres()}
            </div>
            <div class="filter-sub-section">
              <span>Year</span>
              <Input
                className="search-year-filter"
                placeholder="Year"
                type="number"
                min="1920"
                max="2020"
                step="1"
                onChange={(e) => (e.target.value<1920 || e.target.value>2020) ? 2020 : setYear(e.target.value)}
                onInput={(e) => (e.target.value<1920 || e.target.value>2020) ? 2020 : setYear(e.target.value)}
              />
            </div> 
            <div class="filter-sub-section">
              <span>Rating</span>
              <Input
                className="search-rating-filter"
                placeholder="Rating"
                type="number"
                min="0"
                max="10"
                step="0.5"
                onChange={(e) => (e.target.value<0 || e.target.value>10) ? 0 : setRating(e.target.value)}
                onInput={(e) => (e.target.value<0 || e.target.value>10) ? 0 : setRating(e.target.value)}
              />
            </div>
            <div class="filter-sub-section">
              <button class="search-submit-button red-button" onClick={HandleSearch}> SEARCH </button>
            </div>
          </div>
      </nav>
    );
  }else{
    return (
      <nav className="search-bar-nav">

        <div class="search-bar">
          <input type="text" placeholder="Movie name" onChange={e => setQuery(e.target.value)} />
          {/* <input type="text" placeholder="Movie name" name="search"  onChange={e => setQuery(e.target.value)} required/> */}
          <button class="search-btn" onClick={HandleSearch}>

            <span>Search</span>
          </button>
        </div>
      </nav>
    );
  }
}

export default SearchBar;