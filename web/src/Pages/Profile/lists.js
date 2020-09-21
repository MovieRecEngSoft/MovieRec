import React, { useEffect, useState } from "react";
import axios from "axios";

import './styles.css';
import { Link, useParams } from "react-router-dom";
import Menu from "../../Components/Menu";
import Feed from "../../Components/Feed";
import movies from "../../data/movies.json";
import Carousel from '../../Components/Carousel';
import ProfileHeader from './header.js';
import Input from "../../Components/Input";

// import checkIfUrlExists from "../../assets/utils/checkIfUrlExists";

// Gerenciar perfil
// Como usuário, eu quero ter um ambiente no sistema que represente meu perfil, onde possa apresentar uma imagem como avatar e compartilhar informações sobre mim.
// Seguir outros usuários
// Como usuário, eu quero poder seguir e poder ser seguido por outras pessoas, 
// para que minhas atividades possam ser vistas pelos outros e que eu possa ver 
// a atividade de pessoas que considero interessantes.

function createCategory(title, movies) {
  var category = {};
  category.title = title;
  category.movies = movies;

  return category;
}

const ProfileLists = (props) => {
  
  let { id } = useParams();

  function addList() {
    fetch("http://localhost:3333/movieList", {
      method: "PUT",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: input
      }),
    })
      .then((response) => {
        window.location.reload(false);
      })
      .catch((response) => {
        // Error
      });
  }

  const [lists, setLists] = useState([]);
  useEffect(() => {
    const fetchLists = async () => {
      try {
        let listsAux = [];
        let API_URL = `http://localhost:3333`;

        const result = await axios.get(`${API_URL}/movieLists`,{withCredentials: true});
        listsAux = result.data;

        setLists(listsAux);
      } catch (error) {}
    };
    
    fetchLists();
  }, []);
  
  console.log(lists);
  
  const [select, setSelect] = useState("Favorites");
  const [list, setList] = useState([]);
  useEffect(() => {
    const fetchList = async () => {
      try {
        let listAux = [];
        let API_URL = `http://localhost:3333`;

        const result = await axios.get(
          `${API_URL}/movieList/?name=${select}&page=1&limit=10`,
          { withCredentials: true }
        );
        listAux = result.data;
        
        setList(listAux);
      } catch (error) {}
    };
    
    fetchList();
  }, [select]);
  
  const [input, setInput] = useState("");
  let [categoryList, setCategoryList] = useState({});
  
  categoryList = createCategory(select, list);
  
  console.log(list)

  return (
    <>
      <Menu />
      <div class="wrapper">
        <div class="profile-block">
          <ProfileHeader activeSection={1} userId={id} />
          <div class="feed">
            <br />
            <div className="row">
              <select className="select-list" value={select} onInput={(e) => setSelect(e.target.value)}>
                {lists.map((list, index) => {
                  return <option key={index}>{list.name}</option>;
                })}
                ;
              </select>
            </div>
            <div className="row">
              {categoryList !== undefined && (
                <Carousel className="list-carousel" category={categoryList} />
              )}
            </div>
            <div className="row add-list">
              <Input
                placeholder="List name"
                type="text"
                value={input}
                onInput={(e) => setInput(e.target.value)}
              />
              <br />
              <button className="add-comment-button" onClick={() => addList()}>
                ADD LIST
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  
}

export default ProfileLists;
