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
    console.log(userData.userId);
    getBossDetail(userData.token, userData.userId);
  }

  render() {
    const { userData, isLoading, boss } = this.props;
    return (
      <TemplatePage>
        {
          !isLoading ? <EmployeesTable boss={boss} userData={userData}/>
            : <LinearProgress color="secondary" />
        }
      </TemplatePage >
    );
  }
}

const mapStateToProps = state => ({
  userData: state.authentication.userData,
  boss: state.recertification.boss,
  isLoading: state.loader.isLoading
});

const mapDispatchToProps = dispatch => ({
  getBossDetail: (token, bossId) => dispatch(getBossDetail(token, bossId))
});

const connectedBoss = connect(mapStateToProps, mapDispatchToProps)(Boss);

export default connectedBoss;