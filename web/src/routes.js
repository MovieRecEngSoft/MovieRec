import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './Pages/Login';
import RegisterForm from './Pages/RegisterForm';
import Home from './Pages/Home';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" component={RegisterForm} />
        </BrowserRouter>
    );
}

export default Routes;