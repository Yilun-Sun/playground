import React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import Home from '../components/pages/Home/Home';
import Orereo from '../components/pages/Orereo/Orereo';
import NotFound from '../components/pages/NotFound/NotFound';
// import App from '../components/topics/app/App/App';
import Navigation from '../components/topics/NavigationBar/NavigationBar';

const MainRoute = () => (
  <div>
    <Navigation></Navigation>

    {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
    <Switch>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/orereo">
        <Orereo />
      </Route>
      <Route path="/notfound">
        <NotFound />
      </Route>
      <Route path="/">
        <Redirect to="/home" />
      </Route>
    </Switch>
  </div>
);

export default MainRoute;
