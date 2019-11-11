import React, { Component } from 'react';
import { withStyles, Grid, Container, Typography } from '@material-ui/core';
import { style } from '../../styles/Whoops404'

class Whoops404 extends Component {

  render() {
    const { location } = this.props;
    const { classes } = this.props;
    return (
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography className={classes.title}>
              <h1>¡Error!</h1>
            </Typography>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <Typography className={classes.message}>
                <h2>Recurso no encontrado en '{location.pathname}'</h2>
            </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <Typography className={classes.media}>
                <h1>404</h1>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(style)(Whoops404);