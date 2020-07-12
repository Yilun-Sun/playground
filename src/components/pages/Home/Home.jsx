import React, { Component } from 'react';
import PlaygroundStyle from './HomeStyle';
import StyledComponent from '../../core/StyledComponent';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import contemplativeReptile from '../../../static/images/Cards/contemplative-reptile.jpg';
import orereoGif from '../../../static/images/Cards/orereo.gif';
import visualAlgoGif from '../../../static/images/Cards/visual-algo.gif';
import snowflakePainterGif from '../../../static/images/Cards/snowflake-painter.gif';
import snowflakeGeneratorGif from '../../../static/images/Cards/snowflake-gen.gif';
import gameOfLifeGif from '../../../static/images/Cards/game_of_life.gif';
import pathfindGif from '../../../static/images/Cards/visual-pathfind.gif';
import constructionImg from '../../../static/images/Cards/construction.png';

import { Redirect } from 'react-router-dom';

// Pravda vítězí
export default class Home extends Component {
  constructor() {
    super();
    this.state = { redirect: null };
  }

  // TODO:
  // 打开页面开启使用教程面板

  componentDidMount() {}

  // FIXME
  // routeChange = () => {
  //   console.log('redirect');
  //   return <Redirect to="/pathfind" />;
  // };

  routeChange = (path) => {
    console.log(`redirect to ${path}`);
    this.setState({ redirect: path });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <StyledComponent styleMap={PlaygroundStyle}>
        {(useStyles) => {
          const classes = useStyles(this.props);
          return (
            <div className={classes.main}>
              <h1 className={classes.header}>Playground</h1>
              <ul className={classes.stage_select_list}>
                <li className={classes.stage_select_list_item}>
                  <Card className={classes.root}>
                    <CardActionArea onClick={() => this.routeChange('/pathfind')}>
                      <CardMedia component="img" className={classes.media} src={pathfindGif} />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Visualized Pathfinding Algorithms
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          Explore and interact with different pathfinding algorithms. See how they work.
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </li>
                <li className={classes.stage_select_list_item}>
                  <Card className={classes.root}>
                    <CardActionArea onClick={() => this.routeChange('/sort')}>
                      <CardMedia component="img" className={classes.media} src={visualAlgoGif} />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Visualized Sorting Algorithms
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          Explore and interact with different sorting algorithms. See how they work.
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </li>
                <li className={classes.stage_select_list_item}>
                  <Card className={classes.root}>
                    <CardActionArea onClick={() => this.routeChange('/pixel')}>
                      <CardMedia component="img" className={classes.media} src={contemplativeReptile} />
                      <CardMedia component="img" className={classes.construction_layer} src={constructionImg} />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Pixel Painter
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          Under construction
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </li>
                <li className={classes.stage_select_list_item}>
                  <Card className={classes.root}>
                    <CardActionArea onClick={() => this.routeChange('/orereo')}>
                      <CardMedia component="img" className={classes.media} src={orereoGif} />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          O-RE-RE-O Builder
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          Build your own oreo with this tool. We know that oreo is two black cookies with a white layer
                          between them. So the black piece called 'o' and the white one called 're'.
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </li>
                <li className={classes.stage_select_list_item}>
                  <Card className={classes.root}>
                    <CardActionArea onClick={() => this.routeChange('/gameoflife')}>
                      <CardMedia component="img" className={classes.media} src={gameOfLifeGif} />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Conway's Game of Life
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          The Game of Life, is a cellular automaton devised by the British mathematician John Horton
                          Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its
                          initial state, requiring no further input.
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </li>
                <li className={classes.stage_select_list_item}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia component="img" className={classes.media} src={snowflakePainterGif} />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Snowflake Painter
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          Under construction
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </li>
                <li className={classes.stage_select_list_item}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia component="img" className={classes.media} src={snowflakeGeneratorGif} />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Snowflake Generator
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          Under construction
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </li>
                <li className={classes.stage_select_list_item}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia component="img" className={classes.media} src={contemplativeReptile} />
                      <CardMedia component="img" className={classes.construction_layer} src={constructionImg} />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Css to Jss
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          Under construction
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </li>
                <li className={classes.stage_select_list_item}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia component="img" className={classes.media} src={contemplativeReptile} />
                      <CardMedia component="img" className={classes.construction_layer} src={constructionImg} />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Max Clique in Graph
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          Under construction
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </li>
                <li className={classes.stage_select_list_item}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia component="img" className={classes.media} src={contemplativeReptile} />
                      <CardMedia component="img" className={classes.construction_layer} src={constructionImg} />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Risk Game Map Editor
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          Under construction
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </li>
              </ul>
            </div>
          );
        }}
      </StyledComponent>
    );
  }
}
