import React, { Component } from 'react';
import { withStyles, CssBaseline } from '@material-ui/core'

import NavBar from './NavBar';
import Footer from './Footer';

import { style } from '../../styles/TemplatePage'

class TemplatePage extends Component {
  
  render() {
    const { children } = this.props;
    const { classes } = this.props;
    return (
      <>
        <CssBaseline />
        <header className={classes.header}>
          <NavBar />
        </header>

        <main className={classes.main} >
          {children}
        </main>

        <footer className={classes.footer}>
          <Footer />
        </footer>
      </>
    );
  }
}

export default withStyles(style)(TemplatePage);