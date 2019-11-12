import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import { connect } from 'react-redux';

const styles = theme => ({
  root: {
    maxWidth: 345,
  },
});

class System extends Component {

  redirectApp = () => {
    let page = 'http://localhost:3001';
    window.open(`${page}?token=${this.props.token}`, '_blank');
  }

  render() {
    const { app } = this.props
    
    return (
      <Button onClick={this.redirectApp}>
        {(app === "S004") ? "Recertificación" : app}
      </Button>

    );
  }

}

const mapStateToProps = state => ({
  userData: state.authenticate.userData,
  isAuthenticated: state.authenticate.isAuthenticated,
});

const connectedSystem = connect(mapStateToProps, null)(System);

export default withStyles(styles)(connectedSystem)