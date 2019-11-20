import React, { Component } from 'react';
import { Table, Paper, TableHead, TableRow, TableCell, TableBody, withStyles } from '@material-ui/core';
import { style } from '../../styles/EmployeesTable';

class EmployeesTable extends Component {

  renderEmployees = employees => {
    return employees.map(employee => {
      return employee.cuentas.map(accountsInSystems => {
        return (
          <TableRow>
            <TableCell key={employee.idEmpleado} >
              {employee.idEmpleado ? employee.idEmpleado : "----"}
            </TableCell>
            <TableCell key={employee.empleado} >
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
  }

  render() {
    const { bossData, classes } = this.props;
    return (

      <Paper className={classes.paper}>
        <h1>{bossData.idJefe}</h1>
        <h2>{bossData.jefe}</h2>
        <Table size="small" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={8} className={classes.tableTitle}>Empleados</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tableTitle}>Id</TableCell>
              <TableCell className={classes.tableTitle}>Nombre</TableCell>
              <TableCell colSpan={2} className={classes.tableTitle}>SAP</TableCell>
              <TableCell colSpan={2} className={classes.tableTitle}>TEL</TableCell>
              <TableCell colSpan={2} className={classes.tableTitle}>CIAT</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} className={classes.tableTitle}></TableCell>
              <TableCell className={classes.tableTitle}>Cuenta</TableCell>
              <TableCell className={classes.tableTitle}>Perfil</TableCell>
              <TableCell className={classes.tableTitle}>Cuenta</TableCell>
              <TableCell className={classes.tableTitle}>Perfil</TableCell>
              <TableCell className={classes.tableTitle}>Cuenta</TableCell>
              <TableCell className={classes.tableTitle}>Perfil</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              this.renderEmployees(bossData.empleados)
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(style)(EmployeesTable);