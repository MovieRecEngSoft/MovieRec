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
        <Main background="https://d1yn1kh78jj1rr.cloudfront.net/image/thumbnail/rDtN98Qoishumwih/dark-red-blurred-background_mkP0t-_thumb.jpg">
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
          <br />
        </Main>
      </>
    );
}

export default Home;