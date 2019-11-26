import React, { Component } from 'react';
import { Grid, LinearProgress } from '@material-ui/core';
import BossesTable from '../BossesTable';
import EmployeesTableForRecertification from '../EmployeesTableForRecertification';
import { connect } from 'react-redux';
import FileUploader from '../FileUploader';
import PeriodSelector from '../PeriodSelector';

class Recertification extends Component {
  render() {
    const { bosses, selectedBoss, selectedPeriod } = this.props;
    return (
      <Grid container direction="column" justify="center" alignItems="center" >
        <Grid item>
          <PeriodSelector />
        </Grid>
        {
          (selectedPeriod || selectedPeriod.length === 4) ?
            <>
              <Grid item>
                <FileUploader />
              </Grid>
              <Grid item>
                {bosses.length > 0 ? <BossesTable bosses={bosses} /> : <div>Cargando... <br /><LinearProgress color={"secondary"} /></div>}
              </Grid>
              <Grid item>
                <EmployeesTableForRecertification selectedBoss={selectedBoss} />
              </Grid>
            </>
            :
            <></>
        }
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

const connectedRecertification = connect(mapStateToProps, null)(Recertification);

export default connectedRecertification;