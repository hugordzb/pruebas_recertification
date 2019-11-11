import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { IconButton } from '@material-ui/core';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { connect } from 'react-redux';
import { signOut } from '../../../../redux/actions';

function UserSessionMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    props.signOut();
  }

  return (
    <div>
      <IconButton aria-controls="user-session-menu" aria-haspopup="true" onClick={handleClick}>
        <AccountCircleIcon />
      </IconButton>
      <Menu
        id="user-session-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>{props.userId}</MenuItem>
        <MenuItem onClick={handleSignOut}>Cerrar sessión</MenuItem>
      </Menu>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut())
})

export default connect(null, mapDispatchToProps)(UserSessionMenu);