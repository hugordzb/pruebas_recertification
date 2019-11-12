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
    let { isAuthenticated } = this.props;

    if (!isAuthenticated) {
      let sPageURL = window.location.search.substring(1);
      if (sPageURL.includes("token")) {
        let token = sPageURL.substring(sPageURL.indexOf("=") + 1, sPageURL.length - 1);
        localStorage.setItem("token", token);
      }else{
        this.props.refresh();
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
  userData: state.authenticate.userData,
  isAuthenticated: state.authenticate.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  refresh: () => dispatch(refresh())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);