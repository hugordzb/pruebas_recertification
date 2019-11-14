import React from 'react';
import Home from './views/Home';
import {
  Switch,
  Route,
} from "react-router-dom";

import Whoops404 from './views/Whoops404';

import { connect } from 'react-redux';
import { authenticate } from './redux/actions/';
import { SSOServices } from './services/SSOServices';

import Recertification from './views/Recertification';

class App extends React.Component {

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

        }), (responseError => {
          console.log(responseError);
          this.setState({ isLoading: false });
          window.location.href = "http://localhost:3000/sso";
        }));
      }
    }
  }

  render() {
    return (
      <Switch>
        <Route path="/doRecertification" component={Recertification}></Route>
        <Route exact path="/" component={Home}></Route>
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
  authenticate: userData => dispatch(authenticate(userData))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);