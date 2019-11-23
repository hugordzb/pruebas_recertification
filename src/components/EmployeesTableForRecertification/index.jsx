import React, { Component } from 'react';
import { Table, Paper, TableHead, TableRow, TableCell, TableBody, withStyles, LinearProgress } from '@material-ui/core';
import { style } from '../../styles/EmployeesTable';
import { getBossDetail } from '../../redux/actions';
import { connect } from 'react-redux';

class EmployeesTableForRecertification extends Component {

  renderEmployeesTable = boss => {
    const { classes } = this.props;
    let employees = boss.empleados;
    return (
      <Paper className={classes.paper}>
        <h1>{boss.idJefe}</h1>
        <h2>{boss.jefe}</h2>
        {
          (employees.length > 0) ?
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
                  employees.map((employee, i) => {
                    return employee.cuentas.map((accountsInSystems, j) => {
                      return (
                        <TableRow key={`${employee.idEmpleado} ${i} ${j} employees row`}>
                          {
                            j === 0 ?
                              <>
                                <TableCell key={`${employee.idEmpleado} employees cell`} rowSpan={employee.cuentas.length}>
                                  {employee.idEmpleado ? employee.idEmpleado : "----"}
                                </TableCell>
                                <TableCell key={`${employee.empleado} employees cell`} rowSpan={employee.cuentas.length}>
                                  {employee.empleado ? employee.empleado : "----"}
                                </TableCell>
                              </>
                              :
                              <></>
                          }
                          <TableCell key={`${accountsInSystems.csap} sap account employees cell`}>
                            {accountsInSystems.csap ? accountsInSystems.csap : "----"}
                          </TableCell>
                          <TableCell key={`${accountsInSystems.psap} sap role employees cell`}>
                            {accountsInSystems.psap ? accountsInSystems.psap : "----"}
                          </TableCell>
                          <TableCell key={`${accountsInSystems.ctel} tel account employees cell`}>
                            {accountsInSystems.ctel ? accountsInSystems.ctel : "----"}
                          </TableCell>
                          <TableCell key={`${accountsInSystems.ptel} tel role employees cell`}>
                            {accountsInSystems.ptel ? accountsInSystems.ptel : "----"}
                          </TableCell>
                          <TableCell key={`${accountsInSystems.cciat} ciat account employees cell`}>
                            {accountsInSystems.cciat ? accountsInSystems.cciat : "----"}
                          </TableCell>
                          <TableCell key={`${accountsInSystems.pciat} ciat profile employees cell`}>
                            {accountsInSystems.pciat ? accountsInSystems.pciat : "----"}
                          </TableCell>
                        </TableRow>
                      )
                    })
                  })
                }
              </TableBody>
            </Table>
            :
            <p>No se tiene registrado un equipo de trabajo.</p>
        }
      </Paper>

    )
  }

  render() {
    const { boss } = this.props;
    return (
      <>
        {
          boss.idJefe ? this.renderEmployeesTable(boss) :
            <LinearProgress color={"secondary"} />
        }
      </>
    );
  }
}

const mapStateToProps = state => ({
  boss: state.recertification.boss,
  isLoading: state.loader.isloading
});

const mapDispatchToProps = dispatch => ({
  getBossDetail: (token, bossId) => dispatch(getBossDetail(token, bossId))
});

const connectedEmployeesTableForRecertification = connect(mapStateToProps, mapDispatchToProps)(EmployeesTableForRecertification);

export default withStyles(style)(connectedEmployeesTableForRecertification);