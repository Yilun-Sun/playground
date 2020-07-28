import React, { Component } from 'react';
import PaperChartStyle from './PaperChartStyle';
import StyledComponent from '../../core/StyledComponent';

import paper, { Shape } from 'paper';
import TestChart from './Charts/TestChart/TestChart';

// import Button from '@material-ui/core/Button';

// TODO

export default class PaperChart extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    // setup paper
    // paper.setup(this.canvas);
    // paper.tools.forEach((tool) => tool.remove());
    // paper.view.onResize = () => {
    //   this.initCanvas();
    // };
    // this.initCanvas();
  }

  render() {
    return (
      <StyledComponent styleMap={PaperChartStyle}>
        {(useStyles) => {
          const classes = useStyles(this.props);
          return (
            <div className={classes.main}>
              <h1 className={classes.header}>Paper Chart</h1>
              <div className={classes.charts_containter}>
                <TestChart></TestChart>
              </div>
              {/* <div className={classes.main_canvas}>
                <canvas
                  resize="true"
                  style={{ width: '100%', height: '100%' }}
                  ref={(el) => {
                    this.canvas = el;
                  }}
                />
              </div> */}
              {/* <Button onClick={() => console.log(this.grid)}>grid</Button>
              <Button onClick={() => this.startRender()}>On/Off</Button> */}
            </div>
          );
        }}
      </StyledComponent>
    );
  }
}
