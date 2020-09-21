import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";

import Card from "../../Components/Card";
import Menu from "../../Components/Menu";
import Searchbar from "../../Components/Searchbar";
import getImageAddress from "../../assets/utils/getImageAddress";
import checkIfUrlExists from "../../assets/utils/checkIfUrlExists";

import './styles.css';

// Busca por filmes
// Como usuário, eu quero conseguir encontrar os filmes de que gosto a partir do nome, gênero, ano e classificação de outros usuários.

function Search() {

  let { query } = useParams();
  let history = useHistory()

  // console.log(query)
  
  const [ResultList, setResultList] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        let ResultListAux = {};
        let API_URL = `http://localhost:3333`;
        
        const result = await axios.get(`${API_URL}/movies/?names=${query}`);
        setResultList(result.data);
        console.log(result.data);
      } catch (error) {}
    };
    fetchResults();
  }, []);

  const FormatDate = (props) => {
    var months = [
      'January', 'February', 'March', 'April', 'May',
      'June', 'July', 'August', 'September',
      'October', 'November', 'December'
      ];
      
    return(
      <div class="film-result-date"><span>{months[parseInt(props.substring(5,7),10)-1]} - {props.substring(0,4)}</span></div>
    )
  }

  return (
    <>
      <Menu HideSearchBar={true}/> 
      <div class="wrapper">       
        <div class="search-block">
          <Searchbar htmlType="submit" name="SearchBar" />
          <div class="filter-section">
            <div class="grey-button">Name</div>
            <div class="grey-button">Genre</div>
            <div class="grey-button">Year</div> 
            <div class="grey-button">Rating</div>
          </div>
        </div>
      
        <div class="result-block">
          {ResultList.map((result,index)=>{return (
            <div class="result-node">
              <div class="movie-box">
                <Link to={`/movie/${result._id}`}>
                  <img
                    class="movie-img"
                    src={
                      checkIfUrlExists(getImageAddress(result.poster_path))
                        ? getImageAddress(result.poster_path)
                        : "https://pngimage.net/wp-content/uploads/2018/06/image-not-available-png-5.png"
                    }
                  />
                </Link>
              </div>
              <div class="content-box">
                <Card>
                  <h2 className="film-title">
                    <strong>{result.title}</strong>
                  </h2>
                  {FormatDate(result.release_date)}
                  <h3 className="film-details">
                    {result.score != null ? result.score : "-"}
                  </h3>
                  <div class="film-result-genres">
                    {result.genres.map((genre, key) => {
                      return <span>{genre.name} </span>;
                    })}
                  </div>
                  <br />
                </Card>
              </div>
            </div>
          );})}
        </div>
      </div>
    </>
  );
  
}

export default Search;

