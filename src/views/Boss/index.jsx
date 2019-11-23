import React, { Component } from 'react';
import TemplatePage from '../../components/TemplatePage';
import EmployeesTable from '../../components/EmployeesTable';
import { connect } from 'react-redux';

class Boss extends Component {
  render() {
    const { userData } = this.props;
    return (
      <TemplatePage>
        <EmployeesTable userData={userData} />
      </TemplatePage >
    );
  }
}

const mapStateToProps = state => ({
  userData: state.authentication.userData
});

const connectedBoss = connect(mapStateToProps, null)(Boss);

export default connectedBoss;