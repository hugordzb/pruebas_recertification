import React from 'react';
import Home from './views/Home';
import {
  Switch,
  Route,
} from "react-router-dom";
import Greeting from './views/Greeting';
import Login from './views/Login';
import Whoops404 from './views/Whoops404';
import PrivateRoute from './components/PrivateRoute';

import { connect } from 'react-redux';
import { refresh } from './redux/actions/';
import PublicRoute from './components/PublicRoute';

class App extends React.Component {

  componentDidMount() {
    if (!this.props.isAuthenticated) {
      let sPageURL = window.location.search.substring(1);
      if (sPageURL.includes("userId") && sPageURL.includes("token")) {
        let sURLVariables = sPageURL.split('&');
        let URLUserId = sURLVariables[0].substring(sURLVariables[0].indexOf("=") + 1, sURLVariables[0].length - 1);
        let URLToken = sURLVariables[1].substring(sURLVariables[1].indexOf("=") + 1, sURLVariables[1].length - 1);

        localStorage.setItem("userId", URLUserId);
        localStorage.setItem("token", URLToken);

        let token = localStorage.getItem("token");
        if (token && true) {
          this.props.refresh();
        }
      } else {
        let token = localStorage.getItem("token");
        if (token && true) {
          this.props.refresh();
        }
      }
    }
  }

  render() {
    return (
      <Switch>
        <PublicRoute exact path="/" restricted={true} component={Greeting}></PublicRoute>
        <PublicRoute restricted={true} path="/login" component={Login}></PublicRoute>
        <PrivateRoute path="/home" component={Home}></PrivateRoute>
        <Route component={Whoops404}></Route>
      </Switch>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: (state.authenticate.user.userId && state.authenticate.user.token) ? true : false
});

const mapDispatchToProps = dispatch => ({
  refresh: () => dispatch(refresh())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);