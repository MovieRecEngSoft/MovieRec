import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import FilmDetails from './Pages/FilmDetails';
import Home from './Pages/Home';
import Login from './Pages/Login';
import ProfileActivity from './Pages/Profile/activity.js';
import ProfileLists from './Pages/Profile/lists.js';
import ProfileEditor from './Pages/Profile/edit.js';
import Register from './Pages/Register';
import Review from './Pages/Review';
import Search from './Pages/Search';


function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/movie/:id" component={FilmDetails} />
            <Route path="/profile/edit" component={ProfileEditor} />
            <Route path="/profile/activity" component={ProfileActivity} />
            <Route path="/profile/lists" component={ProfileLists} />
            <Route path="/review" component={Review} />
            <Route path="/signup" component={Register} />
            <Route path="/search" component={Search} />
        </BrowserRouter>
    );
}

export default Routes;