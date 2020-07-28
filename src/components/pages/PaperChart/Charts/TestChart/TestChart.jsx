import React, { Component } from 'react';
import TestChartStyle from './TestChartStyle';
import StyledComponent from '../../../../core/StyledComponent';

import paper, { Shape, PointText, Point, Path, Tool, Size } from 'paper';
import Tooltip from '@material-ui/core/Tooltip';
import color from '../../PaperChartCommonStyle';
// import Button from '@material-ui/core/Button';

// TODO
// 添加悬浮显示数据

var text_data = [
  { name: 'E', value: 0.12702 },
  { name: 'T', value: 0.09056 },
  { name: 'A', value: 0.08167 },
  { name: 'O', value: 0.07507 },
  { name: 'I', value: 0.06966 },
  { name: 'N', value: 0.06749 },
  { name: 'S', value: 0.06327 },
  { name: 'H', value: 0.06094 },
  { name: 'R', value: 0.05987 },
  { name: 'D', value: 0.04253 },
  { name: 'L', value: 0.04025 },
  { name: 'C', value: 0.02782 },
  { name: 'U', value: 0.02758 },
  { name: 'M', value: 0.02406 },
  { name: 'W', value: 0.0236 },
  { name: 'F', value: 0.02288 },
  { name: 'G', value: 0.02015 },
  { name: 'Y', value: 0.01974 },
  { name: 'P', value: 0.01929 },
  { name: 'B', value: 0.01492 },
  { name: 'V', value: 0.00978 },
  { name: 'K', value: 0.00772 },
  { name: 'J', value: 0.00153 },
  { name: 'X', value: 0.0015 },
  { name: 'Q', value: 0.00095 },
  { name: 'Z', value: 0.00074 },
];

