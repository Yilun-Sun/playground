import React from 'react';
import SnowflakeGenStyle from './SnowflakeGenStyle';
import StyledComponent from '../../core/StyledComponent';

function filledCircle(props) {
  const { ctx, x, y, radius, color } = props;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}

let width = 800;
let height = 800;

let symmetry = 6;

const radius = 3;
const randomRange = 30;
const speed = 2;

var particleNum = 500;

var particles = [];

var canvasElementOffsetLeft;
var canvasElementOffsetTop;

// TODO:
// 1. 可以有内部空心设置
// 2. 设置角度范围
// 3. 粒子样式
// 4. 保存按钮

var currentParticle;

// function randomNum() {
//     const min = -randomRange;
//     const max = randomRange;
//     let rand = min + Math.random() * (max - min);
//     return rand;
// }

function randomSquareDistribution() {
  let u = Math.random() * 2 - 1.0;

  if (u >= 0) return u * u;
  else return -u * u;
}

function noCollision(particle) {
  for (let i = 0; i < particles.length; i++) {
    const distance = Math.sqrt(
      (particle.x - particles[i].x) * (particle.x - particles[i].x) +
        (particle.y - particles[i].y) * (particle.y - particles[i].y)
    );

    if (distance < 2 * radius) {
      return false;
    }
  }

  return true;
}

function createParticle(x, y, vx, vy, radius, ctx) {
  var object = new Object();
  object.x = x;
  object.y = y;
  object.vx = vx;
  object.vy = vy;
  object.ctx = ctx;
  object.radius = radius;

  // let isFinished = false;

  object.setCoords = function (newX, newY) {
    this.x = newX;
    this.y = newY;
  };

  object.draw = function () {
    while (this.y < 0 && noCollision(object)) {
      this.x += this.vx;
      this.y += this.vy;
    }
    // move follow the speed direction
    if (this.y < 0 && noCollision(object)) {
    } else {
      if (!this.isFinished) {
        this.isFinished = true;

        drawSymmetryFlakes(object);
      } else {
        // create new particle
        if (particleNum > 0) {
          particleNum--;
          let speedX = randomSquareDistribution();
          let speedY = Math.sqrt(4 - speedX * speedX);
          var particle1 = createParticle(
            (speedX * 500) / Math.sqrt(3),
            -500,
            -speedX * speed,
            speedY * speed,
            radius,
            ctx
          );
          currentParticle = particle1;
        } else if (particleNum === 0) {
          console.log('Generating complete');
        }
      }
    }
  };

  object.show = function () {
    filledCircle({ ctx: this.ctx, x: this.x, y: this.y, radius: this.radius, color: '#FFFFFF' });
  };

  return object;
}

function drawCoordinateLine() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  filledCircle({ ctx, x: 0, y: 0, radius: 400 - 5, color: '#2C2C2C' });

  ctx.strokeStyle = '#FFFFFB';
}

function draw() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(-400, -400, 800, 800);
  drawCoordinateLine();

  // show finished particles
  for (let i = 0; i < particles.length; i++) {
    particles[i].show();
  }

  currentParticle.draw();

  var raf = window.requestAnimationFrame(draw);
}

function drawSymmetryFlakes(particle) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = '#FFFFFF';

  const tempX = particle.x;
  const tempY = particle.y;
  const distance = Math.sqrt(particle.x * particle.x + particle.y * particle.y);

  let tempAngle = Math.atan2(tempY, tempX);

  for (let i = 0; i < 6; i++) {
    var particle3 = createParticle(distance * Math.cos(tempAngle), distance * Math.sin(tempAngle), 0, 0, radius, ctx);

    // particle1.isFinished = true;
    particles.push(particle3);

    var particle4 = createParticle(-distance * Math.cos(tempAngle), distance * Math.sin(tempAngle), 0, 0, radius, ctx);

    particles.push(particle4);

    tempAngle += (Math.PI * 2) / symmetry;
  }
}

