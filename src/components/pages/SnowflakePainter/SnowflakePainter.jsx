import React from 'react';

// function outlinedRect(props) {
//     const { ctx, x, y, width, height } = props;
//     ctx.rect(x, y, width, height);
//     ctx.stroke();
// }

// function filledRect(props) {
//     const { ctx, x, y, width, height, color } = props;
//     ctx.fillStyle = color;
//     ctx.fillRect(x, y, width, height);
// }

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
let prevX = 0;
let prevY = 0;

let symmetry = 6;
let angle = 360 / symmetry;
// let saveButton;
// let clearButton;
// let slider;
// let xoff = 0;

var canvasElementOffsetLeft;
var canvasElementOffsetTop;

class SnowflakePainter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    let isMouseDown = false;
  }

  componentDidMount() {
    this.updateCanvas();
    this.drawCoordinateLine();

    var canvasElement = document.getElementById('canvas');
    canvasElementOffsetLeft = canvasElement.offsetLeft;
    canvasElementOffsetTop = canvasElement.offsetTop;
  }
  componentDidUpdate() {
    this.updateCanvas();
  }
  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.translate(width / 2, height / 2);
    ctx.clearRect(0, 0, 800, 800);

    filledCircle({ ctx, x: 0, y: 0, radius: 400, color: '#2B5F75' });
  }

  drawCoordinateLine() {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.strokeStyle = '#FFFFFB';

    for (let i = 0; i < 3; i++) {
      const coorLength = height / 20;
      for (let t = 0; t < 20; t += 2) {
        ctx.moveTo(0, height - coorLength * (t + 11.5));
        ctx.lineTo(0, height - coorLength * (t + 10.5));
      }

      ctx.stroke();
      ctx.rotate((Math.PI * 2) / symmetry);
    }
  }

  handleMouseDown = (event) => {
    console.log('mouse down');

    this.isMouseDown = true;

    // if window is resized
    var canvasElement = document.getElementById('canvas');
    canvasElementOffsetLeft = canvasElement.offsetLeft;
    canvasElementOffsetTop = canvasElement.offsetTop;

    prevX = event.pageX - canvasElementOffsetLeft - width / 2;
    prevY = event.pageY - canvasElementOffsetTop - height / 2;
  };

  handleMouseUp = (event) => {
    console.log('mouse up');

    this.isMouseDown = false;
  };

  handleMouseMove = (event) => {
    // var x = event.clientX - width / 2;
    // var y = event.clientY - height / 2;

    var x = event.pageX - canvasElementOffsetLeft - width / 2;
    var y = event.pageY - canvasElementOffsetTop - height / 2;

    if (x > width / 2 - 10 || x < -width / 2 + 10 || y > height / 2 - 10 || y < -height / 2 + 10) {
      this.isMouseDown = false;
    }

    const ctx = this.refs.canvas.getContext('2d');
    if (this.isMouseDown) {
      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.closePath();
        ctx.scale(-1, 1);
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.closePath();
        ctx.scale(-1, 1);

        ctx.rotate((angle * Math.PI) / 180);
      }

      prevX = x;
      prevY = y;
    }
  };

  clearCanvas() {
    const ctx = document.getElementById('canvas').getContext('2d');
    // Store the current transformation matrix
    ctx.save();

    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, width, height);

    // Restore the transform
    ctx.restore();

    filledCircle({ ctx, x: 0, y: 0, radius: 400, color: '#2B5F75' });

    ctx.strokeStyle = '#FFFFFB';

    for (let i = 0; i < 3; i++) {
      const coorLength = height / 20;
      for (let t = 0; t < 20; t += 2) {
        ctx.moveTo(0, height - coorLength * (t + 11.5));
        ctx.lineTo(0, height - coorLength * (t + 10.5));
      }

      ctx.stroke();
      ctx.rotate((Math.PI * 2) / symmetry);
    }
  }

  render() {
    const clearButtonStyle = {
      // border: 0,
      // borderRadius: '5px',
      // backgroundColor: '#FFFFFF',
      width: '200px',
      height: '60px',
      fontSize: '20px',
      position: 'absolute',
      margin: 'auto',
      left: '0px',
      right: '0px',
      bottom: '20px',
    };

    return (
      <div style={{ backgroundColor: '#445F75', height: '100vh' }}>
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
          Snowflake Painter
        </h1>
        {/* <div style={{ position: 'absolute', left: '100px', right: '100px', top: '100px', bottom: '100px' }}> */}
        <canvas
          id="canvas"
          onMouseUp={this.handleMouseUp}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          ref="canvas"
          width={width}
          height={height}
          style={{ margin: 'auto', position: 'absolute', top: '0', left: '0', right: '0', bottom: '0' }}
        />
        <button onClick={this.clearCanvas} class="btn btn--stripe" style={clearButtonStyle}>
          Clear Canvas
        </button>
        {/* </div> */}
      </div>
    );
  }
}

export default SnowflakePainter;
