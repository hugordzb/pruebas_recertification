import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { SSOServices } from '../../services/SSOServices';

class AuditableUserTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      system: "",
      auditableAccounts: []
    };
  }

  componentDidMount() {
    //const { token } = this.props;
    let token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU3MzgxNzg4NywiaWF0IjoxNTczNzU3ODg3fQ.Z-l2xiAy4hzlskPvsM0eUINHYARQhsejNvkfyHd4UZgCEzJ6Q2nHUdWZv69wcrw6yOY8PrEJx-vZK2_AGVUUoA";
    new SSOServices(token).getAuditableUserAccounts((response => {
      console.log(response.data.ciat);
      this.setState({auditableAccounts: response.data.ciat});
    }), (responseError => {
      console.log(responseError);
    }));
  }

  renderUsers = system => {
    const { auditableAccounts } = this.state;
    return (<Table size="small" >
      <TableHead>
        <TableRow>
          <TableCell>Id Jefe</TableCell>
          <TableCell align="right">Jefe</TableCell>
          <TableCell align="right">Id Empleado</TableCell>
          <TableCell align="right">Empleado</TableCell>
          <TableCell align="right">Cuenta sistema</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          (auditableAccounts) ? auditableAccounts.map((user, i) => {
            return (
              <TableRow key={`${user.idEmpleado} ${user.cuentaSistema}`}>
                <TableCell align="right">{user.idJefe}</TableCell>
                <TableCell align="right">{user.jefe}</TableCell>
                <TableCell align="right">{user.empleado.idEmpleado}</TableCell>
                <TableCell align="right">{user.empleado.empleado}</TableCell>
                <TableCell align="right">{user.empleado.cuentaSistema}</TableCell>
              </TableRow>
            )
          }) :
          <p>No se encontraron usuarios</p>

        }
      </TableBody>
    </Table>)
  }

  render() {
    const { system } = this.props;
    return (
      <div>
        {(system) ? this.renderUsers(system) : <p>No hay usuarios para mostrar</p>}
      </div>
    );
  }
}

AuditableUserTable.propTypes = {
  system: PropTypes.string.isRequired,
};

export default AuditableUserTable;