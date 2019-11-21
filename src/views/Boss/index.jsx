import React, { Component } from 'react';
import TemplatePage from '../../components/TemplatePage';
import EmployeesTable from '../../components/EmployeesTable';
import { LinearProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { getBossDetail } from '../../redux/actions';

class Boss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bossData: null
    }
  }

  componentDidMount() {
    const { userData } = this.props;

    let idBoss = "jefe";
    this.props.getBossDetail(idBoss, userData.token);

  }

  render() {
    const { userData, boss } = this.props;
    return (
      <TemplatePage>
        {
          boss ? <EmployeesTable boss={boss} userData={userData}/>
            : <LinearProgress color="secondary" />
        }
      </TemplatePage >
    );
  }
}

const mapStateToProps = state => ({
  userData: state.authenticate.userData,
  isAuthenticated: state.authenticate.isAuthenticated,
  boss: state.recertification.boss
});

const mapDispatchToProps = dispatch => ({
  getBossDetail: token => dispatch(getBossDetail(token))
});

const connectedBoss = connect(mapStateToProps, mapDispatchToProps)(Boss);

export default connectedBoss;