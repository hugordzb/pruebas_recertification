import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class PrivateRoute extends Component{
  render() {
    const { component:Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={ () =>
          this.props.isAuthenticated ? (
            <Component {...this.props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: this.props.location }
              }}
            />
          )
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: (state.authenticate.user.userId && state.authenticate.user.token) ? true : false, 
});

export default connect(mapStateToProps, null)(PrivateRoute);