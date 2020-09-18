import React from "react";

import './styles.css';
import Menu from "../../Components/Menu";
import Searchbar from "../../Components/Searchbar";
import { Link } from "react-router-dom";
import Card from "../../Components/Card";
import getImageAddress from "../../assets/utils/getImageAddress";

// Busca por filmes
// Como usuário, eu quero conseguir encontrar os filmes de que gosto a partir do nome, gênero, ano e classificação de outros usuários.

function Search() {
  const image = getImageAddress("/nLvUdqgPgm3F85NMCii9gVFUcet.jpg");

  return (
    <>
      <Menu /> 
      <div class="wrapper">       
      {/* <Searchbar htmlType="submit" name="SearchBar" /> */}
        <div class="result-block">
          <div class="result-node">
            <div class="movie-box">
              <Link to="/movie">
                <img class="movie-img" src={image} />
              </Link> 
            </div>
            <div class="content-box">
              <Card>
                <h2 className="film-title">
                  <strong>Skyfall - 007</strong>
                </h2>
                <h3 className="film-details">2012 - Directed by Sam Mendes</h3>
                <p className="summary">
                  When Bond’s latest assignment goes gravely wrong and agents
                  around the world are exposed, MI6 is attacked forcing M to
                  relocate the agency. These events cause her authority and
                  position to be challenged by Gareth Mallory, the new Chairman of
                  the Intelligence and Security Committee. With MI6 now
                  compromised from both inside and out, M is left with one ally
                  she can trust: Bond. 007 takes to the shadows – aided only by
                  field agent, Eve – following a trail to the mysterious Silva,
                  whose lethal and hidden motives have yet to reveal themselves.
                </p>
                <br />
              </Card>

            </div>
          </div>
          <div class="result-node">
            <div class="movie-box">
              <Link to="/movie">
                <img class="movie-img" src={image} />
              </Link> 
            </div>
            <div class="content-box">
              <Card>
                <h2 className="film-title">
                  <strong>Skyfall - 007</strong>
                </h2>
                <h3 className="film-details">2012 - Directed by Sam Mendes</h3>
                <p className="summary">
                  When Bond’s latest assignment goes gravely wrong and agents
                  around the world are exposed, MI6 is attacked forcing M to
                  relocate the agency. These events cause her authority and
                  position to be challenged by Gareth Mallory, the new Chairman of
                  the Intelligence and Security Committee. With MI6 now
                  compromised from both inside and out, M is left with one ally
                  she can trust: Bond. 007 takes to the shadows – aided only by
                  field agent, Eve – following a trail to the mysterious Silva,
                  whose lethal and hidden motives have yet to reveal themselves.
                </p>
                <br />
              </Card>

            </div>
          </div>
        </div>
      </div>
    </>
  );
  
}

export default Search;

