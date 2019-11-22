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
    const { userData, getBossDetail } = this.props;

    let idBoss = "908901";
    getBossDetail(idBoss, userData.token);
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
  userData: state.authentication.userData,
  isAuthenticated: state.authentication.isAuthenticated,
  boss: state.recertification.boss,
  isLoading: state.loader.isLoading
});

const mapDispatchToProps = dispatch => ({
  getBossDetail: token => dispatch(getBossDetail(token))
});

const connectedBoss = connect(mapStateToProps, mapDispatchToProps)(Boss);

export default connectedBoss;