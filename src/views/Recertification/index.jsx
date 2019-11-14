import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import TemplatePage from '../../components/TemplatePage';
import { Grid } from '@material-ui/core';
import AuditableUserTable from '../../components/AuditableUserTable';

import { SSOServices } from '../../services/SSOServices';

class Recertification extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      systems: [],
      selectedSystem: "",
    };
  }

  componentDidMount(){
    //const { userData } = this.props;
    let token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU3MzgxNzg4NywiaWF0IjoxNTczNzU3ODg3fQ.Z-l2xiAy4hzlskPvsM0eUINHYARQhsejNvkfyHd4UZgCEzJ6Q2nHUdWZv69wcrw6yOY8PrEJx-vZK2_AGVUUoA";
    new SSOServices(/*userData.*/token).getSystems((response => {
      console.log(response.data.systems);
      this.setState({systems: response.data.systems});
    }), (responseError => {
      console.log(responseError);
    }));
  }

  changeSystem = system => {
    alert("Se selecciono" + system)
    this.setState({selectedSystem: system});
  }

  renderSystems = systems => {
    return (
      <Grid container direction="row">
        {systems.map((system, i) => <button key={system} onClick={() => this.changeSystem(system)}>
          {system}
        </button>)}
      </Grid>
    )
  }

  render() {
    const { userData } = this.props;
    const { selectedSystem, systems } = this.state;
    return (
      <TemplatePage>
        <Grid container spacing={1}>
          <Grid item container direcction="column">
            {(systems ) ? this.renderSystems(systems) : <p>No hay sistemas que mostrar</p>}
            <Grid item container direcction="row">
              {(selectedSystem) ? <AuditableUserTable system={selectedSystem} token={userData.token}/> :
              <p>Seleccione un sistema para visualizar a los usuarios</p>}
            </Grid>
          </Grid>
        </Grid>
      </TemplatePage >
    )
  }
}

Recertification.prototypes = {
  system: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  userData: state.authenticate.userData,
  isAuthenticated: state.authenticate.isAuthenticated,
});

const RecertificationConnected = connect(mapStateToProps, null)(Recertification);

export default withRouter(RecertificationConnected);