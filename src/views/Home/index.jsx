import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import TemplatePage from '../../components/TemplatePage';
import { Typography } from '@material-ui/core';

class Home extends React.Component {
  render() {
    const { userData } = this.props;
    return (
      <TemplatePage>
        {this.props.isAuthenticated ? <Typography variant="h5">
          Bienvenido {userData.userId} a la recertificación de usuarios
        </Typography> : <></>}
      </TemplatePage >
    )
  }
}

Home.prototypes = {
  userId: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  userData: state.authenticate.userData,
  isAuthenticated: state.authenticate.isAuthenticated,
});

const HomeConnected = connect(mapStateToProps, null)(Home);

export default withRouter(HomeConnected)