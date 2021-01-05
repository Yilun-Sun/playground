import React, { Component } from 'react';
import LineChartStyle from './LineChartStyle';
import StyledComponent from '../../../../core/StyledComponent';

import paper, { Shape, PointText, Point, Path } from 'paper';
// import Tooltip from '@material-ui/core/Tooltip';
import color from '../../PaperChartCommonStyle';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';

// TODO
// 添加悬浮显示数据

var data = [
  { month: 'Jan', city: 'Tokyo', value: 7 },
  { month: 'Jan', city: 'London', value: 3.9 },
  { month: 'Feb', city: 'Tokyo', value: 6.9 },
  { month: 'Feb', city: 'London', value: 4.2 },
  { month: 'Mar', city: 'Tokyo', value: 9.5 },
  { month: 'Mar', city: 'London', value: 5.7 },
  { month: 'Apr', city: 'Tokyo', value: 14.5 },
  { month: 'Apr', city: 'London', value: 8.5 },
  { month: 'May', city: 'Tokyo', value: 18.4 },
  { month: 'May', city: 'London', value: 11.9 },
  { month: 'Jun', city: 'Tokyo', value: 21.5 },
  { month: 'Jun', city: 'London', value: 15.2 },
  { month: 'Jul', city: 'Tokyo', value: 25.2 },
  { month: 'Jul', city: 'London', value: 17 },
  { month: 'Aug', city: 'Tokyo', value: 26.5 },
  { month: 'Aug', city: 'London', value: 16.6 },
  { month: 'Sep', city: 'Tokyo', value: 23.3 },
  { month: 'Sep', city: 'London', value: 14.2 },
  { month: 'Oct', city: 'Tokyo', value: 18.3 },
  { month: 'Oct', city: 'London', value: 10.3 },
  { month: 'Nov', city: 'Tokyo', value: 13.9 },
  { month: 'Nov', city: 'London', value: 6.6 },
  { month: 'Dec', city: 'Tokyo', value: 9.6 },
  { month: 'Dec', city: 'London', value: 4.8 },
];

const offsetMark = 40;
const smallMarkLength = 4;
// const minValue = 0;