const offsetMark = 40;
const gapPrecent = 0.2;
const smallMarkLength = 4;

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
    // new Shape.Rectangle({
    //   fillColor: 'red',
    //   center: [100, 100],
    //   size: 50,
    // });
    let maxValue = Number.MIN_VALUE;
    let minValue = Number.MAX_VALUE;
    const arrayLength = text_data.length;

    for (let i = 0; i < text_data.length; i++) {
      let obj = text_data[i];
      for (let key in obj) {
        let attrName = key;
        let attrValue = obj[key];
        if (attrName === 'value') {
          maxValue = Math.max(maxValue, attrValue);
          minValue = Math.min(minValue, attrValue);
        }
      }
    }

    var tempMaxValue = maxValue;
    var multiLevel = 1;
    if (tempMaxValue >= 100) {
      while (tempMaxValue >= 100) {
        tempMaxValue = tempMaxValue / 10;
        multiLevel *= 10;
      }
    } else if (tempMaxValue <= 10) {
      while (tempMaxValue <= 10) {
        tempMaxValue = tempMaxValue * 10;
        multiLevel /= 10;
      }
    }
    const leftMaxValue = Math.ceil(tempMaxValue / 5) * 5;
    console.log('temp ' + leftMaxValue * multiLevel);

    const barSize = (this.canvas.width - 2 * offsetMark) / (arrayLength * (1 + gapPrecent));
    // const gapSize = barSize / 5;
    const unitHeight = (this.canvas.height - 2 * offsetMark) / (leftMaxValue * multiLevel);

    for (let i = 0; i < 6; i++) {
      const text = new PointText(
        new Point(
          offsetMark - smallMarkLength - 1,
          this.canvas.height - offsetMark - (i * (this.canvas.height - 2 * offsetMark)) / 5 + 5
        )
      );
      text.justification = 'right';
      text.fillColor = color.grey.dark;
      text.content = ((leftMaxValue * multiLevel) / 5) * i;

      const from = new Point(
        offsetMark,
        this.canvas.height - offsetMark - (i * (this.canvas.height - 2 * offsetMark)) / 5
      );
      const to = new Point(
        offsetMark - smallMarkLength,
        this.canvas.height - offsetMark - (i * (this.canvas.height - 2 * offsetMark)) / 5
      );
      const path = new Path.Line(from, to);
      path.strokeColor = color.grey.dark;

      const line_from = new Point(
        offsetMark,
        this.canvas.height - offsetMark - (i * (this.canvas.height - 2 * offsetMark)) / 5
      );
      const line_to = new Point(
        this.canvas.width - offsetMark + smallMarkLength,
        this.canvas.height - offsetMark - (i * (this.canvas.height - 2 * offsetMark)) / 5
      );
      const line_path = new Path.Line(line_from, line_to);
      line_path.strokeColor = color.cloud.dark;
    }

    for (let i = 0; i < text_data.length; i++) {
      let obj = text_data[i];
      for (let key in obj) {
        let attrName = key;
        let attrValue = obj[key];
        if (attrName === 'value') {
          var path = new Shape.Rectangle({
            fillColor: color.blue.light,
            bottomLeft: [offsetMark + i * (barSize * (1 + gapPrecent)), this.canvas.height - offsetMark],
            size: [barSize, unitHeight * attrValue],
            name: `bar-${i}`,
          });

          const backTip = new Shape.Rectangle({
            fillColor: color.cloud.dark,
            bottomLeft: [
              offsetMark + i * (barSize * (1 + gapPrecent)) - (barSize * gapPrecent) / 2,
              this.canvas.height - offsetMark,
            ],
            size: [barSize * (1 + gapPrecent), this.canvas.height - 2 * offsetMark],
            opacity: 0.3,
            visible: false,
          });
          backTip.sendToBack();
          const tool_tip = new Shape.Rectangle({
            fillColor: color.grey.dark,
            center: [
              offsetMark + i * (barSize * (1 + gapPrecent)) + barSize / 2,
              this.canvas.height - offsetMark - unitHeight * attrValue - 2 * smallMarkLength - 5,
            ],
            size: [50, 20],
            visible: false,
            radius: new Size(3, 3),
            opacity: 0.8,
          });
          const info = new PointText(
            new Point(
              offsetMark + i * (barSize * (1 + gapPrecent)) + barSize / 2,
              this.canvas.height - offsetMark - unitHeight * attrValue - 2 * smallMarkLength
            )
          );
          info.justification = 'center';
          info.fillColor = color.cloud.light;
          info.content = attrValue;
          info.visible = false;
          info.opacity = 0.8;
          path.on('mouseenter', function () {
            this.fillColor = color.blue.dark;
            info.visible = true;
            tool_tip.visible = true;
            backTip.visible = true;
          });
          path.on('mouseleave', function () {
            this.fillColor = color.blue.light;
            info.visible = false;
            tool_tip.visible = false;
            backTip.visible = false;
          });
        }
        if (attrName === 'name') {
          const text = new PointText(
            new Point(offsetMark + i * (barSize * (1 + gapPrecent)) + barSize / 2, this.canvas.height - offsetMark + 15)
          );
          text.justification = 'center';
          text.fillColor = color.grey.dark;
          text.content = attrValue;

          const from = new Point(
            offsetMark + i * (barSize * (1 + gapPrecent)) + barSize / 2,
            this.canvas.height - offsetMark
          );
          const to = new Point(
            offsetMark + i * (barSize * (1 + gapPrecent)) + barSize / 2,
            this.canvas.height - offsetMark + smallMarkLength
          );
          const path = new Path.Line(from, to);
          path.strokeColor = color.grey.dark;
        }
      }
    }

    // this.drawMark(true);
    this.drawMark(false, false, true, true);

    console.log(`${barSize} ${unitHeight}`);
  };

  drawMark() {
    const argNum = arguments.length;
    var markTop = false;
    var markBottom = false;
    var markLeft = false;
    var markRight = false;
    if (argNum === 1) {
      markTop = arguments[0];
      markBottom = arguments[0];
      markLeft = arguments[0];
      markRight = arguments[0];
    } else if (argNum === 4) {
      markTop = arguments[0];
      markRight = arguments[1];
      markBottom = arguments[2];
      markLeft = arguments[3];
    } else {
      console.log('calling draw mark error');
    }

    if (markTop) {
      const from = new Point(offsetMark - smallMarkLength, offsetMark - 1);
      const to = new Point(this.canvas.width - offsetMark + smallMarkLength, offsetMark - 1);
      const path = new Path.Line(from, to);
      path.strokeColor = color.grey.dark;
    }
    if (markRight) {
      const from = new Point(this.canvas.width - offsetMark + 1, offsetMark - smallMarkLength);
      const to = new Point(this.canvas.width - offsetMark + 1, this.canvas.height - offsetMark + smallMarkLength);
      const path = new Path.Line(from, to);
      path.strokeColor = color.grey.dark;
    }
    if (markBottom) {
      const from = new Point(offsetMark - smallMarkLength, this.canvas.height - offsetMark + 1);
      const to = new Point(this.canvas.width - offsetMark + smallMarkLength, this.canvas.height - offsetMark + 1);
      const path = new Path.Line(from, to);
      path.strokeColor = color.grey.dark;
    }
    if (markLeft) {
      const from = new Point(offsetMark - 1, offsetMark - smallMarkLength);
      const to = new Point(offsetMark - 1, this.canvas.height - offsetMark + smallMarkLength);
      const path = new Path.Line(from, to);
      path.strokeColor = color.grey.dark;
    }
  }

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
                  className={classes.canvas}
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
