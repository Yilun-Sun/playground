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
import GameOfLife from '../components/pages/GameOfLife/GameOfLife';
import PixelArt from '../components/pages/PixelArt/PixelArt';
import SnowflakeGen from '../components/pages/SnowflakeGen/SnowflakeGen';
import SnowflakePainter from '../components/pages/SnowflakePainter/SnowflakePainter';
import PaperChart from '../components/pages/PaperChart/PaperChart';
import StyledMarkdown from '../components/pages/StyledMarkdown/StyledMarkdown';
import Tanky from '../components/pages/Tanky/Tanky';

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
      <Route path="/gameoflife">
        <GameOfLife />
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
      <Route path="/pixel">
        <PixelArt />
      </Route>
      <Route path="/snow-gen">
        <SnowflakeGen />
      </Route>
      <Route path="/snow-paint">
        <SnowflakePainter />
      </Route>
      <Route path="/style-md">
        <StyledMarkdown />
      </Route>
      <Route path="/tanky">
        <Tanky />
      </Route>
      <Route path="/chart" component={PaperChart}></Route>
      <Route exact path="/">
        <Redirect to="/playground" />
      </Route>
    </Switch>
  </div>
);

export default MainRoute;
