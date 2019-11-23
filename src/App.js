import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";

import Whoops404 from './views/Whoops404';

import { connect } from 'react-redux';
import { signIn } from './redux/actions/';
import Arquitecture from './views/Arquitecture';
import Boss from './views/Boss';
import HelpDesk from './views/HelpDesk';

class App extends React.Component {

  componentDidMount() {
    let { isAuthenticated, signIn } = this.props;
    if (!isAuthenticated) {
      let sPageURL = window.location.search.substring(1);
      if (sPageURL.includes("token")) {
        let token = sPageURL.substring(sPageURL.indexOf("=") + 1, sPageURL.length);
        signIn(token);
      }
    }
  }
  
  renderForProfile = () => {
    const { profile } = this.props;

    switch (profile) {
      case "Arquitectura":
        return (
          <>
            <Route path="/" component={Arquitecture}></Route>
          </>
        )
      case "Mesa de servicio":
        return (
          <>
            <Route path="/" component={HelpDesk}></Route>
          </>
        )
      case "Jefe":
        return (
          <>
            <Route path="/" component={Boss}></Route>
          </>
        )
      default:
        break;
    }
  }

  render() {
    return (
      <Switch>
        {
          this.renderForProfile()
        }
        <Route component={Whoops404}></Route>
      </Switch>
    )
  }
}

const mapStateToProps = state => ({
  userData: state.authentication.userData,
  isAuthenticated: state.authentication.isAuthenticated,
  profile: state.authentication.profile
});

const mapDispatchToProps = dispatch => ({
  signIn: userData => dispatch(signIn(userData))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);