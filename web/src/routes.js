import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Activity from './Pages/Activity';
import FilmDetails from './Pages/FilmDetails';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import ProfileEditor from './Pages/Profile/edit.js';
import Register from './Pages/Register';
import Review from './Pages/Review';
import Search from './Pages/Search';


function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Home} />
            <Route path="/activity" component={Activity} />
            <Route path="/login" component={Login} />
            <Route path="/movie" component={FilmDetails} />
            {/* <Route path="/profile/edit" component={ProfileEditor} /> */}
            <Route path="/editProfile" component={ProfileEditor} />
            <Route path="/profile" component={Profile} />
            <Route path="/review" component={Review} />
            <Route path="/signup" component={Register} />
            <Route path="/search" component={Search} />
        </BrowserRouter>
    );
}

export default Routes;