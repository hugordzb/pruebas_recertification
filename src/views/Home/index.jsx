import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import TemplatePage from '../../components/TemplatePage'
import { Typography } from '@material-ui/core'

class Home extends React.Component {
  render() {
    return (
      <TemplatePage>
        <Typography variant="h6">
          Bienvenido {this.props.userId}
        </Typography>
        
      </TemplatePage >
    )
  }
}

Home.prototypes = {
  userId: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  userId: state.authenticate.user.userId,
  apps: state.authenticate.user.apps
});

const HomeConnected = connect(mapStateToProps, null)(Home)

export default withRouter(HomeConnected)