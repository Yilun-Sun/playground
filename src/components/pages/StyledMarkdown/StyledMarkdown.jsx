import React, { Component } from 'react';
import StyledComponent from '../../core/StyledComponent';
import StyledMarkdownStyle from './StyledMarkdownStyle';
// import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import ReactDOM from 'react-dom';

export default class StyledMarkdown extends Component {
  constructor() {
    super();
    this.state = {};
    this.content = [];
  }

  componentDidMount() {
    this.convertMarkdown();
  }

  convertMarkdown = () => {
    const markdownText = document.getElementById('markdown-text').value;
    this.content = [];

    const array = markdownText.split('\n');
    array.forEach((element) => {
      if (element.substring(0, 1) === '#') {
        this.heading(element);
      } else {
        this.appendHTML([<div key={this.content.length}>{element}</div>]);
      }
    });

    ReactDOM.render(this.content, document.getElementById('converted_html'));
  };

  heading = (element) => {
    if (element.substring(0, 7) === '###### ') {
      this.appendHTML([<h6 key={this.content.length}>{element.substring(7)}</h6>]);
    } else if (element.substring(0, 6) === '##### ') {
      this.appendHTML([<h5 key={this.content.length}>{element.substring(6)}</h5>]);
    } else if (element.substring(0, 5) === '#### ') {
      this.appendHTML([<h4 key={this.content.length}>{element.substring(5)}</h4>]);
    } else if (element.substring(0, 4) === '### ') {
      this.appendHTML([<h3 key={this.content.length}>{element.substring(4)}</h3>]);
    } else if (element.substring(0, 3) === '## ') {
      this.appendHTML([<h2 key={this.content.length}>{element.substring(3)}</h2>]);
    } else if (element.substring(0, 2) === '# ') {
      this.appendHTML([<h1 key={this.content.length}>{element.substring(2)}</h1>]);
    }
  };

  appendHTML = (element) => {
    this.content = this.content.concat(element);
  };

  render() {
    return (
      <StyledComponent styleMap={StyledMarkdownStyle}>
        {(useStyles) => {
          const classes = useStyles(this.props);
          return (
            <div className={classes.main}>
              <h1 className={classes.header}>Styled Markdown</h1>
              <div className={classes.markdown}>
                <TextField
                  id="markdown-text"
                  label="Markdown"
                  multiline
                  rows={30}
                  defaultValue="# Enter here"
                  variant="outlined"
                  style={{ position: 'absolute', left: '25px', top: '30px', right: '30px' }}
                  onChange={() => {
                    this.convertMarkdown();
                  }}
                />
              </div>
              <div id="converted_html" className={classes.converted_html}></div>
              {/* <Button
                onClick={() => {
                  this.convertMarkdown();
                }}
                variant="contained"
                color="primary"
                disableElevation
              >
                Convert
              </Button> */}
            </div>
          );
        }}
      </StyledComponent>
    );
  }
}
