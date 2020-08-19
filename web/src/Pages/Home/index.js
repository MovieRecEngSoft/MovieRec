import React from 'react';
import {Button} from 'antd';
import { Link } from 'react-router-dom';

function Home(){
    return(
        <>  
        <div className="bg-image">
            <div className="page-register">
                <h1>Home Page</h1>
                <Link to="/login">Login</Link><br />
                <Link to="/signup">Signup</Link>
            </div>  
        </div>
        </>
    );
}

export default Home;