import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../../Components/Carousel';
import Menu from '../../Components/Menu';

import dadosIniciais from "../../data/dados_iniciais.json";

function Home(){
    return (
      <>
        <Menu />
        <div className="bg-image">
          <div className="">
            
            <br />
            <Carousel category={dadosIniciais.categorias[0]} />
            <br /><br />
            <Carousel category={dadosIniciais.categorias[1]} />
          
          </div>
        </div>
      </>
    );
}

export default Home;