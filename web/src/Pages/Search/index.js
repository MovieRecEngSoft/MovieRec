import React from "react";

import './styles.css';
import Menu from "../../Components/Menu";
import Searchbar from "../../Components/Searchbar";

// Busca por filmes
// Como usuário, eu quero conseguir encontrar os filmes de que gosto a partir do nome, gênero, ano e classificação de outros usuários.

function Search() {
  return (
    <>
      <Menu /> 
      <div class="wrapper">       
      <marquee>WIP</marquee>
      <Searchbar htmlType="submit" name="SearchBar" />
      </div>
    </>
  );
  
}

export default Search;

