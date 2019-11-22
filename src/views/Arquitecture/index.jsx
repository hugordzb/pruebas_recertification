import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TemplatePage from '../../components/TemplatePage';
import { Grid, LinearProgress } from '@material-ui/core';
import AuditableUserTable from '../../components/AuditableUserTable';
import { getAuditableUserAccounts } from '../../redux/actions';

class Arquitecture extends React.Component {
  
  componentDidMount() {
    const { userData, getAuditableUserAccounts } = this.props;
    getAuditableUserAccounts(userData.token);
  }

  renderArquitecture = (auditableAccounts, auditableSystems) => {
    const { userData } = this.props;
    return (
      <>
        <Grid container direction="row">
          <p>Los sistemas auditables son: </p>
          {
            auditableSystems.map((system, i) => {
              return (
                <div style={{ margin: "1%" }} key={i}>
                  {system.sistema}
                </div>
              )
            })
          }
        </Grid>
        <Grid item container direcction="row">
          <AuditableUserTable auditableAccounts={auditableAccounts} userData={userData} />
        </Grid>
      </>

    )
  }

  render() {
    const { auditableAccounts, auditableSystems, isLoading } = this.props;
    return (
      <TemplatePage>
        {
          !isLoading ?
            this.renderArquitecture(auditableAccounts, auditableSystems) :
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
  userData: state.authentication.userData,
  auditableSystems: state.recertification.auditableSystems,
  auditableAccounts: state.recertification.auditableAccounts,
  isLoading: state.loader.isloading
});

const mapDispatchToProps = dispatch => ({
  getAuditableUserAccounts: token => dispatch(getAuditableUserAccounts(token))
})

const connectedArquitecture = connect(mapStateToProps, mapDispatchToProps)(Arquitecture);

export default withRouter(connectedArquitecture);