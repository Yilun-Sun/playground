import React, { Component } from 'react';
import PlaygroundStyle from './HomeStyle';
import StyledComponent from '../../core/StyledComponent';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import contemplativeReptile from '../../../static/images/Cards/contemplative-reptile.jpg';
import orereoGif from '../../../static/images/Cards/orereo.gif';
import visualAlgoGif from '../../../static/images/Cards/visual-algo.gif';
import snowflakePainterGif from '../../../static/images/Cards/snowflake-painter.gif';
import snowflakeGeneratorGif from '../../../static/images/Cards/snowflake-gen.gif';
import gameOfLifeImg from '../../../static/images/Cards/game_of_life.png';
import gameOfLifeGif from '../../../static/images/Cards/game_of_life.gif';
import pathfindGif from '../../../static/images/Cards/visual-pathfind.gif';
import constructionImg from '../../../static/images/Cards/construction.png';

// Pravda vítězí
export default class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  // TODO:
  // 打开页面开启使用教程面板

  componentDidMount() {}

  render() {
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
                    <CardActionArea
                      onClick={() => {
                        window.location.href = '/pathfind';
                      }}
                    >
                      <CardMedia
                        component="img"
                        className={classes.media}
                        src={pathfindGif}
                        alt={'contemplativeReptile'}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Visualized Pathfinding Algorithms
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          Explore and interact with different pathfinding algorithms. See how they work.
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    {/* <CardActions>
                      <Button size="small" color="primary">
                        Share
                      </Button>
                      <Button size="small" color="primary">
                        Learn More
                      </Button>
                    </CardActions> */}
                  </Card>
                </li>
                <li className={classes.stage_select_list_item}>
                  <Card className={classes.root}>
                    <CardActionArea
                      onClick={() => {
                        window.location.href = '/visual-sort-algo';
                      }}
                    >
                      <CardMedia
                        component="img"
                        className={classes.media}
                        src={visualAlgoGif}
                        alt={'contemplativeReptile'}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Visualized Sorting Algorithms
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          Explore and interact with different sorting algorithms. See how they work.
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    {/* <CardActions>
                      <Button size="small" color="primary">
                        Share
                      </Button>
                      <Button size="small" color="primary">
                        Learn More
                      </Button>
                    </CardActions> */}
                  </Card>
                </li>
                <li className={classes.stage_select_list_item}>
                  <Card className={classes.root}>
                    <CardActionArea
                      onClick={() => {
                        window.location.href = '/orereo';
                      }}
                    >
                      <CardMedia
                        component="img"
                        className={classes.media}
                        src={orereoGif}
                        alt={'contemplativeReptile'}
                        title="Contemplative Reptile"
                      />
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
                    {/* <CardActions>
                      <Button size="small" color="primary">
                        Share
                      </Button>
                      <Button size="small" color="primary">
                        Learn More
                      </Button>
                    </CardActions> */}
                  </Card>
                </li>
                <li className={classes.stage_select_list_item}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        className={classes.media}
                        src={gameOfLifeGif}
                        alt={'contemplativeReptile'}
                        title="Contemplative Reptile"
                      />
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
                    {/* <CardActions>
                      <Button size="small" color="primary">
                        Share
                      </Button>
                      <Button size="small" color="primary">
                        Learn More
                      </Button>
                    </CardActions> */}
                  </Card>
                </li>
                <li className={classes.stage_select_list_item}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        className={classes.media}
                        src={snowflakePainterGif}
                        alt={'contemplativeReptile'}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Snowflake Painter
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across
                          all continents except Antarctica
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    {/* <CardActions>
                      <Button size="small" color="primary">
                        Share
                      </Button>
                      <Button size="small" color="primary">
                        Learn More
                      </Button>
                    </CardActions> */}
                  </Card>
                </li>
                <li className={classes.stage_select_list_item}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        className={classes.media}
                        src={snowflakeGeneratorGif}
                        alt={'contemplativeReptile'}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Snowflake Generator
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across
                          all continents except Antarctica
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    {/* <CardActions>
                      <Button size="small" color="primary">
                        Share
                      </Button>
                      <Button size="small" color="primary">
                        Learn More
                      </Button>
                    </CardActions> */}
                  </Card>
                </li>
                <li className={classes.stage_select_list_item}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        className={classes.media}
                        src={contemplativeReptile}
                        alt={'contemplativeReptile'}
                        title="Contemplative Reptile"
                      />
                      <CardMedia component="img" className={classes.construction_layer} src={constructionImg} />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Css to Jss
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across
                          all continents except Antarctica
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    {/* <CardActions>
                      <Button size="small" color="primary">
                        Share
                      </Button>
                      <Button size="small" color="primary">
                        Learn More
                      </Button>
                    </CardActions> */}
                  </Card>
                </li>
                <li className={classes.stage_select_list_item}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        className={classes.media}
                        src={contemplativeReptile}
                        alt={'contemplativeReptile'}
                        title="Contemplative Reptile"
                      />
                      <CardMedia component="img" className={classes.construction_layer} src={constructionImg} />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Max Clique in Graph
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across
                          all continents except Antarctica
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    {/* <CardActions>
                      <Button size="small" color="primary">
                        Share
                      </Button>
                      <Button size="small" color="primary">
                        Learn More
                      </Button>
                    </CardActions> */}
                  </Card>
                </li>
                <li className={classes.stage_select_list_item}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        className={classes.media}
                        src={contemplativeReptile}
                        alt={'contemplativeReptile'}
                        title="Contemplative Reptile"
                      />
                      <CardMedia component="img" className={classes.construction_layer} src={constructionImg} />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Pixel Painter
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across
                          all continents except Antarctica
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    {/* <CardActions>
                      <Button size="small" color="primary">
                        Share
                      </Button>
                      <Button size="small" color="primary">
                        Learn More
                      </Button>
                    </CardActions> */}
                  </Card>
                </li>
                <li className={classes.stage_select_list_item}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        className={classes.media}
                        src={contemplativeReptile}
                        alt={'contemplativeReptile'}
                        title="Contemplative Reptile"
                      />
                      <CardMedia component="img" className={classes.construction_layer} src={constructionImg} />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Risk Game Map Editor
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across
                          all continents except Antarctica
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    {/* <CardActions>
                      <Button size="small" color="primary">
                        Share
                      </Button>
                      <Button size="small" color="primary">
                        Learn More
                      </Button>
                    </CardActions> */}
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
