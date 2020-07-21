import React, { Component } from 'react';
import StyledComponent from '../../core/StyledComponent';
import paper from 'paper';
import TemplateStyle from './TemplateStyle';

// FIXME
// replace all Template to a new name

export default class Template extends Component {
  constructor() {
    super();
    this.state = {};
    this.isRendering = false;
    this.grid = [];
    this.nodeSize = 7;
    this.nodeColor = 'white';
  }

  componentDidMount() {
    // setup paper
    paper.setup(this.canvas);
    paper.tools.forEach((tool) => tool.remove());
    paper.view.onResize = () => {
      this.initCanvas();
    };

    this.initCanvas();
  }

  initCanvas = () => {
    console.log('initing canvas');
    paper.setup(this.canvas);
  };

  render() {
    return (
      <StyledComponent styleMap={TemplateStyle}>
        {(useStyles) => {
          const classes = useStyles(this.props);
          return (
            <div className={classes.main}>
              <h1 className={classes.header}>Playground Template</h1>
              <div className={classes.main_canvas}>
                <canvas
                  resize="true"
                  style={{ width: '100%', height: '100%' }}
                  ref={(el) => {
                    this.canvas = el;
                  }}
                />
              </div>
            </div>
          );
        }}
      </StyledComponent>
    );
  }
}
