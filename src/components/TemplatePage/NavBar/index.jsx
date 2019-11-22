import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountBox from '@material-ui/icons/AccountBox';
import { style } from '../../../styles/NavBar';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import UserSessionMenu from './UserSessionMenu';

class NavBar extends Component {

  redirectToLogin = () => {
    window.location.href = "http://localhost:3000/sso/home";
  }

  render() {
    const { classes } = this.props;
    const { isAuthenticated, userData } = this.props;
    return (
      <AppBar className={classes.navBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {"Recertificacion de usuarios"}
          </Typography>
          {!isAuthenticated ?
            <Button
              className={classes.loginButton}
              onClick={this.redirectToLogin}
            >
              <AccountBox />
              {"Iniciar sesión"}
            </Button> :
            <UserSessionMenu userData={userData} />
          }
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.authentication.userData,
  isAuthenticated: state.authentication.isAuthenticated,
});

const connectedNavBar = connect(mapStateToProps, null)(NavBar);

export default withRouter(withStyles(style)(connectedNavBar))