export default class LineChart extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    // setup paper
    paper.setup(this.canvas);
    paper.tools.forEach((tool) => tool.remove());

    this.initCanvas();
  }

  initCanvas = () => {
    let maxValue = Number.MIN_VALUE;
    let minValue = Number.MAX_VALUE;
    const arrayLength = data.length;

    for (let i = 0; i < data.length; i++) {
      let obj = data[i];
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
    // const leftMaxValue = Math.ceil(tempMaxValue / 5) * 5;
    const leftMaxValue = this.drawGrid(tempMaxValue, multiLevel);
    console.log('temp ' + leftMaxValue * multiLevel);

    const pointGap = ((this.canvas.width - 2 * offsetMark) / arrayLength) * 2;
    const unitHeight = (this.canvas.height - 2 * offsetMark) / (leftMaxValue * multiLevel);

    // draw line
    // var line = new Path();
    // line.strokeColor = color.blue.dark;
    // line.strokeWidth = 3;
    var line_1 = new Path();
    line_1.strokeColor = color.blue.dark;
    line_1.strokeWidth = 2;

    var line_2 = new Path();
    line_2.strokeColor = color.cyan.dark;
    line_2.strokeWidth = 2;

    var line_1_point_num = 0;
    var line_2_point_num = 0;
    for (let i = 0; i < data.length; i++) {
      let point = data[i];

      let index;

      if (point['city'] === 'London') {
        const text = new PointText(
          new Point(offsetMark + line_1_point_num * pointGap + pointGap / 2, this.canvas.height - offsetMark + 15)
        );
        text.justification = 'center';
        text.fillColor = color.grey.dark;
        text.content = point['month'];

        const from = new Point(
          offsetMark + line_1_point_num * pointGap + pointGap / 2,
          this.canvas.height - offsetMark
        );
        const to = new Point(
          offsetMark + line_1_point_num * pointGap + pointGap / 2,
          this.canvas.height - offsetMark + smallMarkLength
        );
        const path = new Path.Line(from, to);
        path.strokeColor = color.grey.dark;
      }

      if (point['city'] === 'London') {
        index = line_1_point_num;
        line_1_point_num++;
      } else if (point['city'] === 'Tokyo') {
        index = line_2_point_num;
        line_2_point_num++;
      }

      const center = new Point(
        offsetMark + (index + 0.5) * pointGap,
        this.canvas.height - offsetMark - unitHeight * point['value']
      );

      var myCircle = new Path.Circle(center, 3);
      myCircle.strokeColor = color.cloud.light;

      if (point['city'] === 'London') {
        line_1.add(center);
        myCircle.fillColor = color.blue.light;
      } else if (point['city'] === 'Tokyo') {
        line_2.add(center);
        myCircle.fillColor = color.cyan.light;
      }

      // const tool_tip = new Shape.Rectangle({
      //   fillColor: color.grey.dark,
      //   center: [
      //     offsetMark + index * pointGap + pointGap / 2,
      //     this.canvas.height - offsetMark - unitHeight * point['value'] - 2 * smallMarkLength - 5 + 50,
      //   ],
      //   size: [90, 30],
      //   visible: false,
      //   radius: new Size(3, 3),
      //   opacity: 0.8,
      // });
      // const info = new PointText(
      //   new Point(
      //     offsetMark + index * pointGap + pointGap / 2 - 40,
      //     this.canvas.height - offsetMark - unitHeight * point['value'] - 2 * smallMarkLength + 42
      //   )
      // );
      // info.justification = 'left';
      // info.fillColor = color.cloud.light;
      // info.content = `Tokyo: ${point['value']}\nLondon: ${point['value']}`;
      // info.visible = false;
      // info.opacity = 0.8;

      const invisibleBar = new Shape.Rectangle({
        fillColor: color.grey.dark,
        bottomCenter: [offsetMark + (index + 0.5) * pointGap, this.canvas.height - offsetMark],
        size: [pointGap, this.canvas.height - 2 * offsetMark],
        visible: true,
        opacity: 0.0,
      });

      const anchorLine = new Path.Line(
        new Point(offsetMark + (index + 0.5) * pointGap, offsetMark),
        new Point(offsetMark + (index + 0.5) * pointGap, this.canvas.height - offsetMark)
      );
      anchorLine.strokeColor = color.grey.light;
      anchorLine.visible = false;
      anchorLine.sendToBack();

      invisibleBar.on('mouseenter', function () {
        anchorLine.visible = true;
        // info.visible = true;
        // tool_tip.visible = true;
      });
      invisibleBar.on('mouseleave', function () {
        anchorLine.visible = false;
        // info.visible = false;
        // tool_tip.visible = false;
      });
    }
    line_1.smooth();
    line_2.smooth();
    // this.drawMark(true);
    this.drawMark(false, false, true, true);
  };

  // left inclusive, right exclusive
  isInRange = (value, start, end) => {
    return value >= start && value < end;
  };

  drawGrid = (tempMaxValue, multiLevel) => {
    console.log(multiLevel);
    var gridDistance = 0;
    var gridNums = 0;
    if (this.isInRange(tempMaxValue, 10, 25)) {
      gridDistance = 5;
    } else if (this.isInRange(tempMaxValue, 25, 50)) {
      gridDistance = 10;
    } else if (this.isInRange(tempMaxValue, 50, 100)) {
      gridDistance = 20;
    }

    gridNums = Math.ceil(tempMaxValue / gridDistance);
    for (let i = 0; i <= gridNums; i++) {
      const text = new PointText(
        new Point(
          offsetMark - smallMarkLength - 1,
          this.canvas.height - offsetMark - (i * (this.canvas.height - 2 * offsetMark)) / gridNums + 5
        )
      );
      text.justification = 'right';
      text.fillColor = color.grey.dark;
      text.content =
        multiLevel >= 1
          ? gridDistance * multiLevel * i
          : (gridDistance * multiLevel * i).toFixed(multiLevel.toString().split('.')[1].length);
      text.content = text.content + '℃';

      const line_from = new Point(
        offsetMark - smallMarkLength,
        this.canvas.height - offsetMark - (i * (this.canvas.height - 2 * offsetMark)) / gridNums
      );
      const line_to = new Point(
        this.canvas.width - offsetMark + smallMarkLength,
        this.canvas.height - offsetMark - (i * (this.canvas.height - 2 * offsetMark)) / gridNums
      );
      const line_path = new Path.Line(line_from, line_to);
      line_path.strokeColor = color.cloud.dark;
    }

    return gridNums * gridDistance;
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

  updateCanvas = () => {
    const value = document.getElementById('test-chart-data-json').value;
    // console.log(JSON.parse(value));
    data = JSON.parse(value);
    paper.setup(this.canvas);
    this.initCanvas();
  };

  render() {
    return (
      <StyledComponent styleMap={LineChartStyle}>
        {(useStyles) => {
          const classes = useStyles(this.props);
          return (
            <div className={classes.main}>
              <h1 className={classes.header}>Line Chart</h1>
              <div className={classes.main_canvas}>
                <canvas
                  resize="true"
                  className={classes.canvas}
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
