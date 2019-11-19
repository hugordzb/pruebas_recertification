import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, withStyles } from '@material-ui/core';
import { SSOServices } from '../../services/SSOServices';
import { style } from '../../styles/AuditableUserTable';

const data = {
  "jefes": [
    {
      "idJefe": "jefe",
      "jefe": "ZARAZUA ORTEGA GONZALO MOISES",
      "inAD": false,
      "empleados": [
        {
          "idEmpleado": "bcavazos",
          "empleado": "ELIZONDO CASTRO OSCAR HUGO",
          "sap": null,
          "tel": [
            {
              "cuenta": "CCAT018",
              "perfil": "CCAT018"
            }
          ],
          "ciat": [
            {
              "cuenta": "rx_bca",
              "perfil": "Admin"
            },
            {
              "cuenta": "rx_bca_2",
              "perfil": "Admin_2"
            }
          ]
        }
      ]
    },
    {
      "idJefe": "jefecito",
      "jefe": "JEFECITO",
      "inAD": false,
      "empleados": [
        {
          "idEmpleado": "oacarmonac",
          "empleado": "CARMONA OSCAR",
          "sap": [
            {
              "cuenta": "tester",
              "perfil": "Admin"
            }
          ],
          "tel": null,
          "ciat": null
        },
        {
          "idEmpleado": "ysandoval",
          "empleado": "CAB AMBROCIO JESUS ABRAHAM BALTAZAR",
          "sap": [
            {
              "cuenta": "prueba1",
              "perfil": "Admin"
            }
          ],
          "tel": [
            {
              "cuenta": "prueba2",
              "perfil": "Admin"
            }
          ],
          "ciat": [
            {
              "cuenta": "prueba3",
              "perfil": "Admin"
            }
          ]
        }
      ]
    },
    {
      "idJefe": "jefa",
      "jefe": "Elizabeth",
      "inAD": true,
      "empleados": null
    }
  ]
}

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
      console.log(data.jefes);
      this.setState({ auditableAccounts: data.jefes });
    }), (responseError => {
      console.log(responseError);
    }));
  }

  renderAccounts = () => {
    const { auditableAccounts } = this.state;
    console.log(auditableAccounts);
    return (
      <>
        <TableRow><TableCell>prueba</TableCell></TableRow>
        <TableRow><TableCell>prueba</TableCell></TableRow>
        <TableRow>
          <TableCell>prueba</TableCell>
          <TableCell>prueba</TableCell>
          <TableCell>prueba</TableCell>
        </TableRow>
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