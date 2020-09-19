import React from "react";

import Input from "../../Components/Input";
import Main from "../../Components/Main";
import Menu from "../../Components/Menu";
import getImageAddress from "../../assets/utils/getImageAddress";
import Card from "../../Components/Card";

import { LikeOutlined, FullscreenOutlined } from "@ant-design/icons";

import './styles.css';
import Review from "../../Components/Review";
import { Link } from "react-router-dom";

function FilmDetails(url) {
  const image = getImageAddress("/nLvUdqgPgm3F85NMCii9gVFUcet.jpg");
  
  function shoot() {
    alert("Review!");
    console.log("Review!");
  }

  return (
    <>
      <Menu />
      <div className="wrapper">
        <div className="info-block">
          <div className="row">
            <div className="detail-leftcolumn">
                <img className="cover" src={image} />
            </div>
            <div className="detail-rightcolumn">
              
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

              <br />
              <h1 className="title-separator">Reviews</h1>

              <Card>
                <div className="comment-session">
                  <Input className="add-comment-input" />
                  <button className="add-comment-button" onClick={shoot}>
                    Add review
                  </button>
                </div>
              </Card>

              <Card>
                <Review
                  text="Sunt in culpa qui officia deserunt mollit anim id est laborum
                      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                      exercitation ullamco."
                  author="Lorena Mendes"
                  avatar="https://trello-members.s3.amazonaws.com/5ca54b957891488995401310/cd44fb76a31dbd7f303e3feac211c9e3/50.png"
                />
                <Link to="/review">
                  <div className="row expand-row">
                    <FullscreenOutlined className="expand-icon" />
                  </div>
                </Link>
              </Card>

              <Card>
                <Review
                  type="review-item"
                  text="Sunt in culpa qui officia deserunt mollit anim id est laborum
                          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                          exercitation ullamco.Sunt in culpa qui officia deserunt mollit anim id est laborum
                          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                          exercitation ullamco.Sunt in culpa qui officia deserunt mollit anim id est laborum
                          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                          exercitation ullamco."
                  author="Lorena Mendes"
                  avatar="https://trello-members.s3.amazonaws.com/5ca54b957891488995401310/cd44fb76a31dbd7f303e3feac211c9e3/50.png"
                />
                <Link to="/review">
                  <div className="row expand-row">
                    <FullscreenOutlined className="expand-icon" />
                  </div>
                </Link>
              </Card>

              <Card>
                <Review
                  text="Sunt in culpa qui officia deserunt mollit anim id est laborum
                          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                          exercitation ullamco."
                  author="Lorena Mendes"
                  avatar="https://trello-members.s3.amazonaws.com/5ca54b957891488995401310/cd44fb76a31dbd7f303e3feac211c9e3/50.png"
                />
                <Link to="/review">
                  <div className="row expand-row">
                    <FullscreenOutlined className="expand-icon" />
                  </div>
                </Link>
              </Card>

              <Card>
                <Review
                  text="Sunt in culpa qui officia deserunt mollit anim id est laborum
                          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                          exercitation ullamco."
                  author="Lorena Mendes"
                  avatar="https://trello-members.s3.amazonaws.com/5ca54b957891488995401310/cd44fb76a31dbd7f303e3feac211c9e3/50.png"
                />
                <Link to="/review">
                  <div className="row expand-row">
                    <FullscreenOutlined className="expand-icon" />
                  </div>
                </Link>
              </Card>
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilmDetails;
