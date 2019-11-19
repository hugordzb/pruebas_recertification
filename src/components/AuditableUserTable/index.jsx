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
          auditableAccounts.forEach(boss => {
            alert("Entran a las cuentas");
            return boss.empleados.forEach(employee => {
              alert("Entran a los jefes");
              let arrayLengthArray = [
                {
                  system: "sap",
                  numberOfAccounts: employee.sap ? employee.sap.length : 0,
                },
                {
                  system: "tel",
                  numberOfAccounts: employee.tel ? employee.tel.length : 0,
                },
                {
                  system: "ciat",
                  numberOfAccounts: employee.ciat ? employee.ciat.length : 0,
                }
              ];

              let orderedArrayLengthArray = arrayLengthArray.sort((a, b) => b.numberOfAccounts - a.numberOfAccounts);

              switch (orderedArrayLengthArray[0].system) {
                case "sap":
                  return employee.sap.forEach(SAPAccount => {
                    console.log(`${boss.idJefe}
                                | ${boss.jefe}
                                | ${employee.idEmpleado}
                                | ${employee.empleado}
                                | ${SAPAccount.cuenta}
                                | ${SAPAccount.perfil}
                                | -------------------
                                | -------------------
                                | -------------------
                                | -------------------`);
                    return (
                      <TableRow key={boss.idJefe}>
                        <TableCell key={boss.idJefe}>{boss.idJefe}</TableCell>
                        <TableCell key={boss.jefe}>{boss.jefe}</TableCell>
                        <TableCell key={employee.idEmpleado}>{employee.idEmpleado}</TableCell>
                        <TableCell key={employee.empleado}>{employee.empleado}</TableCell>
                        <TableCell key={SAPAccount.cuenta}>{SAPAccount.cuenta}</TableCell>
                        <TableCell key={SAPAccount.perfil}>{SAPAccount.perfil}</TableCell>
                        <TableCell>{"-"}</TableCell>
                        <TableCell>{"-"}</TableCell>
                        <TableCell>{"-"}</TableCell>
                        <TableCell>{"-"}</TableCell>
                      </TableRow>
                    )
                  })
                case "tel":
                  return employee.tel.forEach(TELAccount => {
                    console.log(`${boss.idJefe}
                                | ${boss.jefe}
                                | ${employee.idEmpleado}
                                | ${employee.empleado}
                                | -------------------
                                | -------------------
                                | ${TELAccount.cuenta}
                                | ${TELAccount.perfil}
                                | -------------------
                                | -------------------`);
                    return (
                      <TableRow key={boss.idJefe}>
                        <TableCell key={boss.idJefe}>{boss.idJefe}</TableCell>
                        <TableCell key={boss.jefe}>{boss.jefe}</TableCell>
                        <TableCell key={employee.idEmpleado}>{employee.idEmpleado}</TableCell>
                        <TableCell key={employee.empleado}>{employee.empleado}</TableCell>
                        <TableCell>{"-"}</TableCell>
                        <TableCell>{"-"}</TableCell>
                        <TableCell key={TELAccount.cuenta}>{TELAccount.cuenta}</TableCell>
                        <TableCell key={TELAccount.perfil}>{TELAccount.perfil}</TableCell>
                        <TableCell>{"-"}</TableCell>
                        <TableCell>{"-"}</TableCell>
                      </TableRow>
                    )
                  })
                case "ciat":
                  return employee.ciat.forEach(CIATAccount => {
                    console.log(`${boss.idJefe}
                                | ${boss.jefe}
                                | ${employee.idEmpleado}
                                | ${employee.empleado}
                                | -------------------
                                | -------------------
                                | -------------------
                                | -------------------
                                | ${CIATAccount.cuenta}
                                | ${CIATAccount.perfil}`);
                    return (
                      <TableRow key={boss.idJefe}>
                        <TableCell key={boss.idJefe}>{boss.idJefe}</TableCell>
                        <TableCell key={boss.jefe}>{boss.jefe}</TableCell>
                        <TableCell key={employee.idEmpleado}>{employee.idEmpleado}</TableCell>
                        <TableCell key={employee.empleado}>{employee.empleado}</TableCell>
                        <TableCell>{"-"}</TableCell>
                        <TableCell>{"-"}</TableCell>
                        <TableCell>{"-"}</TableCell>
                        <TableCell>{"-"}</TableCell>
                        <TableCell key={CIATAccount.cuenta}>{CIATAccount.cuenta}</TableCell>
                        <TableCell key={CIATAccount.perfil}>{CIATAccount.perfil}</TableCell>
                      </TableRow>
                    )
                  })
                default:
                  break;
              }



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