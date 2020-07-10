import React, { Component } from 'react';
import CssToJssStyle from './CssToJssStyle';
import StyledComponent from '../../core/StyledComponent';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);

export default class CssToJss extends Component {
  constructor() {
    super();
    this.state = {};
    this.jssText = `
    stage_select_list_item: {
        background: "rgba(255, 255, 255, 0.95)",
        display: "grid",
        gridTemplateColumns: "480px 2.5fr",
        position: "relative"
    }
    `;
    this.cssText = `
    body {
        background-color: lightblue;
    }
    
    h1 {
        color: white;
        text-align: center;
    }
    
    p {
        font-family: verdana;
        font-size: 20px;
    }
    `;
  }

  componentDidMount() {
    hljs.initHighlighting();
  }

  copyJss = () => {
    navigator.clipboard.writeText(this.jssText);
  };

  render() {
    return (
      <StyledComponent styleMap={CssToJssStyle}>
        {(useStyles) => {
          const classes = useStyles(this.props);
          return (
            <div>
              <h1 className={classes.header}>Css To Jss</h1>
              <Paper elevation={3} className={classes.cssPaper}>
                <pre>
                  <code className="css">{this.cssText}</code>
                </pre>
              </Paper>
              <Paper elevation={3} className={classes.jssPaper}>
                <pre>
                  <code className="javascript" id="jssCode">
                    {this.jssText}
                  </code>
                </pre>
              </Paper>
              <Button variant="contained" color="primary" disableElevation onClick={() => this.copyJss()}>
                Copy Jss
              </Button>
            </div>
          );
        }}
      </StyledComponent>
    );
  }
}
