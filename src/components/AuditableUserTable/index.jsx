import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, withStyles } from '@material-ui/core';
import { SSOServices } from '../../services/SSOServices';
import { style } from '../../styles/AuditableUserTable';

class AuditableUserTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      system: "",
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

  renderEmployees = employees => {
    return (
      <>
        <TableCell key={"employees cell"}>
          {
            employees.map(
              employee => {
                return (
                  <TableRow key={`${employee.idEmpleado} row`}>
                    <TableCell key={`${employee.idEmpleado} cell`}>{employee.idEmpleado}</TableCell>
                  </TableRow>
                )
              }
            )
          }
        </TableCell>

        <TableCell >
          {
            employees.map(
              employee => {
                return (
                  <TableRow key={`${employee.empleado} row`}>
                    <TableCell key={`${employee.empleado} cell`}>{employee.empleado}</TableCell>
                  </TableRow>
                )
              }
            )
          }
        </TableCell>

        <TableCell key={"sap"} colSpan={2}>
          {
            employees.map(
              employee => {
                return (
                  <TableRow>
                    {
                      employee.sap ?
                        employee.sap.map(
                          accountInfo => {
                            return (
                              <TableRow key={`sap accounts row`}>
                                <TableCell key={`sap account cell ${accountInfo.cuenta}`}>{accountInfo.cuenta}</TableCell>
                                <TableCell key={`sap role cell ${accountInfo.perfil}`}>{accountInfo.perfil}</TableCell>
                              </TableRow>
                            )
                          }
                        ) :
                        <TableCell colSpan={2}>No se tienen cuentas</TableCell>
                    }
                  </TableRow>
                )
              }
            )
          }
        </TableCell>

        <TableCell key={"tel"} colSpan={2}>
          {
            employees.map(
              employee => {
                return (
                  <TableRow>
                    {
                      employee.tel ?
                        employee.tel.map(
                          accountInfo => {
                            return (
                              <TableRow key={`tel accounts row`}>
                                <TableCell key={`tel account cell ${accountInfo.cuenta}`}>{accountInfo.cuenta}</TableCell>
                                <TableCell key={`tel role cell ${accountInfo.perfil}`}>{accountInfo.perfil}</TableCell>
                              </TableRow>
                            )
                          }
                        ) :
                        <TableCell colSpan={2} >No se tienen cuentas</TableCell>
                    }
                  </TableRow>
                )
              }
            )
          }
        </TableCell>

        <TableCell key={"ciat"} colSpan={2}>
          {
            employees.map(
              employee => {
                return (
                  <TableRow>
                    {
                      employee.ciat ?
                        employee.ciat.map(
                          accountInfo => {
                            return (
                              <TableRow key={`ciat accounts row`}>
                                <TableCell key={`ciat account cell ${accountInfo.cuenta}`}>{accountInfo.cuenta}</TableCell>
                                <TableCell key={`ciat role cell ${accountInfo.perfil}`}>{accountInfo.perfil}</TableCell>
                              </TableRow>
                            )
                          }
                        ) :
                        <TableCell colSpan={2}>No se tienen cuentas</TableCell>
                    }
                  </TableRow>
                )
              }
            )
          }
        </TableCell>

      </>
    )
  }
  renderUsers = system => {
    const { auditableAccounts } = this.state;
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
            {
              (auditableAccounts) ? auditableAccounts.map((boss, i) => {
                return (
                  <TableRow key={`${boss.idJefe} row`}>
                    <TableCell key={`${boss.idJefe} cell`} rowSpan={boss.empleados.length}>{boss.idJefe}</TableCell>
                    <TableCell key={`${boss.jefe} cell`} rowSpan={boss.empleados.length}>{boss.jefe}</TableCell>
                    {
                      (boss.empleados || boss.empleados.length > 0) ?
                        this.renderEmployees(boss.empleados) :
                        <TableCell colSpan={8} key={"employees cell"}></TableCell>
                    }
                  </TableRow>
                )
              }) :
                <p>No se encontraron usuarios</p>
            }
          </TableBody>
        </Table>
      </Paper>
    )
  }

  render() {
    const { system } = this.props;
    return (
      <div>
        {this.renderUsers(system)}
      </div>
    );
  }
}

AuditableUserTable.propTypes = {
  token: PropTypes.string.isRequired,
};

export default withStyles(style)(AuditableUserTable);