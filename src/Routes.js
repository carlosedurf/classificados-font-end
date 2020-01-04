import React from 'react';
import { Switch } from 'react-router-dom';

import RouteHandle from './components/RouteHandle';

import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import AdPage from './pages/AdPage';
import AddAd from './pages/AddAd';
import Ads from './pages/Ads';
import Account from './pages/Account';

export default () => {
    return (
        <Switch>
            <RouteHandle exact path="/">
                <Home />
            </RouteHandle>

            <RouteHandle exact path="/about">
                <About />
            </RouteHandle>

            <RouteHandle exact path="/signin">
                <Signin />
            </RouteHandle>

            <RouteHandle exact path="/signup">
                <Signup />
            </RouteHandle>

            <RouteHandle exact path="/ad/:id">
                <AdPage />
            </RouteHandle>

            <RouteHandle private exact path="/post-an-ad">
                <AddAd />
            </RouteHandle>

            <RouteHandle exact path="/ads">
                <Ads />
            </RouteHandle>

            <RouteHandle private exact path="/my-account">
                <Account />
            </RouteHandle>

            <RouteHandle>
                <NotFound />
            </RouteHandle>
        </Switch>
    );
};