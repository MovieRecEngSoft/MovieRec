import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import FilmDetails from './Pages/FilmDetails';


function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" component={Register} />
            <Route path="/profile" component={Profile} />
            <Route path="/movie" component={FilmDetails} />
        </BrowserRouter>
    );
}

export default Routes;