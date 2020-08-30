import React from 'react';

import Menu from '../../Components/Menu';
import Main from '../../Components/Main';
import Card from '../../Components/Card';
import ReviewItem from '../../Components/Review';
import Comment from '../../Components/Comment';
import getImageAddress from "../../assets/utils/getImageAddress";

import './styles.css';

function Review(){
    const image = getImageAddress("/HORpg5CSkmeQlAolx3bKMrKgfi.jpg");

    return (
      <>
        <Menu />
        <Main background="https://www.xmple.com/wallpaper/highlight-black-red-gradient-linear-2736x1824-c2-000000-8b0000-l-67-a-345-f-21.svg">
          <div className="container-wrapper">
            <div className="row">
              <div className="review-leftcolumn">
                <div className="row">
                  <Card>
                    <h2 className="film-title">
                      <strong>Skyfall - 007</strong>
                    </h2>
                    <br />
                    <ReviewItem
                      className="review-text"
                      text="Sunt in culpa qui officia deserunt mollit anim id est laborum
                      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                      exercitation ullamco. Sunt in culpa qui officia deserunt mollit anim id est laborum
                      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                      exercitation ullamco.
                      Sunt in culpa qui officia deserunt mollit anim id est laborum
                      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                      exercitation ullamco.Sunt in culpa qui officia deserunt mollit anim id est laborum
                      consectetur adipiscing elit.
                      Sunt in culpa qui officia deserunt mollit anim id est laborum
                      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                      exercitation ullamco.Sunt in culpa qui officia deserunt mollit anim id est laborum
                      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                      exercitation ullamco."
                      author="Lorena Mendes"
                      avatar="https://trello-members.s3.amazonaws.com/5ca54b957891488995401310/cd44fb76a31dbd7f303e3feac211c9e3/50.png"
                    />
                    <br />
                  </Card>
                </div>
                <br />
                <h1 className="title-separator">Comments</h1>
                <Card>
                  <Comment
                    text="Sunt in culpa qui officia deserunt mollit anim id est laborum
                        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco."
                    author="Marco Tulio"
                    avatar="https://avatars3.githubusercontent.com/u/213200?s=460&u=c2b5074042aa87fb9561108f95dfc04abcd646b1&v=4"
                  />
                </Card>
                <Card>
                  <Comment
                    text="Sunt in culpa qui officia deserunt mollit anim id est laborum
                        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco."
                    author="Marco Tulio"
                    avatar="https://avatars3.githubusercontent.com/u/213200?s=460&u=c2b5074042aa87fb9561108f95dfc04abcd646b1&v=4"
                  />
                </Card>
                <Card>
                  <Comment
                    text="Sunt in culpa qui officia deserunt mollit anim id est laborum
                        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco."
                    author="Marco Tulio"
                    avatar="https://avatars3.githubusercontent.com/u/213200?s=460&u=c2b5074042aa87fb9561108f95dfc04abcd646b1&v=4"
                  />
                </Card>
                <Card>
                  <Comment
                    text="Sunt in culpa qui officia deserunt mollit anim id est laborum
                        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco."
                    author="Marco Tulio"
                    avatar="https://avatars3.githubusercontent.com/u/213200?s=460&u=c2b5074042aa87fb9561108f95dfc04abcd646b1&v=4"
                  />
                </Card>
                <br />
              </div>
              <div className="review-rightcolumn">
                <Card>
                  <img className="cover" src={image} />
                </Card>
              </div>
            </div>
          </div>
        </Main>
      </>
    );
}

export default Review;