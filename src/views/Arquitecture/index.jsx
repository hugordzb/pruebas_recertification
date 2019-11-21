import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import TemplatePage from '../../components/TemplatePage';
import { Grid, LinearProgress } from '@material-ui/core';
import AuditableUserTable from '../../components/AuditableUserTable';

import { SSOServices } from '../../services/SSOServices';

class Arquitecture extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      systems: null,
      bosses: null
    };
  }

  componentDidMount() {
    const { userData } = this.props;
    userData.token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU3NDMzNTU2MCwiaWF0IjoxNTc0Mjc1NTYwfQ.XUnk7DQ2Ass5Xtxk1k8msA8Y9PXErktP_qLo24lng4qlO_crUsf_nh2xRHHH5wdK2WaF9VkHW5wHVVxsZnL25A";

    new SSOServices(userData.token).getAuditableUserAccounts((response => {
      console.log(response.data.jefes);
      this.setState({ bosses: response.data.jefes });
    }), (responseError => {
      console.log(responseError);
    }));

    new SSOServices(userData.token).getSystems((response => {
      console.log(response.data.systems);
      this.setState({ systems: response.data.systems });
    }), (responseError => {
      console.log(responseError);
    }));

  }

  renderArquitecture = (bosses, systems) => {
    const { userData } = this.props;
    userData.token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU3NDMzNTU2MCwiaWF0IjoxNTc0Mjc1NTYwfQ.XUnk7DQ2Ass5Xtxk1k8msA8Y9PXErktP_qLo24lng4qlO_crUsf_nh2xRHHH5wdK2WaF9VkHW5wHVVxsZnL25A";
    return (
      <>
        <Grid container direction="row">
          <p>Los sistemas auditables son: </p>
          {
            systems.map((system, i) => {
              return (
                <div style={{ margin: "1%" }} key={i}>
                  {system.sistema}
                </div>
              )
            })
          }
        </Grid>
        <Grid item container direcction="row">
          <AuditableUserTable bosses={bosses} userData={userData} />
        </Grid>
      </>

    )
  }

  render() {
    const { bosses, systems } = this.state;
    return (
      <TemplatePage>
        {
          (bosses && systems)? 
            this.renderArquitecture(bosses, systems):
            <LinearProgress color="secondary" />
        }
      </TemplatePage >
    )
  }
}

Arquitecture.prototypes = {
  system: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  userData: state.authenticate.userData,
  isAuthenticated: state.authenticate.isAuthenticated,
});

const connectedArquitecture = connect(mapStateToProps, null)(Arquitecture);

export default withRouter(connectedArquitecture);