import React, { Component } from 'react';
import StyledComponent from '../../core/StyledComponent';
import StyledMarkdownStyle from './StyledMarkdownStyle';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import ReactDOM from 'react-dom';

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import python from 'highlight.js/lib/languages/python';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('python', python);

export default class StyledMarkdown extends Component {
  constructor() {
    super();
    this.state = {};
    this.content = [];
  }

  componentDidMount() {
    // hljs.initHighlighting();
    this.convertMarkdown();
  }

  componentDidUpdate() {
    hljs.initHighlighting();
  }

  convertMarkdown = () => {
    const markdownText = document.getElementById('markdown-text').value;
    this.content = [];

    const array = markdownText.split('\n\n');
    console.log(array);
    array.forEach((element) => {
      if (element.substring(0, 1) === '#') {
        this.heading(element);
      } else if (element.substring(0, 3) === '```' && element.substring(element.length - 3) === '```') {
        this.codeBlock(element);
      } else {
        this.appendHTML([<div key={this.content.length}>{element}</div>]);
      }
    });

    ReactDOM.render(this.content, document.getElementById('converted_html'), console.log('done'));
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
    } else {
      this.appendHTML([<div key={this.content.length}>{element}</div>]);
    }
  };

  codeBlock = (element) => {
    var array = element.split('\n');
    const language = array[0].substring(3);
    this.appendHTML([
      <pre key={this.content.length}>
        <code className="javascript">{array.slice(1, array.length - 1).join('\n')}</code>
      </pre>,
    ]);
  };

  appendHTML = (element) => {
    this.content = this.content.concat(element);
  };

  render() {
    const code_class = 'javascript';
    const markdown_text = `# Enter here

# 123

\`\`\`javascript
var array = ['123', '456'];
console.log(array);
array.forEach((element) => {
  if (element.substring(0, 1) === '#') {
    this.heading(element);
  } else {
    this.appendHTML([<div key={this.content.length}>{element}</div>]);
  }
});
\`\`\`

\`\`\`css
@font-face {
  font-family: Chunkfive; src: url('Chunkfive.otf');
}
body, .usertext {
  color: #F0F0F0; background: #600;
  font-family: Chunkfive, sans;
  --heading-1: 30px/32px Helvetica, sans-serif;
}
@import url(print.css);
@media print {
  a[href^=http]::after {
    content: attr(href)
  }
}
\`\`\`

\`\`\`python
@requires_authorization
def somefunc(param1='', param2=0):
    r'''A docstring'''
    if param1 > param2: # interesting
        print 'Gre\'ater'
    return (param2 - param1 + 1 + 0b10l) or None
\`\`\``;

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
                  defaultValue={markdown_text}
                  variant="outlined"
                  style={{ position: 'absolute', left: '25px', top: '30px', right: '30px' }}
                  onChange={() => {
                    this.convertMarkdown();
                  }}
                />
              </div>
              <div id="converted_html" className={classes.converted_html}></div>
              {/* <pre style={{ position: 'absolute', left: '25px', bottom: '30px', right: '30px' }}>
                <code className={code_class}>let i = 0;</code>
              </pre> */}
              <Button
                onClick={() => {
                  hljs.initHighlighting();
                }}
                variant="contained"
                color="primary"
                disableElevation
              >
                hljs
              </Button>
            </div>
          );
        }}
      </StyledComponent>
    );
  }
}
