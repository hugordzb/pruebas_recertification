import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, withStyles } from '@material-ui/core';
import { SSOServices } from '../../services/SSOServices';
import { style } from '../../styles/AuditableUserTable';

class AuditableUserTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auditableAccounts: []
    };
  }

  componentDidMount() {
    const { token } = this.props;
    new SSOServices(token).getAuditableUserAccounts((response => {
      console.log(response.data.jefes);
      this.setState({ auditableAccounts: response.data.jefes });
    }), (responseError => {
      console.log(responseError);
    }));
  }

  renderAccounts = () => {
    const { auditableAccounts } = this.state;
    return (
      <>
        {
          auditableAccounts.map((boss, i) => {
            return boss.empleados.map((employee, j) => {
              return employee.cuentas.map((accountsInSystems, k) => {
                console.log (`i: ${i}, j: ${j}, k: ${k}`);
                return (
                  <TableRow key={boss.idJefe}>
                    <TableCell key={boss.idJefe}>
                      {boss.idJefe ? boss.idJefe : "----"}
                    </TableCell>
                    <TableCell key={boss.jefe}>
                      {boss.jefe ? boss.jefe : "----"}
                    </TableCell>
                    <TableCell key={employee.idEmpleado}>
                      {employee.idEmpleado ? employee.idEmpleado : "----"}
                    </TableCell>
                    <TableCell key={employee.empleado}>
                      {employee.empleado ? employee.empleado : "----"}
                    </TableCell>
                    <TableCell key={accountsInSystems.csap}>
                      {accountsInSystems.csap ? accountsInSystems.csap : "----"}
                    </TableCell>
                    <TableCell key={accountsInSystems.psap}>
                      {accountsInSystems.psap ? accountsInSystems.psap : "----"}
                    </TableCell>
                    <TableCell key={accountsInSystems.ctel}>
                      {accountsInSystems.ctel ? accountsInSystems.ctel : "----"}
                    </TableCell>
                    <TableCell key={accountsInSystems.ptel}>
                      {accountsInSystems.ptel ? accountsInSystems.ptel : "----"}
                    </TableCell>
                    <TableCell key={accountsInSystems.cciat}>
                      {accountsInSystems.cciat ? accountsInSystems.cciat : "----"}
                    </TableCell>
                    <TableCell key={accountsInSystems.pciat}>
                      {accountsInSystems.pciat ? accountsInSystems.pciat : "----"}
                    </TableCell>
                  </TableRow>
                )
              })
            })
          })
        }
      </>
    )
  }
  renderTableBody = system => {
    const { classes } = this.props;
    console.log()
    return (
      <Paper className={classes.paper}>
        <Table size="small" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2} className={classes.tableTitle}>Jefe</TableCell>
              <TableCell colSpan={8} className={classes.tableTitle}>Empleados</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tableTitle}>Id</TableCell>
              <TableCell className={classes.tableTitle}>Nombre</TableCell>
              <TableCell className={classes.tableTitle}>Id</TableCell>
              <TableCell className={classes.tableTitle}>Nombre</TableCell>
              <TableCell colSpan={2} className={classes.tableTitle}>SAP</TableCell>
              <TableCell colSpan={2} className={classes.tableTitle}>TEL</TableCell>
              <TableCell colSpan={2} className={classes.tableTitle}>CIAT</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4} className={classes.tableTitle}></TableCell>
              <TableCell className={classes.tableTitle}>Cuenta</TableCell>
              <TableCell className={classes.tableTitle}>Perfil</TableCell>
              <TableCell className={classes.tableTitle}>Cuenta</TableCell>
              <TableCell className={classes.tableTitle}>Perfil</TableCell>
              <TableCell className={classes.tableTitle}>Cuenta</TableCell>
              <TableCell className={classes.tableTitle}>Perfil</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.renderAccounts()}
          </TableBody>
        </Table>
      </Paper>
    )
  }

  render() {
    const { auditableAccounts } = this.state;
    return (
      <div>
        {
          auditableAccounts ?
            this.renderTableBody() :
            <p>No se encuentran usuarios para auditar</p>
        }
      </div>
    );
  }
}

AuditableUserTable.propTypes = {
  token: PropTypes.string.isRequired,
};

export default withStyles(style)(AuditableUserTable);