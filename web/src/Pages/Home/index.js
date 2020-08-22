import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../../Components/Carousel';
import Menu from '../../Components/Menu';

import dadosIniciais from "../../data/dados_iniciais.json";
import Main from '../../Components/Main';

function Home(){
    return (
      <>
        <Menu />
        <Main background="https://nit.pt/wp-content/uploads/2019/12/76674270a70d88a6fbfb0428f55d10cb-754x394.jpg">
          <br />
          <br />
          <br />
          <br />
          <Carousel category={dadosIniciais.categorias[0]} />

          <br />
          <Carousel category={dadosIniciais.categorias[2]} />

          <br />
          <Carousel category={dadosIniciais.categorias[3]} />

          <br />
          <Carousel category={dadosIniciais.categorias[4]} />
        </Main>
      </>
    );
}

export default Home;