import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import BossesTable from '../BossesTable';
import EmployeesTable from '../EmployeesTable';
import { connect } from 'react-redux';
import { getBossesData, getBossDetail } from '../../redux/actions';

class Recertification extends Component {
  componentDidMount() {
    const { userData, selectedBoss, getBossesData, getBossDetail } = this.props;
    getBossesData(userData.token);
    if(selectedBoss) getBossDetail(userData.token, selectedBoss);
  }

  render() {
    const {  bosses } = this.props;
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <BossesTable bosses={bosses} />
        </Grid>

        <Grid item>
          {
            //<EmployeesTable selectedBoss={selectedBoss} />
          }
        </Grid>

      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  selectedBoss: state.recertification.selectedBoss,
  bosses: state.recertification.bosses
})

const mapDispatchToProps = dispatch => ({
  getBossesData: token => dispatch(getBossesData(token)),
  getBossDetail: (token, selectedBoss) => dispatch(getBossDetail(token, selectedBoss))
})

const connectedRecertification = connect(mapStateToProps, mapDispatchToProps)(Recertification);

export default connectedRecertification;