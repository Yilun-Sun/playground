import React, { Component } from 'react';
import OrereoStyle from './OrereoStyle';
import StyledComponent from '../../core/StyledComponent';
import Button from '@material-ui/core/Button';
import o from '../../../static/images/Oreo/o.png';
import re from '../../../static/images/Oreo/re.png';

import Navigation from '../../topics/NavigationBar/NavigationBar';

// TODO
// 加入orereo字段
// 修改按钮为带图片的paper/card
// 可拖拽点击的奥利奥

export default class Orereo extends Component {
  constructor() {
    super();
    this.state = { oreo: [] };
    this.oreoElements = [];
  }

  componentDidMount() {}

  addO = () => {
    if (this.state.oreo.length < 30)
      this.setState({
        oreo: [...this.state.oreo].concat(
          <div key={`${this.state.oreo.length}`}>
            <img
              src={o}
              alt="logo"
              style={{
                width: 240,
                height: 160,
                position: 'absolute',
                top: 650 - this.state.oreo.length * 20,
                left: window.innerWidth / 2 - 120,
              }}
              draggable="false"
            />
          </div>
        ),
      });
  };
  addRE = () => {
    if (this.state.oreo.length < 30)
      this.setState({
        oreo: [...this.state.oreo].concat(
          <div key={`${this.state.oreo.length}`}>
            <img
              src={re}
              alt="logo"
              style={{
                width: 240,
                height: 160,
                position: 'absolute',
                top: 650 - this.state.oreo.length * 20,
                left: window.innerWidth / 2 - 120,
              }}
              draggable="false"
            />
          </div>
        ),
      });
  };

  render() {
    return (
      <StyledComponent styleMap={OrereoStyle}>
        {(useStyles) => {
          const classes = useStyles(this.props);
          return (
            <div className={classes.main}>
              <h1 className={classes.header}>Orereo</h1>
              <Navigation />
              {this.state.oreo}
              <div className={classes.button_group}>
                <Button variant="contained" color="primary" onClick={this.addO}>
                  add O
                </Button>
                <Button variant="contained" color="primary" onClick={this.addRE}>
                  add RE
                </Button>
              </div>
            </div>
          );
        }}
      </StyledComponent>
    );
  }
}
