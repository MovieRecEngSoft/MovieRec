import React, { useEffect, useState } from "react";
import axios from "axios";

import './styles.css';
import { Link, useParams } from "react-router-dom";
import Menu from "../../Components/Menu";
import Feed from "../../Components/Feed";
import movies from "../../data/movies.json";
import Carousel from '../../Components/Carousel';
import ProfileHeader from './header.js';

// import checkIfUrlExists from "../../assets/utils/checkIfUrlExists";

// Gerenciar perfil
// Como usuário, eu quero ter um ambiente no sistema que represente meu perfil, onde possa apresentar uma imagem como avatar e compartilhar informações sobre mim.
// Seguir outros usuários
// Como usuário, eu quero poder seguir e poder ser seguido por outras pessoas, 
// para que minhas atividades possam ser vistas pelos outros e que eu possa ver 
// a atividade de pessoas que considero interessantes.

const ProfileLists = (props) => {
  
  let { id } = useParams();

  // ALTERNATIVE USING FETCH
  // const HandleListsFetch = () => {
  //   let API_URL = 'http://localhost:3333/movieLists';
  //   fetch(API_URL, {
  //     method: "GET",
  //     credentials: "include",
  //     headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //     }
  //   }).then(response => response.json())
  //   .then(response => {
  //       if (response.status > 300) {
  //         const error = new Error(response.error);
  //         throw error;
  //       } else {
  //         console.log("LISTS RRR")
  //         console.log(response)
  //       }
  //     })
  //     .catch(err => {console.error(err);alert('Error logging out. Please try again');});   
  // }
  // HandleListsFetch()

  const [ListsInfo, setListsInfo] = useState([]);
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        let ListsInfoAux = {};
        console.log(props)
          let API_URL = `http://localhost:3333/movieLists`;
          const result = await axios.get(API_URL,{withCredentials: true});
          setListsInfo(result.data);
      } catch (error) {}
    };
    fetchActivity();
  }, []);

  return (
    <>
      <Menu /> 
      <div class="wrapper">
        <div class="profile-block">
        <ProfileHeader activeSection={1} userId={id}/>
          {ListsInfo.map((list, index) => {
            return (
              <div class="listsection">
                <div class="carousel-wrapper">
                  <Carousel category={movies.categorias[0]} />
                  {/* <Carousel category={list.?} /> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
  
}

export default ProfileLists;
