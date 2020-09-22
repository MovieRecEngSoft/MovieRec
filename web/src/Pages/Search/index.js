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

  let {query, genre, year, rating} = useParams();

  let history = useHistory()
  
  const [ResultList, setResultList] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        let API_URL = `http://localhost:3333`;
        let urlRequest = `${API_URL}/movies/?`;
        if(query !== '-')
          urlRequest += `names=${query}`
        if (genre && genre !== '-')
          urlRequest += `&genres=${genre}`
        if (year !== '-'){
          urlRequest += `&date_gte=${year}`
          urlRequest += `&date_lt=${year + 1}`
        }
        if (rating!== '-'){
          urlRequest += `&score=${rating}`
        }
        const result = await axios.get(urlRequest);
        setResultList(result.data);
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
          <Searchbar htmlType="submit" name="SearchBar" filters={true} />          
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