class SnowflakeGen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.updateCanvas();

    var canvasElement = document.getElementById('canvas');
    canvasElementOffsetLeft = canvasElement.offsetLeft;
    canvasElementOffsetTop = canvasElement.offsetTop;

    this.generatSnowflake();
  }
  componentDidUpdate() {
    this.updateCanvas();
  }
  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.translate(width / 2, height / 2);
    ctx.clearRect(0, 0, 800, 800);

    filledCircle({ ctx, x: 0, y: 0, radius: 400, color: '#2C2C2C' });
  }

  generatSnowflake() {
    const ctx = this.refs.canvas.getContext('2d');

    particleNum--;
    var particle1 = createParticle(-500, -500, speed, speed, radius, ctx);
    currentParticle = particle1;

    draw();
  }

  render() {
    return (
      <div style={{ backgroundColor: 'black', height: '100vh' }}>
        <h1
          style={{
            margin: '0px 0px 20px 0px',
            fontSize: '48px',
            textAlign: 'center',
            paddingTop: '15px',
            paddingBottom: '5px',
            color: '#fafafa',
          }}
        >
          Snowflake Generator
        </h1>
        {/* <div style={{ position: 'absolute', left: '100px', right: '100px', top: '100px', bottom: '100px' }}> */}
        <canvas
          id="canvas"
          ref="canvas"
          width={width}
          height={height}
          style={{ margin: 'auto', position: 'absolute', top: '0', left: '0', right: '0', bottom: '0' }}
        />
        {/* </div> */}
      </div>
    );
  }
}

export default SnowflakeGen;

// import React, { Component } from 'react';
// import SnowflakeGenStyle from './SnowflakeGenStyle';
// import StyledComponent from '../../core/StyledComponent';

// import paper, { Shape } from 'paper';
// // import Button from '@material-ui/core/Button';

// // TODO

// export default class SnowflakeGen extends Component {
//   constructor() {
//     super();
//     this.state = {};
//     this.isRendering = false;
//     this.grid = [];
//     this.nodeSize = 7;
//     this.nodeColor = 'white';
//   }

//   componentDidMount() {
//     // setup paper
//     paper.setup(this.canvas);
//     paper.tools.forEach((tool) => tool.remove());
//     paper.view.onResize = () => {
//       this.initCanvas();
//     };

//     this.initCanvas();

//     this.startRender();
//   }

//   initCanvas = () => {
//     console.log('initing canvas');
//     paper.setup(this.canvas);

//     this.createRandomGrid();
//   };

//   createRandomGrid = () => {
//     const nodeSize = this.nodeSize;
//     const canvasWidth = this.canvas.width;
//     const canvasHeight = this.canvas.height;
//     const rows = Math.floor(canvasHeight / nodeSize);
//     const cols = Math.floor(canvasWidth / nodeSize);
//     const offsetLeft = Math.floor((canvasWidth - nodeSize * cols) / 2);
//     const offsetTop = Math.floor((canvasHeight - nodeSize * rows) / 2);

//     console.log(canvasWidth - nodeSize * cols);

//     for (let i = 0; i < rows; i++) {
//       const row = [];
//       for (let j = 0; j < cols; j++) {
//         const value = Math.random() < 0.5 ? 0 : 1;
//         row.push(value);

//         if (value === 1) {
//           new Shape.Rectangle({
//             fillColor: 'white',
//             topLeft: [j * nodeSize + offsetLeft, i * nodeSize + offsetTop],
//             size: nodeSize,
//           });
//         }
//         // canvasNodeGroup.addChild(path);
//       }
//       this.grid.push(row);
//     }

//     // this.canvasNodeGroup = canvasNodeGroup;
//   };

//   renderGame = () => {
//     if (this.isRendering) {
//       //   console.log('rendering');

//       const rows = this.grid.length;
//       const cols = this.grid[0].length;

