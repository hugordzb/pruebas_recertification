import React, { Component } from 'react'
import System from './System'
import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const style = () => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
});

class SystemMenu extends Component {
  renderApps = () => {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} spacing={3}>
        <Grid item md={12}>
            {this.props.apps.map((app, i) => <System key={i} app={app}></System>)}
        </Grid>
      </Grid>
    )
  }

  render() {
    return (
      <>
        {this.renderApps()}
      </>
    )
  }
}

export default withStyles(style)(SystemMenu)