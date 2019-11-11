import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core'
import { style } from '../../../styles/Footer'

class Footer extends Component {
  render() {
    const { classes } = this.props;
    const today = new Date();
    return (
      <>
        <Typography className={classes.footerMessage}>
          &copy; Truper {today.getFullYear()}
        </Typography>
      </>
    );
  }
}

export default withStyles(style)(Footer);