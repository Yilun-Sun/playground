import React, { Component } from 'react';
import GameOfLifeStyle from './GameOfLifeStyle';
import StyledComponent from '../../core/StyledComponent';

import paper, { Shape } from 'paper';

// import Button from '@material-ui/core/Button';

// TODO
// show cases
// final states
// 在多少gen之后到达稳定/循环态
// 调整各种参数 开局random值 等

// FIXME 改为原生canvas试试呢 提升性能

export default class GameOfLife extends Component {
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

    this.startRender();
  }

  initCanvas = () => {
    console.log('initing canvas');
    paper.setup(this.canvas);

    this.createRandomGrid();
  };

  createRandomGrid = () => {
    const nodeSize = this.nodeSize;
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;
    const rows = Math.floor(canvasHeight / nodeSize);
    const cols = Math.floor(canvasWidth / nodeSize);
    const offsetLeft = Math.floor((canvasWidth - nodeSize * cols) / 2);
    const offsetTop = Math.floor((canvasHeight - nodeSize * rows) / 2);

    console.log(canvasWidth - nodeSize * cols);

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        const value = Math.random() < 0.5 ? 0 : 1;
        row.push(value);

        if (value === 1) {
          new Shape.Rectangle({
            fillColor: 'white',
            topLeft: [j * nodeSize + offsetLeft, i * nodeSize + offsetTop],
            size: nodeSize,
          });
        }
        // canvasNodeGroup.addChild(path);
      }
      this.grid.push(row);
    }

    // this.canvasNodeGroup = canvasNodeGroup;
  };

  renderGame = () => {
    if (this.isRendering) {
      //   console.log('rendering');

      const rows = this.grid.length;
      const cols = this.grid[0].length;

      const nodeSize = this.nodeSize;
      const canvasWidth = this.canvas.width;
      const canvasHeight = this.canvas.height;
      const offsetLeft = Math.floor((canvasWidth - nodeSize * cols) / 2);
      const offsetTop = Math.floor((canvasHeight - nodeSize * rows) / 2);

      const newGrid = [];
      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
          row.push(0);
        }
        newGrid.push(row);
      }

      // reset paper
      paper.setup(this.canvas);
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const hasNext = this.hasLiveInNextGen(i, j);
          // const current = this.grid[i][j];
          //   if (current === 0 && hasNext) {
          //     newGrid[i][j] = 1;
          //     const path = this.canvasNodeGroup.children[`${i}-${j}`];
          //     path.fillColor = 'white';
          //   } else if (current === 1 && !hasNext) {
          //     const path = this.canvasNodeGroup.children[`${i}-${j}`];
          //     path.fillColor = 'black';
          //   } else if (current === 1 && hasNext) {
          //     newGrid[i][j] = 1;
          //   }
          if (hasNext) {
            newGrid[i][j] = 1;
            this.createNode(i, j, nodeSize, offsetLeft, offsetTop);
          }
        }
      }

      this.grid = newGrid;
    }
  };

  createNode = (i, j, nodeSize, offsetLeft, offsetTop) => {
    new Shape.Rectangle({
      fillColor: 'white',
      topLeft: [j * nodeSize + offsetLeft, i * nodeSize + offsetTop],
      size: nodeSize,
    });
  };

  hasLiveInNextGen = (i, j) => {
    // get neighbours lives
    const grid = this.grid;
    var lives = 0;
    // horizontally, vertically
    lives += j - 1 < 0 ? 0 : grid[i][j - 1];
    lives += j + 1 > grid[0].length - 1 ? 0 : grid[i][j + 1];
    lives += i - 1 < 0 ? 0 : grid[i - 1][j];
    lives += i + 1 > grid.length - 1 ? 0 : grid[i + 1][j];
    // diagonally
    lives += i - 1 < 0 || j - 1 < 0 ? 0 : grid[i - 1][j - 1];
    lives += i - 1 < 0 || j + 1 > grid[0].length - 1 ? 0 : grid[i - 1][j + 1];
    lives += i + 1 > grid.length - 1 || j - 1 < 0 ? 0 : grid[i + 1][j - 1];
    lives += i + 1 > grid.length - 1 || j + 1 > grid[0].length - 1 ? 0 : grid[i + 1][j + 1];

    if (grid[i][j] === 1 && (lives === 2 || lives === 3)) {
      return true;
    } else if (grid[i][j] === 0 && lives === 3) {
      return true;
    } else {
      return false;
    }
  };

  startRender = () => {
    this.isRendering = !this.isRendering;
    // let timerId = setInterval(() => this.renderGame(), 100);
    setInterval(() => this.renderGame(), 100);
  };

  render() {
    return (
      <StyledComponent styleMap={GameOfLifeStyle}>
        {(useStyles) => {
          const classes = useStyles(this.props);
          return (
            <div className={classes.main}>
              <h1 className={classes.header}>Conway's Game Of Life</h1>
              <div className={classes.main_canvas}>
                <canvas
                  resize="true"
                  style={{ width: '100%', height: '100%' }}
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
