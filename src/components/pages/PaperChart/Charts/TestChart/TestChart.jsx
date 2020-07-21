import React, { Component } from 'react';
import TestChartStyle from './TestChartStyle';
import StyledComponent from '../../../../core/StyledComponent';

import paper, { Shape } from 'paper';

// import Button from '@material-ui/core/Button';

// TODO

export default class TestChart extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    // setup paper
    paper.setup(this.canvas);
    paper.tools.forEach((tool) => tool.remove());
    // paper.view.onResize = () => {
    //   this.initCanvas();
    // };

    this.initCanvas();
  }

  initCanvas = () => {
    new Shape.Rectangle({
      fillColor: 'red',
      center: [100, 100],
      size: 50,
    });
  };

  render() {
    return (
      <StyledComponent styleMap={TestChartStyle}>
        {(useStyles) => {
          const classes = useStyles(this.props);
          return (
            <div className={classes.main}>
              <h1 className={classes.header}>Test Chart</h1>
              <div className={classes.main_canvas}>
                <canvas
                  resize="true"
                  style={{ width: '100%', height: '200px' }}
                  ref={(el) => {
                    this.canvas = el;
                  }}
                />
              </div>
              {/* <Button onClick={() => console.log(this.grid)}>grid</Button>
              <Button onClick={() => this.startRender()}>On/Off</Button> */}
            </div>
          );
        }}
      </StyledComponent>
    );
  }
}
