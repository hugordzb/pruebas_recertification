import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import SystemMenu from '../../components/SystemMenu'

import { connect } from 'react-redux'
import TemplatePage from '../../components/TemplatePage'
import { Typography } from '@material-ui/core'

class Home extends React.Component {
  render() {
    const { userData } = this.props;
    return (
      <TemplatePage>
        <Typography variant="h5">
          Bienvenido {userData.userId}
        </Typography>
        {
          userData.apps.length > 0 ?
            <SystemMenu apps={userData.apps}></SystemMenu> :
            <Typography variant="h6">No se tienen sistemas registrados en esta cuenta</Typography>
        }

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