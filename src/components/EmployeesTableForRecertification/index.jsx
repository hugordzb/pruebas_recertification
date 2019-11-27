import React from 'react';
import { Table, Paper, TableHead, TableRow, TableCell, TableBody, withStyles, LinearProgress } from '@material-ui/core';
import { style } from '../../styles/EmployeesTable';
import { getBossDetail } from '../../redux/actions';
import { connect } from 'react-redux';

class EmployeesTableForRecertification extends React.Component {

  allSystems = () => {
    let sistemas = [];

    if (this.props.boss.empleados && this.props.boss.empleados.length > 0) {
      this.props.boss.empleados.forEach(element => {
        element.cuentas.map((accountsInSystems, j) => {
          sistemas.push(accountsInSystems.system);
          return "";
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

    if (!systems)
      return columns;

    systems.forEach((element, idx) => {
      columns.push(<TableCell key={'opt-' + idx} className={this.props.classes.tableTitle}>Cuenta</TableCell>);
      columns.push(<TableCell key={'optp-' + idx} className={this.props.classes.tableTitle}>Perfil</TableCell>);
    });

    return columns;
  }

  renderItemsAccount = (systems, accountsInSystems) => {
    let columns = [];

    systems.forEach((elm, idx) => {
      let valueRow1 = '---';
      let valueRow2 = '---';

      if (elm.system === accountsInSystems.system) {
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
                  <TableCell colSpan={8} className={classes.tableTitle}>Empleados</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tableTitle}>Id</TableCell>
                  <TableCell className={classes.tableTitle}>Nombre</TableCell>
                  {this.renderSystemsColumns(systems)}
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2} className={classes.tableTitle}></TableCell>
                  {this.renderSystemsOptionsColumns(systems)}
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
                        </TableRow>
                      )
                    })
                  })
                }
              </TableBody>
            </Table>
            : <p>No se tiene registrado un equipo de trabajo.</p>
        }
      </Paper>
    )
  }

  render() {
    return (
      <div>
        {
          (Object.entries(this.props.boss).length > 0 && !this.props.isloading)
            ? this.renderEmployeesTable(this.props.boss)
            : <LinearProgress color={"secondary"} />
        }
      </div>
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