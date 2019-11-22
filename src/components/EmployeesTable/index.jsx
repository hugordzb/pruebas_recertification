import React, { Component } from 'react';
import { Table, Paper, TableHead, TableRow, TableCell, TableBody, withStyles, Fab, Button } from '@material-ui/core';
import { style } from '../../styles/EmployeesTable';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Services } from '../../services';

class EmployeesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deletes: [],
      updates: []
    }
  }

  handleSaveChanges = () => {
    const { userData } = this.props;
    userData.token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU3NDMzNTU2MCwiaWF0IjoxNTc0Mjc1NTYwfQ.XUnk7DQ2Ass5Xtxk1k8msA8Y9PXErktP_qLo24lng4qlO_crUsf_nh2xRHHH5wdK2WaF9VkHW5wHVVxsZnL25A";
    let { deletes, updates } = this.state;
    deletes.forEach(deletedEmployee => {

      let data = {
        tipoMov: "B",
        idUsuario: deletedEmployee.idEmpleado,
        nIdUsuario: "",
        perfil: "",
        sistema: "",
        nPerfil: "",
        nSistema: "",
        cuentaSistema: "",
        nCuentaSistema: "",
        idJefe: "",
        nIdJefe: "",
        solicitante: userData.userId
      }

      new Services(userData.token, null, data).requestChange((response => {
        console.log(response);
      }), (responseError => {
        console.log(responseError);
      }));
    });
  }

  handleDelete = employee => {
    let { deletes } = this.state;
    if (!deletes.includes(employee)) {
      deletes.push(employee);
    }
    this.setState({ deletes });
  }

  handleDeleteFromDeletes = employee => {
    let { deletes } = this.state;
    deletes.splice(deletes.indexOf(employee), 1);
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
              <TableCell colSpan={9} className={classes.tableTitle}>Deletes</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tableTitle}>Id</TableCell>
              <TableCell className={classes.tableTitle}>Nombre</TableCell>
              <TableCell colSpan={2} className={classes.tableTitle}>SAP</TableCell>
              <TableCell colSpan={2} className={classes.tableTitle}>TEL</TableCell>
              <TableCell colSpan={2} className={classes.tableTitle}>CIAT</TableCell>
              <TableCell colSpan={1} className={classes.tableTitle}></TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} className={classes.tableTitle}></TableCell>
              <TableCell className={classes.tableTitle}>Cuenta</TableCell>
              <TableCell className={classes.tableTitle}>Rol</TableCell>
              <TableCell className={classes.tableTitle}>Cuenta</TableCell>
              <TableCell className={classes.tableTitle}>Rol</TableCell>
              <TableCell className={classes.tableTitle}>Cuenta</TableCell>
              <TableCell className={classes.tableTitle}>Perfil</TableCell>
              <TableCell colSpan={1} className={classes.tableTitle}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              deletes.map((employee, i) => {
                return employee.cuentas.map((accountsInSystems, j) => {
                  return (
                    <TableRow key={`${employee.idEmpleado} ${i} ${j} deletes row`}>
                      {
                        j === 0 ?
                          <>
                            <TableCell key={`${employee.idEmpleado} deletes cell`} rowSpan={employee.cuentas.length}>
                              {employee.idEmpleado ? employee.idEmpleado : "----"}
                            </TableCell>
                            <TableCell key={`${employee.empleado} deletes cell`} rowSpan={employee.cuentas.length}>
                              {employee.empleado ? employee.empleado : "----"}
                            </TableCell>
                          </>
                          :
                          <></>
                      }
                      <TableCell key={`${accountsInSystems.csap} sap account deletes cell`}>
                        {accountsInSystems.csap ? accountsInSystems.csap : "----"}
                      </TableCell>
                      <TableCell key={`${accountsInSystems.psap} sap role deletes cell`}>
                        {accountsInSystems.psap ? accountsInSystems.psap : "----"}
                      </TableCell>
                      <TableCell key={`${accountsInSystems.ctel} tel account deletes cell`}>
                        {accountsInSystems.ctel ? accountsInSystems.ctel : "----"}
                      </TableCell>
                      <TableCell key={`${accountsInSystems.ptel} tel role deletes cell`}>
                        {accountsInSystems.ptel ? accountsInSystems.ptel : "----"}
                      </TableCell>
                      <TableCell key={`${accountsInSystems.cciat} ciat account deletes cell`}>
                        {accountsInSystems.cciat ? accountsInSystems.cciat : "----"}
                      </TableCell>
                      <TableCell key={`${accountsInSystems.pciat} ciat profile deletes cell`}>
                        {accountsInSystems.pciat ? accountsInSystems.pciat : "----"}
                      </TableCell>
                      {
                        j === 0 ?
                          <>
                            <TableCell key={`${employee.idEmpleado} delete deletes cell`} rowSpan={employee.cuentas.length}>
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
    const { boss, classes } = this.props;
    const { deletes, updates } = this.state;
    return (
      <>
        <Paper className={classes.paper}>
          <h1>{boss.idJefe}</h1>
          <h2>{boss.jefe}</h2>
          <Button onClick={this.handleSaveChanges}>Guardar cambios</Button>
          {
            this.renderEmployeesTable(boss.empleados)
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