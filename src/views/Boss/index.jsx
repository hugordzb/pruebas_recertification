import React, { Component } from 'react';
import TemplatePage from '../../components/TemplatePage';
import EmployeesTable from '../../components/EmployeesTable';

class Boss extends Component {
  render() {
    return (
      <TemplatePage>
        <EmployeesTable />
      </TemplatePage >
    );
  }
}

export default Boss;