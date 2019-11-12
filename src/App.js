import React from 'react';
import Home from './views/Home';
import {
  Switch,
  Route,
} from "react-router-dom";

import Whoops404 from './views/Whoops404';

import { connect } from 'react-redux';
import { refresh } from './redux/actions/';

class App extends React.Component {

  componentDidMount() {
    let { isAuthenticated } = this.props;

    if (!isAuthenticated) {
      let sPageURL = window.location.search.substring(1);
      if (sPageURL.includes("token")) {
        let token = sPageURL.substring(sPageURL.indexOf("=") + 1, sPageURL.length - 1);
        localStorage.setItem("token", token);

        //consumir servicio para autenticar
      } else {
        let userJson = localStorage.getItem("userData");
        if (userJson) {
          this.props.refresh();
        } else {
          window.location.href = "http://localhost:3000/sso/home";
        }
      }
    }
  }

  render() {
    return (
      <Switch>
        <Route path="/" component={Home}></Route>
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