import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import TemplatePage from '../../components/TemplatePage';
import { Grid } from '@material-ui/core';
import AuditableUserTable from '../../components/AuditableUserTable';

import { SSOServices } from '../../services/SSOServices';
import AddUserControl from '../../components/AddUserControl';

class Recertification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      systems: [],
    };
  }

  componentDidMount() {
    const { userData } = this.props;
    userData.token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU3NDIzMDY4NSwiaWF0IjoxNTc0MTcwNjg1fQ.OzWn9bfbZrhI6fmiuCcQXnaKPuYm95ZfxgEWFTooEdNOdmXO3G9XGQFrur_lwnRE32rY4vzMHkEOZqb0FArCZg";
    new SSOServices(userData.token).getSystems((response => {
      console.log(response.data.systems);
      this.setState({ systems: response.data.systems });
    }), (responseError => {
      console.log(responseError);
    }));
  }

  renderSystems = systems => {
    const { userData } = this.props;
    userData.token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU3NDIzMDY4NSwiaWF0IjoxNTc0MTcwNjg1fQ.OzWn9bfbZrhI6fmiuCcQXnaKPuYm95ZfxgEWFTooEdNOdmXO3G9XGQFrur_lwnRE32rY4vzMHkEOZqb0FArCZg";
    return (
      <>
        <Grid container direction="row">
          <p>Los sistemas auditables son: </p>
          {systems.map((system, i) => <div style={{ margin: "1%" }} key={i}>
            {system.sistema}
          </div>)}
        </Grid>
        <Grid item container direcction="row">
          <AuditableUserTable token={userData.token} />
        </Grid>
      </>

    )
  }

  render() {
    const { systems } = this.state;
    return (
      <TemplatePage>
        <Grid container spacing={1}>
          <Grid item container direcction="column">
            {systems ? this.renderSystems(systems) : <p>No hay sistemas que mostrar</p>}
          </Grid>
        </Grid>
        <AddUserControl />
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