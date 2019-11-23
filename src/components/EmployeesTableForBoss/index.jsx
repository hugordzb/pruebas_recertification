import React, { Component } from 'react';
import { Table, Paper, TableHead, TableRow, TableCell, TableBody, withStyles, Fab, Button, LinearProgress } from '@material-ui/core';
import { style } from '../../styles/EmployeesTable';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { getBossDetail, deleteEmployee } from '../../redux/actions';
import { connect } from 'react-redux';

class EmployeesTableForBoss extends Component {

  componentDidMount() {
    const { userData, getBossDetail } = this.props;
    getBossDetail(userData.token, userData.userId);
  }

  handleDelete = employee => {
    alert(`Se va a elminar ${employee.empleado}`);
    const { userData } = this.props;
    this.props.deleteEmployee(userData.token, employee, userData.userId);
  }
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
                  <TableCell colSpan={10} className={classes.tableTitle}>Empleados</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tableTitle}>Id</TableCell>
                  <TableCell className={classes.tableTitle}>Nombre</TableCell>
                  <TableCell colSpan={2} className={classes.tableTitle}>SAP</TableCell>
                  <TableCell colSpan={2} className={classes.tableTitle}>TEL</TableCell>
                  <TableCell colSpan={2} className={classes.tableTitle}>CIAT</TableCell>
                  <TableCell colSpan={2} className={classes.tableTitle}>Opciones</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2} className={classes.tableTitle}></TableCell>
                  <TableCell className={classes.tableTitle}>Cuenta</TableCell>
                  <TableCell className={classes.tableTitle}>Perfil</TableCell>
                  <TableCell className={classes.tableTitle}>Cuenta</TableCell>
                  <TableCell className={classes.tableTitle}>Perfil</TableCell>
                  <TableCell className={classes.tableTitle}>Cuenta</TableCell>
                  <TableCell className={classes.tableTitle}>Perfil</TableCell>
                  <TableCell colSpan={2} className={classes.tableTitle}></TableCell>
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
                          {
                            j === 0 ?
                              <>
                                <TableCell key={`${employee.idEmpleado} delete employees cell`} rowSpan={employee.cuentas.length}>
                                  <Fab color="secondary" onClick={() => this.handleDelete(employee)}>
                                    <HighlightOffIcon />
                                  </Fab>
                                </TableCell>
                                <TableCell key={`${employee.idEmpleado} update employees cell`} rowSpan={employee.cuentas.length}>
                                  <Button>{"Modificar"}</Button>
                                </TableCell>
                              </>
                              :
                              <></>
                          }

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
    const { boss, isloading } = this.props;
    return (
      <>
        {
          boss.idJefe && !isloading ? this.renderEmployeesTable(boss) :
            <LinearProgress color={"secondary"} />
        }
      </>
    );
  }
}

const mapStateToProps = state => ({
  boss: state.recertification.boss,
  isloading: state.loader.isloading
});

const mapDispatchToProps = dispatch => ({
  getBossDetail: (token, bossId) => dispatch(getBossDetail(token, bossId)),
  deleteEmployee: (token, employee, requester) => dispatch(deleteEmployee(token, employee, requester))
});

const connectedEmployeesTableForBoss = connect(mapStateToProps, mapDispatchToProps)(EmployeesTableForBoss);

export default withStyles(style)(connectedEmployeesTableForBoss);