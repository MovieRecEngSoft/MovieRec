import React from "react";


import './styles.css';
import Menu from "../../Components/Menu";

function Profile() {
  return (
    <>
    {/* Pode apagar esse menu que coloquei aqui, se quiser */}
      <Menu /> 
      <div class="wrapper">
        <div class="profile-block">
          <div class="pfsection imgsection">
            <div class="pfimgblock">
              <img class="avatar" src="https://i.imgur.com/UctWXrz.png" />
            </div>
          </div>
          <div class="pfsection txtsection">
            <div class="txtblk1">
              <span>Rusro</span>
            </div>
            <div class="txtblk2">
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum et dolor vitae sapien ullamcorper suscipit at vitae
                odio. Nunc in dignissim enim. Fusce venenatis sagittis ipsum,
                vitae elementum metus fringilla congue. Curabitur condimentum
                libero orci, eget imperdiet purus consectetur eget.
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  
}

export default Profile;
