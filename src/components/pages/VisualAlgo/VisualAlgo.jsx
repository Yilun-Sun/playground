import React, { Component } from 'react';
import VisualAlgoStyle from './VisualAlgoStyle';
import StyledComponent from '../../core/StyledComponent';
import Button from '@material-ui/core/Button';
import Navigation from '../../topics/NavigationBar/NavigationBar';

import paper, { Shape, Group, Point, PointText } from 'paper';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

export default class VisualAlgo extends Component {
  constructor() {
    super();
    this.state = { arrayLength: 50, animateSpeed: 200 };
    this.canvasBarGroup = undefined;
    this.canvasTextGroup = undefined;
    this.barArray = [];
    this.textVisibility = true;
    this.switchList = [];

    this.animatingColor = 'yellow';
  }

  // 控制排序速度
  // 开始排序
  // 选择排序算法
  // 设置数组长度
  // 随机生成待排序数组
  // 展示排序算法代码
  // 显示当前所在代码行

  componentDidMount() {
    // setup paper
    paper.setup(this.canvas);
    paper.tools.forEach((tool) => tool.remove());
    paper.view.onResize = () => {
      this.init();
    };

    // add all bars to canvasBarGroup
    this.init();
  }

  init = () => {
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;
    const padding = 50;
    const arrayLength = this.state.arrayLength;
    const barWidth = (canvasWidth - 2 * padding) / (arrayLength * 2 - 1);

    paper.setup(this.canvas);
    var canvasBarGroup = new Group();
    var canvasTextGroup = new Group();

    this.barArray = new Array(arrayLength);

    for (let i = 0; i < arrayLength; i++) {
      const currentValue = Math.ceil((Math.random() * (canvasHeight - padding * 2)) / 5) * 5;
      this.barArray[i] = currentValue;
      const path = new Shape.Rectangle({
        fillColor: 'white',
        bottomCenter: [padding + barWidth / 2 + barWidth * i * 2, canvasHeight - padding],
        size: [barWidth, currentValue],
        name: `bar-${i}`,
      });
      canvasBarGroup.addChild(path);
    }

    // optional: text
    for (let i = 0; i < arrayLength; i++) {
      const text = new PointText(
        new Point(padding + barWidth / 2 + barWidth * i * 2, canvasHeight - padding - this.barArray[i] - 10)
      );
      text.justification = 'center';
      text.fillColor = 'white';
      text.content = this.barArray[i];
      text.name = `text-${i}`;
      text.visible = this.textVisibility;
      canvasTextGroup.addChild(text);
    }

    this.canvasBarGroup = canvasBarGroup;
    this.canvasTextGroup = canvasTextGroup;
  };

  resetRandomArray = () => {};

  changeSpeed = () => {};

  toggleText = () => {
    this.textVisibility = !this.textVisibility;
    this.canvasTextGroup.children.forEach((element) => {
      element.visible = this.textVisibility;
    });
  };

  showGroup = () => {
    console.log(this.canvasBarGroup);
    console.log(this.barArray);
  };

  handleSliderChange = (event, newValue) => {
    if (newValue !== this.state.arrayLength) {
      this.setState({ arrayLength: newValue });
      this.canvasBarGroup = undefined;
      this.canvasTextGroup = undefined;
      this.barArray = [];
      this.switchList = [];
      this.init();
    }
  };

  runAlgo = () => {
    // clear render list
    this.switchList = [];

    // this.bubbleSort(this.barArray);
    this.quickSort(this.barArray, 0, this.barArray.length - 1);

    // render
    this.animateAlgo();
  };

