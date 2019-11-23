import React, { Component } from 'react';
import TemplatePage from '../../components/TemplatePage';
import EmployeesTableForBoss from '../../components/EmployeesTableForBoss';
import { connect } from 'react-redux';

class Boss extends Component {
  render() {
    const { userData } = this.props;
    return (
      <TemplatePage>
        <EmployeesTableForBoss userData={userData} />
      </TemplatePage >
    );
  }
}

const mapStateToProps = state => ({
  userData: state.authentication.userData
});

const connectedBoss = connect(mapStateToProps, null)(Boss);

export default connectedBoss;