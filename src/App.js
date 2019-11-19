import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";

import Whoops404 from './views/Whoops404';

import { connect } from 'react-redux';
import { authenticate } from './redux/actions/';
import { SSOServices } from './services/SSOServices';

import Arquitecture from './views/Arquitecture';
import Boss from './views/Boss';
import HelpDesk from './views/HelpDesk';

class App extends React.Component {

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

  componentDidMount() {
    let { isAuthenticated } = this.props;
    if (!isAuthenticated) {

      let sPageURL = window.location.search.substring(1);
      if (sPageURL.includes("token")) {
        let token = sPageURL.substring(sPageURL.indexOf("=") + 1, sPageURL.length);
        new SSOServices(token).signInRecertificaction((response => {
          this.setState({ isLoading: false });
          let userData = {
            userId: response.data.userId,
            name: response.data.name,
            displayName: response.data.displayName,
            title: response.data.title,
            department: response.data.department,
            token
          };

          if (userData.userId !== null) {
            this.props.authenticate(userData);
          }

          window.location.href = `${window.location.href.replace(`${window.location.pathname}`, "")}${window.location.pathname}`;

        }), (responseError => {
          console.log(responseError);
          this.setState({ isLoading: false });
          window.location.href = "http://localhost:3000/sso";
        }));
      }
    }
  }

  render() {
    const { profile } = this.props;
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
  userData: state.authenticate.userData,
  isAuthenticated: state.authenticate.isAuthenticated,
  profile: state.authenticate.profile
});

const mapDispatchToProps = dispatch => ({
  authenticate: userData => dispatch(authenticate(userData))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);