//       const nodeSize = this.nodeSize;
//       const canvasWidth = this.canvas.width;
//       const canvasHeight = this.canvas.height;
//       const offsetLeft = Math.floor((canvasWidth - nodeSize * cols) / 2);
//       const offsetTop = Math.floor((canvasHeight - nodeSize * rows) / 2);

//       const newGrid = [];
//       for (let i = 0; i < rows; i++) {
//         const row = [];
//         for (let j = 0; j < cols; j++) {
//           row.push(0);
//         }
//         newGrid.push(row);
//       }

//       // reset paper
//       paper.setup(this.canvas);
//       for (let i = 0; i < rows; i++) {
//         for (let j = 0; j < cols; j++) {
//           const hasNext = this.hasLiveInNextGen(i, j);
//           // const current = this.grid[i][j];
//           //   if (current === 0 && hasNext) {
//           //     newGrid[i][j] = 1;
//           //     const path = this.canvasNodeGroup.children[`${i}-${j}`];
//           //     path.fillColor = 'white';
//           //   } else if (current === 1 && !hasNext) {
//           //     const path = this.canvasNodeGroup.children[`${i}-${j}`];
//           //     path.fillColor = 'black';
//           //   } else if (current === 1 && hasNext) {
//           //     newGrid[i][j] = 1;
//           //   }
//           if (hasNext) {
//             newGrid[i][j] = 1;
//             this.createNode(i, j, nodeSize, offsetLeft, offsetTop);
//           }
//         }
//       }

//       this.grid = newGrid;
//     }
//   };

//   createNode = (i, j, nodeSize, offsetLeft, offsetTop) => {
//     new Shape.Rectangle({
//       fillColor: 'white',
//       topLeft: [j * nodeSize + offsetLeft, i * nodeSize + offsetTop],
//       size: nodeSize,
//     });
//   };

//   hasLiveInNextGen = (i, j) => {
//     // get neighbours lives
//     const grid = this.grid;
//     var lives = 0;
//     // horizontally, vertically
//     lives += j - 1 < 0 ? 0 : grid[i][j - 1];
//     lives += j + 1 > grid[0].length - 1 ? 0 : grid[i][j + 1];
//     lives += i - 1 < 0 ? 0 : grid[i - 1][j];
//     lives += i + 1 > grid.length - 1 ? 0 : grid[i + 1][j];
//     // diagonally
//     lives += i - 1 < 0 || j - 1 < 0 ? 0 : grid[i - 1][j - 1];
//     lives += i - 1 < 0 || j + 1 > grid[0].length - 1 ? 0 : grid[i - 1][j + 1];
//     lives += i + 1 > grid.length - 1 || j - 1 < 0 ? 0 : grid[i + 1][j - 1];
//     lives += i + 1 > grid.length - 1 || j + 1 > grid[0].length - 1 ? 0 : grid[i + 1][j + 1];

//     if (grid[i][j] === 1 && (lives === 2 || lives === 3)) {
//       return true;
//     } else if (grid[i][j] === 0 && lives === 3) {
//       return true;
//     } else {
//       return false;
//     }
//   };

//   startRender = () => {
//     this.isRendering = !this.isRendering;
//     // let timerId = setInterval(() => this.renderGame(), 100);
//     setInterval(() => this.renderGame(), 100);
//   };

//   render() {
//     return (
//       <StyledComponent styleMap={SnowflakeGenStyle}>
//         {(useStyles) => {
//           const classes = useStyles(this.props);
//           return (
//             <div className={classes.main}>
//               <h1 className={classes.header}>Snowflake Generator</h1>
//               <div className={classes.main_canvas}>
//                 <canvas
//                   resize="true"
//                   style={{ width: '100%', height: '100%' }}
//                   ref={(el) => {
//                     this.canvas = el;
//                   }}
//                 />
//               </div>
//               {/* <Button onClick={() => console.log(this.grid)}>grid</Button>
//               <Button onClick={() => this.startRender()}>On/Off</Button> */}
//             </div>
//           );
//         }}
//       </StyledComponent>
//     );
//   }
// }
