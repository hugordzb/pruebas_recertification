import React, { Component } from 'react';
import TemplatePage from '../../components/TemplatePage';
import EmployeesTableForBoss from '../../components/EmployeesTableForBoss';
import { connect } from 'react-redux';

class Boss extends Component {
  render() {
    const { userData, isAuthenticated } = this.props;
    return (
      <TemplatePage>
        {
          isAuthenticated ? <EmployeesTableForBoss userData={userData} /> : <></>
        }
      </TemplatePage >
    );
  }
}

const mapStateToProps = state => ({
  userData: state.authentication.userData,
  isAuthenticated: state.authentication.isAuthenticated
});

const connectedBoss = connect(mapStateToProps, null)(Boss);

export default connectedBoss;