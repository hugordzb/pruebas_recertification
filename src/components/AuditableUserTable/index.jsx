import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, withStyles, Fab, Button } from '@material-ui/core';
import { style } from '../../styles/AuditableUserTable';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { SSOServices } from '../../services/SSOServices';

class AuditableUserTable extends Component {

  handleRecertificate = boss => {
    alert("Se va a recertificar por termino a " + boss.jefe);
  }

  handleSendEmail = boss => {
    const { userData } = this.props;
    alert("Se va a enviar correo a " + boss.jefe);
    let pathParam = boss.idJefe;
    new SSOServices(userData.token, pathParam).sendEmailToBoss((response => {
      console.log(response);
    }), (responseError => {
      console.log(responseError);
    }));
  }

  renderAuditableUsersTable = () => {
    const { classes, bosses } = this.props;
    return (
      <Paper className={classes.paper}>
        <Table size="small" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2} className={classes.tableTitle}>Jefe</TableCell>
              <TableCell colSpan={10} className={classes.tableTitle}>Empleados</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tableTitle}>Id</TableCell>
              <TableCell className={classes.tableTitle}>Nombre</TableCell>
              <TableCell className={classes.tableTitle}>Id</TableCell>
              <TableCell className={classes.tableTitle}>Nombre</TableCell>
              <TableCell colSpan={2} className={classes.tableTitle}>SAP</TableCell>
              <TableCell colSpan={2} className={classes.tableTitle}>TEL</TableCell>
              <TableCell colSpan={2} className={classes.tableTitle}>CIAT</TableCell>
              <TableCell colSpan={2} className={classes.tableTitle}>Opciones</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4} className={classes.tableTitle}></TableCell>
              <TableCell className={classes.tableTitle}>Cuenta</TableCell>
              <TableCell className={classes.tableTitle}>Rol</TableCell>
              <TableCell className={classes.tableTitle}>Cuenta</TableCell>
              <TableCell className={classes.tableTitle}>Rol</TableCell>
              <TableCell className={classes.tableTitle}>Cuenta</TableCell>
              <TableCell className={classes.tableTitle}>Perfil</TableCell>
              <TableCell colSpan={2} className={classes.tableTitle}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              bosses.map((boss, i) => {

                let totalNumberOfAccounts = 0;
                boss.empleados.forEach(employee => {
                  totalNumberOfAccounts += employee.cuentas.length;
                });

                return boss.empleados.map((employee, j) => {
                  return employee.cuentas.map((accountsInSystems, k) => {
                    console.log(`i: ${i}, j: ${j}, k: ${k}`);
                    return (
                      <TableRow key={`${employee.idEmpleado} ${i} ${j} ${k} recertification row`}>
                        {
                          (j === 0 && k === 0) ?
                            <>
                              <TableCell key={boss.idJefe} rowSpan={totalNumberOfAccounts}>
                                {boss.idJefe ? boss.idJefe : "----"}
                              </TableCell>
                              <TableCell key={boss.jefe} rowSpan={totalNumberOfAccounts}>
                                {boss.jefe ? boss.jefe : "----"}
                              </TableCell>
                            </>
                            :
                            <></>
                        }
                        {
                          k === 0 ?
                            <>
                              <TableCell key={`${employee.idEmpleado} recertification cell`} rowSpan={employee.cuentas.length}>
                                {employee.idEmpleado ? employee.idEmpleado : "----"}
                              </TableCell>
                              <TableCell key={`${employee.empleado} recertification cell`} rowSpan={employee.cuentas.length}>
                                {employee.empleado ? employee.empleado : "----"}
                              </TableCell>
                            </>
                            :
                            <></>
                        }

                        <TableCell key={`${accountsInSystems.csap} sap account recertification cell`}>
                          {accountsInSystems.csap ? accountsInSystems.csap : "----"}
                        </TableCell>
                        <TableCell key={`${accountsInSystems.psap} sap role recertification cell`}>
                          {accountsInSystems.psap ? accountsInSystems.psap : "----"}
                        </TableCell>
                        <TableCell key={`${accountsInSystems.ctel} tel account recertification cell`}>
                          {accountsInSystems.ctel ? accountsInSystems.ctel : "----"}
                        </TableCell>
                        <TableCell key={`${accountsInSystems.ptel} tel role recertification cell`}>
                          {accountsInSystems.ptel ? accountsInSystems.ptel : "----"}
                        </TableCell>
                        <TableCell key={`${accountsInSystems.cciat} ciat account recertification cell`}>
                          {accountsInSystems.cciat ? accountsInSystems.cciat : "----"}
                        </TableCell>
                        <TableCell key={`${accountsInSystems.pciat} ciat profile recertification cell`}>
                          {accountsInSystems.pciat ? accountsInSystems.pciat : "----"}
                        </TableCell>

                        {
                          (j === 0 && k === 0) ?
                            <>
                              <TableCell key={`${boss.idJefe} recertificate recertification cell`} rowSpan={totalNumberOfAccounts}>
                                <Fab color="primary" onClick={() => this.handleRecertificate(boss)}>
                                  <CheckCircleIcon />
                                </Fab>
                              </TableCell>
                              <TableCell key={`${boss.idJefe} send email recertification cell`} rowSpan={totalNumberOfAccounts}>
                                <Button onClick={() => this.handleSendEmail(boss)}>Enviar correo</Button>
                              </TableCell>
                            </>
                            :
                            <></>
                        }
                      </TableRow>
                    )
                  })
                })
              })
            }
          </TableBody>
        </Table>
      </Paper>
    )
  }

  render() {
    const { bosses } = this.props;
    return (
      <div>
        {
          bosses ?
            this.renderAuditableUsersTable() :
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