  switchTwoBar = (index1, index2) => {
    console.log('switch two bar');

    const canvasBarGroup = this.canvasBarGroup;
    const canvasTextGroup = this.canvasTextGroup;

    const path1 = canvasBarGroup.children[index1];
    const path2 = canvasBarGroup.children[index2];
    const text1 = canvasTextGroup.children[index1];
    const text2 = canvasTextGroup.children[index2];

    const path1X = path1.position.x;
    const path2X = path2.position.x;
    const text1X = text1.position.x;
    const text2X = text2.position.x;

    path1.fillColor = this.animatingColor;
    path2.fillColor = this.animatingColor;
    path1.tween(
      {
        position: new Point(path2X, path1.position.y),
      },
      {
        easing: 'easeInOutCubic',
        duration: 20000 / this.state.animateSpeed,
      }
    );
    path2.tween(
      {
        position: new Point(path1X, path2.position.y),
      },
      {
        easing: 'easeInOutCubic',
        duration: 20000 / this.state.animateSpeed,
      }
    );
    path1.tween(
      {
        fillColor: 'white',
      },
      {
        easing: 'easeInOutCubic',
        duration: 200,
      }
    );
    path2.tween(
      {
        fillColor: 'white',
      },
      {
        easing: 'easeInOutCubic',
        duration: 200,
      }
    );

    text1.tween(
      {
        position: new Point(text2X, text1.position.y),
      },
      {
        easing: 'easeInOutCubic',
        duration: 20000 / this.state.animateSpeed,
      }
    );
    text2.tween(
      {
        position: new Point(text1X, text2.position.y),
      },
      {
        easing: 'easeInOutCubic',
        duration: 20000 / this.state.animateSpeed,
      }
    );

    const temp1 = path1;
    canvasBarGroup.children[index1] = path2;
    canvasBarGroup.children[index2] = temp1;
    const temp2 = text1;
    canvasTextGroup.children[index1] = text2;
    canvasTextGroup.children[index2] = temp2;
  };

  animateAlgo = () => {
    if (this.switchList.length > 0) {
      const indexs = this.switchList.shift();
      this.switchTwoBar(indexs[0], indexs[1]);
    }

    if (this.switchList.length > 0) {
      setTimeout(() => this.animateAlgo(), 20000 / this.state.animateSpeed + 30);
    }
  };

  // bubble sort
  bubbleSort = (inputArr) => {
    // clear render list
    this.switchList = [];

    let len = inputArr.length;
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < len; i++) {
        if (inputArr[i] > inputArr[i + 1]) {
          let tmp = inputArr[i];
          inputArr[i] = inputArr[i + 1];
          inputArr[i + 1] = tmp;
          swapped = true;
          this.switchList.push([i, i + 1]);
        }
      }
    } while (swapped);
  };

  // quick sort
  swap(items, leftIndex, rightIndex) {
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
    this.switchList.push([leftIndex, rightIndex]);
  }
  partition(items, left, right) {
    var pivot = items[Math.floor((right + left) / 2)], //middle element
      i = left, //left pointer
      j = right; //right pointer
    while (i <= j) {
      while (items[i] < pivot) {
        i++;
      }
      while (items[j] > pivot) {
        j--;
      }
      if (i <= j) {
        this.swap(items, i, j); //sawpping two elements
        i++;
        j--;
      }
    }
    return i;
  }
  quickSort(items, left, right) {
    var index;
    if (items.length > 1) {
      index = this.partition(items, left, right); //index returned from partition
      if (left < index - 1) {
        //more elements on the left side of the pivot
        this.quickSort(items, left, index - 1);
      }
      if (index < right) {
        //more elements on the right side of the pivot
        this.quickSort(items, index, right);
      }
    }
    return items;
  }

  // ??? sort

  // ??? sort

  // ??? sort

  render() {
    return (
      <StyledComponent styleMap={VisualAlgoStyle}>
        {(useStyles) => {
          const classes = useStyles(this.props);
          return (
            <div className={classes.main}>
              <h1 className={classes.header}>Visualized Sorting Algorithms</h1>
              <Navigation />
              <div className={classes.main_canvas}>
                <canvas
                  resize="true"
                  style={{ width: '100%', height: '100%', backgroundColor: this.gridLineColor }}
                  ref={(el) => {
                    this.canvas = el;
                  }}
                />
              </div>
              <div className={classes.button_group}>
                <Button onClick={() => this.runAlgo()}>Run Algo</Button>
                <Button onClick={() => this.showGroup()}>show group</Button>
                <Button onClick={() => this.toggleText()}>Toggle Text</Button>
                <div style={{ padding: '0px 0px 0px 10px', width: '160px' }}>
                  <Typography id="discrete-slider" gutterBottom>
                    Array Length
                  </Typography>
                  <Slider
                    value={typeof this.state.arrayLength === 'number' ? this.state.arrayLength : 0}
                    onChange={this.handleSliderChange}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={10}
                    max={100}
                  />
                </div>
              </div>
            </div>
          );
        }}
      </StyledComponent>
    );
  }
}
