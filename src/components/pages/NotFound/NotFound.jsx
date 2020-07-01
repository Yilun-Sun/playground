import React, { Component } from 'react';
import NotFoundStyle from './NotFoundStyle';
import StyledComponent from '../../core/StyledComponent';

export default class NotFound extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <StyledComponent styleMap={NotFoundStyle}>
        {(useStyles) => {
          const classes = useStyles(this.props);
          return (
            <div>
              <h1 className={classes.header}>Not Found</h1>
            </div>
          );
        }}
      </StyledComponent>
    );
  }
}
