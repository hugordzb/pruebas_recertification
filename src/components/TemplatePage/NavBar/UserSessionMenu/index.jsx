import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import Fade from '@material-ui/core/Fade';
import { IconButton, Card, CardContent, Typography, 
  Avatar, CardActions, Button, Popover } from '@material-ui/core';

import { connect } from 'react-redux';
import { signOut } from '../../../../redux/actions';
import { style } from '../../../../styles/UserSessionMenu';


class UserSessionMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  handleSignOut = () => {
    this.props.signOut();
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const open = Boolean(this.state.anchorEl);
    const id = open ? "user-session-menu" : undefined;
    const { classes } = this.props;
    return (
      <div>
        <IconButton variant="contained" onClick={this.handleClick}>
          <Avatar>{this.props.userData.displayName.charAt(0)}</Avatar>
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          TransitionComponent={Fade}
        >
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                {this.props.userData.displayName}
              </Typography>
              <Typography color="textSecondary">
                {this.props.userData.title}
              </Typography>
              <Typography variant="body2" component="p">
                {this.props.userData.department}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={this.handleSignOut}>Cerrar sesión</Button>
            </CardActions>
          </Card>
        </Popover>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut())
})

const connectedUserSessionMenu = connect(null, mapDispatchToProps)(UserSessionMenu);

export default withStyles(style)(connectedUserSessionMenu)