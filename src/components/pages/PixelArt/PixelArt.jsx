import React, { Component } from 'react';
import PixelArtStyle from './PixelArtStyle';
import StyledComponent from '../../core/StyledComponent';

import paper, { Shape, Tool, Group } from 'paper';
// import Button from '@material-ui/core/Button';

// TODO
//

export default class PixelArt extends Component {
  constructor() {
    super();
    this.state = {};
    this.grid = [];
    this.canvasNodeGroup = undefined;
    this.gridRows = 30;
    this.gridCols = 40;
    this.nodeSize = 20;
    this.canvasWidth = this.gridCols * this.nodeSize;
    this.canvasHeight = this.gridRows * this.nodeSize;
    this.brush = {
      type: 'pen',
      color: 'black',
      radius: 1,
      brushDict: { empty: 'white', wall: 'black', start: '#20e82a', finish: 'red' },
      setType: function (typeName) {
        this.type = typeName;
        this.color = this.brushDict[typeName];
        console.log(this.color);
      },
    };
  }

  componentDidMount() {
    // setup paper
    paper.setup(this.canvas);
    paper.tools.forEach((tool) => tool.remove());
    const tool = new Tool();
    tool.onMouseDrag = (event) => {
      this.onMouseDrag(event);
    };
    tool.onMouseDown = (event) => {
      this.onMouseDown(event);
    };
    // paper.view.onResize = () => {
    //   this.initCanvas();
    // };

    this.initCanvas();
  }

  initCanvas = () => {
    const rows = this.gridRows;
    const cols = this.gridCols;
    const nodeSize = this.nodeSize;
    const canvasNodeGroup = new Group();
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const path = new Shape.Rectangle({
          fillColor: (row + col) % 2 === 0 ? 'white' : 'grey',
          topLeft: [col * nodeSize, row * nodeSize],
          size: nodeSize,
          name: `${row}-${col}`,
        });
        canvasNodeGroup.addChild(path);
      }
    }
    this.canvasNodeGroup = canvasNodeGroup;
    console.log(this.canvasNodeGroup);
  };

  onMouseDown = (event) => {
    this.onMouseDrag(event);
  };

  onMouseDrag = (event) => {
    const currentX = event.point.x;
    const currentY = event.point.y;
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;
    const nodeSize = this.nodeSize;
    const currentRow = Math.floor(currentY / nodeSize);
    const currentCol = Math.floor(currentX / nodeSize);
    const brush = this.brush;
    var canDraw = true;

    if (currentX > canvasWidth || currentX < 0 || currentY > canvasHeight || currentY < 0) {
      return;
    }

    // if pointed node is undefined, return
    // if (!this.grid[currentRow][currentCol]) return;

    // if (this.grid[currentRow][currentCol] === 'start' || this.grid[currentRow][currentCol] === 'finish') return;

    // TODO:
    if (canDraw) {
      const path = this.canvasNodeGroup.children[`${currentRow}-${currentCol}`];
      path.fillColor = brush.color;
    }
  };

  render() {
    return (
      <StyledComponent styleMap={PixelArtStyle}>
        {(useStyles) => {
          const classes = useStyles(this.props);
          return (
            <div className={classes.main}>
              <h1 className={classes.header}>Pixel Painter</h1>
              <div className={classes.div_picker}>
                <canvas
                  resize="true"
                  className={classes.picker}
                  ref={(el) => {
                    this.canvas = el;
                  }}
                />
              </div>
              <div id="div_canvas" className={classes.div_canvas}>
                <canvas
                  resize="true"
                  className={classes.canvas}
                  style={{
                    width: `${this.canvasWidth}px`,
                    height: `${this.canvasHeight}px`,
                    marginTop: `-${this.canvasHeight / 2}px`,
                    marginLeft: `-${this.canvasWidth / 2}px`,
                  }}
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
