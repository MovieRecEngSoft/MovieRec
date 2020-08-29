import React from "react";

import './styles.css';
import Main from "../../Components/Main";
import Menu from "../../Components/Menu";
import getImageAddress from "../../assets/utils/getImageAddress";

function FilmDetails(url) {
  const image = getImageAddress("/HORpg5CSkmeQlAolx3bKMrKgfi.jpg");
  
  return (
    <>
      <Menu />
      <Main background="https://www.xmple.com/wallpaper/highlight-black-red-gradient-linear-2736x1824-c2-000000-8b0000-l-67-a-345-f-21.svg">
        <div className="container-wrapper">
          <div className="row">
            <div className="leftcolumn">
              <div className="card">
                <img className="cover" src={image} />
              </div>
            </div>
            <div className="rightcolumn">
              <div className="card">
                <h2 className="film-title">
                  <strong>Skyfall - 007</strong>
                </h2>
                <h3 className="film-details">2012 - Directed by Sam Mendes</h3>
                <p className="review-text">
                  When Bond’s latest assignment goes gravely wrong and agents
                  around the world are exposed, MI6 is attacked forcing M to
                  relocate the agency. These events cause her authority and
                  position to be challenged by Gareth Mallory, the new Chairman
                  of the Intelligence and Security Committee. With MI6 now
                  compromised from both inside and out, M is left with one ally
                  she can trust: Bond. 007 takes to the shadows – aided only by
                  field agent, Eve – following a trail to the mysterious Silva,
                  whose lethal and hidden motives have yet to reveal themselves.
                </p>
                <br />
              </div>
              <div className="card">
                <h2 className="film-title">TITLE HEADING</h2>
                <h5>Title description, Dec 7, 2017</h5>
                <p>
                  Sunt in culpa qui officia deserunt mollit anim id est laborum
                  consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco.
                </p>
              </div>
              <div className="card">
                <h2 className="film-title">TITLE HEADING</h2>
                <h5>Title description, Sep 2, 2017</h5>
                <p>
                  Sunt in culpa qui officia deserunt mollit anim id est laborum
                  consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco.
                </p>
              </div>
              <div className="card">
                <h2 className="film-title">TITLE HEADING</h2>
                <h5>Title description, Sep 2, 2017</h5>
                <div className="fakeimg height200">Image</div>
                <p>Some text..</p>
                <p>
                  Sunt in culpa qui officia deserunt mollit anim id est laborum
                  consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco.
                </p>
              </div>
              <br />
            </div>
          </div>
        </div>
      </Main>
    </>
  );
}

export default FilmDetails;
