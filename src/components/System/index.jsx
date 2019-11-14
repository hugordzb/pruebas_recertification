import React, { Component } from 'react';
import { style } from '../../styles/System'
import { withStyles } from '@material-ui/core';
class System extends Component {

  render() {
    const { system, classes } = this.props;
    return (
      <button>
        {system.name}
      </button>
    );
  }

}

export default withStyles(style)(System);