import React, { Component } from 'react';
import { Grid, LinearProgress } from '@material-ui/core';
import BossesTable from '../BossesTable';
import EmployeesTableForRecertification from '../EmployeesTableForRecertification';
import { connect } from 'react-redux';
import { getBossesData } from '../../redux/actions';
import FileUploader from '../FileUploader';
import PeriodSelector from '../PeriodSelector';

class Recertification extends Component {

  componentDidMount() {
    const { userData, selectedPeriod, getBossesData } = this.props;
    getBossesData(userData.token, selectedPeriod);
  }

  render() {
    const { bosses, selectedBoss } = this.props;
    return (
      <Grid container direction="column" justify="center" alignItems="center" >
        <Grid item>
          <FileUploader />
        </Grid>
        <Grid item>
          <PeriodSelector />
        </Grid>
        <Grid item>
          {bosses.length > 0 ? <BossesTable bosses={bosses} /> : <div>Cargando... <br /><LinearProgress color={"secondary"} /></div>}
        </Grid>
        <Grid item>
          <EmployeesTableForRecertification selectedBoss={selectedBoss} />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  bosses: state.recertification.bosses,
  selectedBoss: state.recertification.selectedBoss,
  isloading: state.loader.isloading,
  selectedPeriod: state.recertification.selectedPeriod
})

const mapDispatchToProps = dispatch => ({
  getBossesData: (token, selectedPeriod) => dispatch(getBossesData(token, selectedPeriod))
})

const connectedRecertification = connect(mapStateToProps, mapDispatchToProps)(Recertification);

export default connectedRecertification;