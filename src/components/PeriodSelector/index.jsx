import React, { Component } from 'react';
import { Grid, Button, Fab } from '@material-ui/core';
import { connect } from 'react-redux';
import { selectPeriod, getBossesData } from '../../redux/actions';
import AddIcon from '@material-ui/icons/Add';

class PeriodSelector extends Component {

  componentDidMount() {
    //const { userData } = this.props;
    //this.props.getRecertificationPeriods(userData.token)
  }

  handleSelectPeriod = period => {
    const { userData } = this.props;
    this.props.selectPeriod(period);
    this.props.getBossesData(userData.token, period);
  }

  handleAddPeriod = () => {
    alert("Se va a agregar un periodo");
  }

  render() {
    const { periods } = this.props;
    return (
      <Grid container direction="row" justify="center" alignItems="center">
        {
          periods.map(period => {
            return (<Button key={`${period}`} onClick={event => this.handleSelectPeriod(period)}>{period}</Button>)
          })
        }
        <Fab color="primary" aria-label="add" onClick={event => this.handleAddPeriod()}>
          <AddIcon />
        </Fab>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  periods: state.recertification.periods,
  userData: state.authentication.userData
})

const mapDispatchToProps = dispatch => ({
  //getRecertificationPeriods: token => dispatch(getRecertificationPeriods(token)),
  getBossesData: (token, selectedPeriod) => dispatch(getBossesData(token, selectedPeriod)),
  selectPeriod: period => dispatch(selectPeriod(period))
})

const connectedPeriodSelector = connect(mapStateToProps, mapDispatchToProps)(PeriodSelector);

export default connectedPeriodSelector;