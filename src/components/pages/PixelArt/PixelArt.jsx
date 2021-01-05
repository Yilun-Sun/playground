import React, { Component } from 'react';
import PixelArtStyle from './PixelArtStyle';
import StyledComponent from '../../core/StyledComponent';

import paper, { Shape, Tool, Group } from 'paper';
import Tooltip from '@material-ui/core/Tooltip';

// import Button from '@material-ui/core/Button';

// TODO
//

export default class PixelArt extends Component {
  constructor() {
    super();
    this.state = { picker: [], selected_color_cell: null };
    this.grid = [];
    // this.canvasNodeGroup = undefined;
    this.gridRows = 60;
    this.gridCols = 80;
    this.nodeSize = 10;
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
    this.specialNodesProps = {
      lastRow: undefined,
      lastCol: undefined,
    };
    this.current_picker_color = 'yellow';
  }

  componentDidMount() {
    // setup paper
    paper.setup(this.canvas);
    paper.tools.forEach((tool) => tool.remove());
    const tool = new Tool();

    tool.fixedDistance = this.nodeSize;

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
    console.log('init');
    const rows = this.gridRows;
    const cols = this.gridCols;
    const nodeSize = this.nodeSize;

    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 2; col++) {
        var path = new Shape.Rectangle({
          fillColor: (row + col) % 2 === 0 ? 'white' : '#dddddd',
          topLeft: [(col * nodeSize * this.gridCols) / 2, (row * nodeSize * this.gridRows) / 2],
          size: [(nodeSize * this.gridCols) / 2, (nodeSize * this.gridRows) / 2],
        });
      }
    }

    const colorCells = [];
    for (let i = 0; i < 18; i++) {
      for (let j = 0; j < 6; j++) {
        const newColorCell = (
          <div
            key={`color-cell-${i}-${j}`}
            id={`color-cell-${i}-${j}`}
            // onMouseOver={this.showColor}
            onClick={this.getColorFromColorCell}
            style={{
              position: 'absolute',
              left: `${j * 40}px`,
              top: `${i * 40}px`,
              width: '40px',
              height: '40px',
              backgroundColor: `hsl(${i * 20}, ${100}%, ${30 + j * 8}%)`,
            }}
          ></div>
        );
        colorCells.push(newColorCell);
      }
    }

    this.setState({ picker: colorCells });
    console.log(this.state.picker);
  };

  getColorFromColorCell = (e) => {
    // console.log(e.target.style.width);

    this.brush.color = e.target.style.backgroundColor;
  };

  onMouseDown = (event) => {
    var c = this.canvas.getContext('2d');
    var p = c.getImageData(event.point.x, event.point.y, 1, 1).data;
    console.log(`rgb(${p[0]}, ${p[1]}, ${p[2]})`);
    this.onMouseDrag(event);
  };

  onMouseDrag = (event) => {
    const currentX = event.point.x;
    const currentY = event.point.y;
    // const canvasWidth = this.canvas.width;
    // const canvasHeight = this.canvas.height;
    const nodeSize = this.nodeSize;
    const currentRow = Math.floor(currentY / nodeSize) + 1;
    const currentCol = Math.floor(currentX / nodeSize) + 1;
    // const brush = this.brush;

    var rect = new Shape.Rectangle({
      fillColor: this.brush.color,
      topLeft: [currentCol * nodeSize, currentRow * nodeSize],
      size: nodeSize,
    });
  };

  isCoorsChange = (currentRow, currentCol) => {
    const specialNodesProps = this.specialNodesProps;
    if (specialNodesProps.lastRow !== currentRow || specialNodesProps.lastCol !== currentCol) {
      return true;
    }
    return false;
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
                <div className={classes.picker}>{this.state.picker}</div>
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
              <button onClick={() => console.log(this.state.picker)}>test</button>
              {/* <Button onClick={() => console.log(this.grid)}>grid</Button>
              <Button onClick={() => this.startRender()}>On/Off</Button> */}
            </div>
          );
        }}
      </StyledComponent>
    );
  }
}
