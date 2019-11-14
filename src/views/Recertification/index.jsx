import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import TemplatePage from '../../components/TemplatePage';
import { Grid } from '@material-ui/core';
import System from '../../components/System';

const systems = [
  {
    name: "SART",
  },
  {
    name: "CIAT",
  },
  {
    name: "TEL",
  },
]


class Recertification extends React.Component {
  renderSystems = systems => {
    const { classes } = this.props;
    return (
      <Grid container direction="row">
        {systems.map((system, i) => <System key={i} system={system} />)}
      </Grid>
    )
  }
  render() {
    return (
      <TemplatePage>
        <Grid container spacing={1}>
          <Grid item container direcction="column">
            {this.renderSystems(systems)}
            <Grid item container direcction="row">

            </Grid>
          </Grid>
        </Grid>
      </TemplatePage >
    )
  }
}

Recertification.prototypes = {
  userId: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  userData: state.authenticate.userData,
  isAuthenticated: state.authenticate.isAuthenticated,
});

const RecertificationConnected = connect(mapStateToProps, null)(Recertification);

export default withRouter(RecertificationConnected);