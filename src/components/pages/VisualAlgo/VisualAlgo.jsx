import React, { Component } from 'react';
import VisualAlgoStyle from './VisualAlgoStyle';
import StyledComponent from '../../core/StyledComponent';
import Button from '@material-ui/core/Button';
import Navigation from '../../topics/NavigationBar/NavigationBar';

import paper, { Shape, Group, Point, PointText } from 'paper';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';

export default class VisualAlgo extends Component {
  constructor() {
    super();
    this.state = { arrayLength: 30, animateSpeed: 100, steps: 0, algoName: '', showSnackBar: false };
    this.canvasBarGroup = undefined;
    this.canvasTextGroup = undefined;
    this.barArray = [];
    this.textVisibility = true;
    this.switchList = [];
    this.animatingColor = 'yellow';
    this.alertContent = 'nothing';
    this.alertSeverity = '';
  }

  // ✅ 控制排序速度
  // ✅‍ 开始排序
  // ✅ 选择排序算法
  // ✅ 设置数组长度
  // ✅ 随机生成待排序数组
  // ❎ 展示排序算法代码
  // ❎ 显示当前所在代码行
  // ✅ 提示当前状态 例如完成 未完成 需要选择算法等
  // ❎ 界面优化

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
    this.canvasBarGroup = undefined;
    this.canvasTextGroup = undefined;
    this.barArray = [];
    this.switchList = [];
    this.setState({ steps: 0 });

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
      const currentValue = Math.round(Math.random() * 98 + 1);
      this.barArray[i] = currentValue;
      const path = new Shape.Rectangle({
        fillColor: 'white',
        bottomCenter: [padding + barWidth / 2 + barWidth * i * 2, canvasHeight - padding],
        size: [barWidth, currentValue * ((canvasHeight - 2 * padding) / 100)],
        name: `bar-${i}`,
      });
      canvasBarGroup.addChild(path);
    }

    // optional: text
    for (let i = 0; i < arrayLength; i++) {
      const text = new PointText(
        new Point(
          padding + barWidth / 2 + barWidth * i * 2,
          canvasHeight - padding - this.barArray[i] * ((canvasHeight - 2 * padding) / 100) - 10
        )
      );
      text.justification = 'center';
      text.fillColor = 'white';
      text.content = this.barArray[i];
      text.name = `text-${i}`;
      text.visible = this.textVisibility;
      text.fontSize = Math.max(barWidth, 8);
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

  handleLengthChange = (event, newValue) => {
    if (newValue !== this.state.arrayLength) {
      this.setState({ arrayLength: newValue });
      this.canvasBarGroup = undefined;
      this.canvasTextGroup = undefined;
      this.barArray = [];
      this.switchList = [];
      this.init();
    }
  };

  // TODO:
  handleSpeedChange = (event, newValue) => {
    if (newValue !== this.state.animateSpeed) {
      this.setState({ animateSpeed: newValue });
    }
  };

  runAlgo = () => {
    // clear render list
    this.switchList = [];

    // this.bubbleSort(this.barArray);
    // this.quickSort(this.barArray, 0, this.barArray.length - 1);
    // this.selectionSort(this.barArray);
    // this.insertionSort(this.barArray);

    switch (this.state.algoName) {
      case 'bubble':
        this.bubbleSort(this.barArray);
        break;
      case 'quick':
        this.quickSort(this.barArray, 0, this.barArray.length - 1);
        break;
      case 'selection':
        this.selectionSort(this.barArray);
        break;
      case 'insertion':
        this.insertionSort(this.barArray);
        break;

      default:
        this.showMessage('Please select an algorithm first', 'warning');
        return;
    }

    // render
    this.animateAlgo();
  };

  switchTwoBar = (index1, index2, animateSpeed) => {
    const steps = this.state.steps;
    this.setState({ steps: steps + 1 });

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
        duration: 20000 / animateSpeed,
      }
    );
    path2.tween(
      {
        position: new Point(path1X, path2.position.y),
      },
      {
        easing: 'easeInOutCubic',
        duration: 20000 / animateSpeed,
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
        duration: 20000 / animateSpeed,
      }
    );
    text2.tween(
      {
        position: new Point(text1X, text2.position.y),
      },
      {
        easing: 'easeInOutCubic',
        duration: 20000 / animateSpeed,
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
    const animateSpeed = this.state.animateSpeed;

    if (this.switchList.length > 0) {
      const indexs = this.switchList.shift();
      this.switchTwoBar(indexs[0], indexs[1], animateSpeed);
    }

    if (this.switchList.length > 0) {
      setTimeout(() => this.animateAlgo(), 20000 / animateSpeed + 30);
    } else {
      this.showMessage('Sort done!', 'success');
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

  // selection sort
  selectionSort = (arr) => {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      let min = i;
      for (let j = i + 1; j < len; j++) {
        if (arr[min] > arr[j]) {
          min = j;
        }
      }
      if (min !== i) {
        let tmp = arr[i];
        arr[i] = arr[min];
        arr[min] = tmp;
        this.switchList.push([i, min]);
      }
    }
    // return arr;
  };

  // insertion sort
  insertionSort = (inputArr) => {
    let length = inputArr.length;
    for (let i = 1; i < length; i++) {
      let key = inputArr[i];
      let j = i - 1;
      while (j >= 0 && inputArr[j] > key) {
        inputArr[j + 1] = inputArr[j];
        this.switchList.push([j, j + 1]);
        j = j - 1;
      }
      inputArr[j + 1] = key;
    }
    // return inputArr;
  };

  // ??? sort

  handleAlgoChange = (event) => {
    this.setState({ algoName: event.target.value });
  };

  handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ showSnackBar: false });
  };

  /**
   *
   * @param {string} msg
   * @param {string} severity
   */
  showMessage = (msg, severity) => {
    this.alertContent = msg;
    this.alertSeverity = severity;
    this.setState({ showSnackBar: true });
  };

  render() {
    const lengthMarks = [
      {
        value: 10,
        label: '10',
      },
      {
        value: 20,
      },
      {
        value: 30,
      },
      {
        value: 40,
      },
      {
        value: 50,
        label: '50',
      },
      {
        value: 60,
      },
      {
        value: 70,
      },
      {
        value: 80,
      },
      {
        value: 90,
      },
      {
        value: 100,
        label: '100',
      },
    ];

    const speedMarks = [
      {
        value: 50,
        label: '1/2',
      },
      {
        value: 100,
        label: '1',
      },
      {
        value: 200,
        label: '2',
      },
      {
        value: 250,
      },
      {
        value: 300,
        label: '3',
      },
      {
        value: 400,
        label: '4',
      },
    ];

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
                <Grid container spacing={1} className={classes.grid_container}>
                  <Grid item xs={4}>
                    <FormControl variant="outlined">
                      <InputLabel id="demo-simple-select-outlined-label">Select Algorithms</InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={this.state.algoName}
                        onChange={this.handleAlgoChange}
                        label="Age"
                        className={classes.formControl}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={'bubble'}>Bubble Sort</MenuItem>
                        <MenuItem value={'quick'}>Quick Sort</MenuItem>
                        <MenuItem value={'selection'}>Selection Sort</MenuItem>
                        <MenuItem value={'insertion'}>Insertion Sort</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={5}></Grid>
                  <Grid item xs={3}>
                    <div>switch: {this.state.steps} times</div>
                  </Grid>

                  <Grid item xs={2}>
                    <Typography gutterBottom>Array Length</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Slider
                      style={{ width: '160px' }}
                      value={typeof this.state.arrayLength === 'number' ? this.state.arrayLength : 0}
                      onChange={this.handleLengthChange}
                      aria-labelledby="discrete-slider"
                      valueLabelDisplay="auto"
                      step={10}
                      marks={lengthMarks}
                      min={10}
                      max={100}
                    />
                  </Grid>
                  <Grid item xs={5}></Grid>
                  <Grid item xs={3}>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      disableElevation
                      onClick={() => this.toggleText()}
                    >
                      Toggle Text
                    </Button>
                  </Grid>

                  <Grid item xs={2}>
                    <Typography gutterBottom>Animation Speed</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Slider
                      style={{ width: '160px' }}
                      value={typeof this.state.animateSpeed === 'number' ? this.state.animateSpeed : 0}
                      onChange={this.handleSpeedChange}
                      valueLabelDisplay="auto"
                      marks={speedMarks}
                      aria-labelledby="discrete-slider-restrict"
                      step={50}
                      min={50}
                      max={400}
                    />
                  </Grid>

                  <Grid item xs={5}></Grid>
                  <Grid item xs={3}>
                    <Button
                      className={classes.run_button}
                      variant="contained"
                      color="primary"
                      disableElevation
                      onClick={() => this.runAlgo()}
                    >
                      Run Algo
                    </Button>
                  </Grid>
                </Grid>

                <Snackbar open={this.state.showSnackBar} autoHideDuration={3000} onClose={this.handleSnackBarClose}>
                  <Alert onClose={this.handleSnackBarClose} severity={this.alertSeverity}>
                    {this.alertContent}
                  </Alert>
                </Snackbar>
              </div>
            </div>
          );
        }}
      </StyledComponent>
    );
  }
}

function Alert(props) {
  return <MuiAlert id="alert" elevation={6} variant="filled" {...props} />;
}
