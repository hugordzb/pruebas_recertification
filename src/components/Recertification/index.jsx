import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import BossesTable from '../BossesTable';
import EmployeesTableForRecertification from '../EmployeesTableForRecertification';
import { connect } from 'react-redux';
import { getBossesData } from '../../redux/actions';

class Recertification extends Component {
  
  componentDidMount() {
    const { userData, getBossesData } = this.props;
    getBossesData(userData.token);
  }

  render() {
    const { bosses, selectedBoss } = this.props;
    return (
      <Grid container
        direction="column" justify="center" alignItems="center" >
        <Grid item>
          <BossesTable bosses={bosses} />
        </Grid>

        <Grid item>
          {
            <EmployeesTableForRecertification selectedBoss={selectedBoss} />
          }
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  bosses: state.recertification.bosses,
  boss: state.recertification.boss
})

const mapDispatchToProps = dispatch => ({
  getBossesData: token => dispatch(getBossesData(token))
})

const connectedRecertification = connect(mapStateToProps, mapDispatchToProps)(Recertification);

export default connectedRecertification;