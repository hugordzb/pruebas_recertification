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



  allSystems = () => {
    let sistemas = [];

    if (this.props.boss.empleados && this.props.boss.empleados.length > 0) {
      this.props.boss.empleados.forEach(element => {
        element.cuentas.map((accountsInSystems, j) => {
          sistemas.push(accountsInSystems.system);
        });
      });

      let sistemasTmp = sistemas.filter(this.onlyUnique);
      let columsSytem = [];
      sistemasTmp.forEach((el, idx) => {
        columsSytem.push({
          column: idx,
          system: el
        });
      });

      return columsSytem;
    }

    return null;
  }


  onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  }

  renderSystemsColumns = (systems) => {
    let columns = [];

    if (!systems)
      return columns;

    systems.forEach((element, idx) => {
      columns.push(<TableCell key={idx + '-' + element.system} colSpan={2}
        className={this.props.classes.tableTitle}>{element.system}</TableCell>);
    });

    return columns;
  }

  renderSystemsOptionsColumns = (systems) => {
    let columns = [];

    if(!systems)
      return columns;

    systems.forEach((element, idx) => {
      columns.push(<TableCell key={'opt-'+idx} className={this.props.classes.tableTitle}>Cuenta</TableCell>);
      columns.push(<TableCell key={'optp-'+idx} className={this.props.classes.tableTitle}>Perfil</TableCell>);
    });

    return columns;
  }

  renderItemsAccount = (systems, accountsInSystems) => {
    let columns = [];

    systems.forEach((elm, idx) => {
      let valueRow1 = '---';
      let valueRow2 = '---';

      if(elm.system === accountsInSystems.system){
        valueRow1 = accountsInSystems.cuenta;
        valueRow2 = accountsInSystems.perfil;
      }

      columns.push(<TableCell key={`${idx} sap account employees cell`}>
        {valueRow1}
      </TableCell>);
      
      columns.push(<TableCell key={`${idx} sap role employees cell`}>
        {valueRow2}
      </TableCell>);
    });

    return columns;
  }


  renderEmployeesTable = boss => {
    const { classes } = this.props;
    let employees = boss.empleados;
    let systems = this.allSystems();
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
              {this.renderSystemsColumns(systems)}
              <TableCell colSpan={2} className={classes.tableTitle}>Opciones</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} className={classes.tableTitle}></TableCell>
              {this.renderSystemsOptionsColumns(systems)}
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
                          {this.renderItemsAccount(systems, accountsInSystems)}
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