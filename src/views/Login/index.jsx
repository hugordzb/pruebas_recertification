import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  Avatar, Button, Checkbox, Container,
  FormControlLabel, Grid, Link, TextField,
  Typography, withStyles
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { authenticate } from '../../redux/actions';
import { loginService } from '../../services';
import { style } from '../../styles/Login';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      password: "",
    };
  }

  hangleChangeUser = event => {
    this.setState({ user: event.target.value });
  }

  hangleChangePassword = event => {
    this.setState({ password: event.target.value });
  }

  handleSubmit = () => {
    const { user, password } = this.state;

    let credential = `${user}:${password}`;

    let headers = { credential: btoa(credential) };
    
    fetch(
      loginService,
      {
        method: 'POST',
        headers: headers,
      }
    ).then(
      response => response.json()
    ).then(
      data => {
        if (data) {
          this.props.authenticate(data);
          this.props.history.push('/home');
        }
      }
    ).catch(e => {
      console.log(e);
    });

  }

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {"Iniciar sesión"}
          </Typography>
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="user"
              label="Usuario"
              name="user"
              autoFocus
              value={this.state.user}
              onChange={this.hangleChangeUser}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              value={this.state.password}
              onChange={this.hangleChangePassword}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recuérdame"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSubmit}
            >
              {"Iniciar sesión"}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  {"¿Olvidaste la contraseña?"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  authenticate: userData => dispatch(authenticate(userData))
})

const loginConnected = connect(null, mapDispatchToProps)(Login)

export default withRouter(withStyles(style)(loginConnected))