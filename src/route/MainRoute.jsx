import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../components/pages/Home/Home';
import Orereo from '../components/pages/Orereo/Orereo';
import NotFound from '../components/pages/NotFound/NotFound';
import VisualAlgo from '../components/pages/VisualAlgo/VisualAlgo';
import Pathfind from '../components/pages/Pathfind/Pathfind';
import CssToJss from '../components/pages/CssToJss/CssToJss';
// import App from '../components/topics/app/App/App';
import Navigation from '../components/topics/NavigationBar/NavigationBar';

const MainRoute = () => (
  <div>
    <Navigation></Navigation>

    {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
    <Switch>
      <Route path="/playground">
        <Home />
      </Route>
      <Route path="/pathfind">
        <Pathfind />
      </Route>
      <Route path="/orereo">
        <Orereo />
      </Route>
      <Route path="/cssjss">
        <CssToJss />
      </Route>
      <Route path="/notfound">
        <NotFound />
      </Route>
      <Route path="/sort">
        <VisualAlgo />
      </Route>
      <Route path="/">
        <Redirect to="/playground" />
      </Route>
    </Switch>
  </div>
);

export default MainRoute;
