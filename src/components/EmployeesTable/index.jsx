import React, { Component } from 'react';
import { Table, Paper, TableHead, TableRow, TableCell, TableBody, withStyles, Fab, Button } from '@material-ui/core';
import { style } from '../../styles/EmployeesTable';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

class EmployeesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deletes: [],
      updates: []
    }
  }

  handleDelete = employee => {
    alert(`Se va a eliminar ${employee.empleado}`);
    let deletes = this.state.deletes;
    if(!deletes.includes(employee)){
      deletes.push(employee);
    }
    this.setState({ deletes });
  }

  handleDeleteFromDeletes = employee => {
    alert(`Se va a eliminar ${employee.empleado}`);
    let deletes = this.state.deletes;
    deletes.splice( deletes.indexOf(employee), 1 );
    this.setState({ deletes });
  }

  renderEmployeesTable = employees => {
    const { classes } = this.props;
    return (
      employees ?
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
              employees.map(employee => {
                return employee.cuentas.map((accountsInSystems, i) => {
                  return (
                    <TableRow>
                      {
                        i === 0 ?
                          <>
                            <TableCell key={employee.idEmpleado} rowSpan={employee.cuentas.length}>
                              {employee.idEmpleado ? employee.idEmpleado : "----"}
                            </TableCell>
                            <TableCell key={employee.empleado} rowSpan={employee.cuentas.length}>
                              {employee.empleado ? employee.empleado : "----"}
                            </TableCell>
                          </>
                          :
                          <></>
                      }
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
                      {
                        i === 0 ?
                          <>
                            <TableCell key={`${employee.idEmpleado} delete`} rowSpan={employee.cuentas.length}>
                              <Fab color="secondary" onClick={() => this.handleDelete(employee)}>
                                <HighlightOffIcon />
                              </Fab>
                            </TableCell>
                            <TableCell key={accountsInSystems.pciat} rowSpan={employee.cuentas.length}>
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
        <h1>No se tiene registrado un equipo de trabajo.</h1>
    )
  }

  renderDeletes = deletes => {
    const { classes } = this.props;
    return (
      <>
        <Table size="small" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={8} className={classes.tableTitle}>Deletes</TableCell>
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
              deletes.map(employee => {
                return employee.cuentas.map((accountsInSystems, j) => {
                  return (
                    <TableRow>
                      {
                        j === 0 ?
                          <>
                            <TableCell key={employee.idEmpleado} rowSpan={employee.cuentas.length}>
                              {employee.idEmpleado ? employee.idEmpleado : "----"}
                            </TableCell>
                            <TableCell key={employee.empleado} rowSpan={employee.cuentas.length}>
                              {employee.empleado ? employee.empleado : "----"}
                            </TableCell>
                          </>
                          :
                          <></>
                      }
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
                      {
                        j === 0 ?
                          <>
                            <TableCell key={`${employee.idEmpleado} delete`} rowSpan={employee.cuentas.length}>
                              <Fab color="secondary" onClick={() => this.handleDeleteFromDeletes(employee)}>
                                <HighlightOffIcon />
                              </Fab>
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
      </>
    )
  }

  renderUpdates = updates => {

  }

  render() {
    const { bossData, classes } = this.props;
    const { deletes, updates } = this.state;
    return (
      <>
        <Paper className={classes.paper}>
          <h1>{bossData.idJefe}</h1>
          <h2>{bossData.jefe}</h2>
          {
            this.renderEmployeesTable(bossData.empleados)
          }
        </Paper>

        <Paper className={classes.paper}>
          {
            (Array.isArray(deletes) && deletes.length) ?
              this.renderDeletes(deletes) :
              <></>
          }
        </Paper>

        <Paper className={classes.paper}>
          {
            (Array.isArray(updates) && updates.length) ?
              this.renderUpdates(updates) :
              <></>
          }
        </Paper>
      </>
    );
  }
}

export default withStyles(style)(EmployeesTable);