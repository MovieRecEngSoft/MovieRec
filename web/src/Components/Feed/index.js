import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import './styles.css';

// Seguir outros usuários
// Como usuário, eu quero poder seguir e poder ser seguido por outras pessoas, 
// para que minhas atividades possam ser vistas pelos outros e que eu possa ver 
// a atividade de pessoas que considero interessantes.

import checkIfUrlExists from "../../assets/utils/checkIfUrlExists";

const Feed = (props) => {

  const [ActivityInfo, setActivityInfo] = useState([]);
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        let ActivityInfoAux = {};
        console.log(props)

        if(props.scope == "followingUsers"){  
          console.log("FL")
          console.log("ACTIVITY RESULT BEGIN")

          let API_URL = `http://localhost:3333/user/followingActivity/?userId=${props.userId}`;
          const result = await axios.get(API_URL);
          console.log(result.data);
          setActivityInfo(result.data);
          
          console.log("ACTIVITY RESULT END")
        }else if(props.scope == "singleUser"){
          console.log("SI")
          console.log("ACTIVITY RESULT BEGIN")

          let API_URL = `http://localhost:3333/user/activity/?userId=${props.userId}`;
          const result = await axios.get(API_URL);
          console.log(result.data);
          setActivityInfo(result.data);
          
          console.log("ACTIVITY RESULT END")
        }

      } catch (error) {}
    };
    fetchActivity();
  }, []);


  function Extract(props){
    return Object.keys(props).map((key) => {
      return(
        <div class="feed-node">
          <div class="avatar-box">
            <div>
              <Link to="/profile/activity">
                <img class="avatar-miniature" src="https://i.imgur.com/UctWXrz.png" />
                {/* <img class="avatar-miniature" src="{props.?}" /> */}
              </Link>
            </div>
          </div>
          <div class="content-box">
            <div class="pre-textual">
              <span>Rusro</span>
              {/* <span>{props.?}</span> */}
              <span class="action">publicou uma nova resenha</span>
              {/* <span class="action">{props.?}</span> */}
            </div>
            <div class="text-content">Even with the challenges of going back to school, Peter and Anthony understand their need for one another, and that together, they can tackle whatever comes their way.</div>
            {/* <div class="text-content">{props.?}</div> */}
          </div>
        </div>
      )
    }); 
  }

  const GetActivityType = (props) => {

    if(props == "like")
      return(<span class="action ">liked a post</span>)

    if(props == "review")
      return(<span class="action">posted a new review</span>)

    if(props == "comment")
      return(<span class="action">posted a new comment</span>)
  }

  const GetContentFormat = (props) => {
    if(props.activityType == "like")
      return(<div class="text-content like-cite">{props.text}</div>)
    return(<div class="text-content">{props.text}</div>)
  }

  return(
    <>
      <div class="feed">
        {ActivityInfo.map((activity,index)=>{return(
          <div class="feed-node">
            <div class="avatar-box">
              <div>
                <Link to={`/profile/activity/${activity._id}`}>
                  <img class="avatar-miniature" src={ (activity.userImgUrl != "") ? activity.userImgUrl : "https://simpleicon.com/wp-content/uploads/user1.png"} />
                </Link>
              </div>
            </div>
            <div class="content-box">
              <div class="pre-textual">
                <span>{activity.username}</span>
                {GetActivityType(activity.activityType)}
              </div>
                {GetContentFormat(activity)}
            </div>
          </div>
        )})}
      </div>
    </>
  );
}

export default Feed;
