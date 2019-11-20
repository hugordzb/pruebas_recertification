import React, { Component } from 'react';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { style } from '../../styles/Binnacle'
import { withStyles } from '@material-ui/core';
class Binnacle extends Component {

  renderRequestedChanges = requestedChanges => {
    return requestedChanges.map(change => {
      return (
        <TableRow key={change.idMovimiento}>
          <TableCell key={change.idMovimiento}>{change.idMovimiento}</TableCell>
          <TableCell key={change.tipoMov}>{change.tipoMov}</TableCell>
          <TableCell key={change.idUsuario}>{change.idUsuario}</TableCell>
          <TableCell key={change.idPerfil}>{change.idPerfil}</TableCell>
          <TableCell key={change.idSistema}>{change.idSistema}</TableCell>
          <TableCell key={change.cuentaSistema}>{change.cuentaSistema}</TableCell>
          <TableCell key={change.idJefe}>{change.idJefe}</TableCell>
          <TableCell key={change.solicitante}>{change.solicitante}</TableCell>
          <TableCell key={change.ncuentaSistema}>{change.ncuentaSistema}</TableCell>
          <TableCell key={change.nidUsuario}>{change.nidUsuario}</TableCell>
          <TableCell key={change.nidJefe}>{change.nidJefe}</TableCell>
          <TableCell key={change.nidPerfil}>{change.nidPerfil}</TableCell>
          <TableCell key={change.nidSistema}>{change.nidSistema}</TableCell>
        </TableRow>
      )
    })
  }

  render() {
    const { classes, requestedChanges } = this.props;
    return (
      <Paper className={classes.paper}>
        <Table size="small" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={13} className={classes.tableTitle}>Movimientos</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tableTitle}>Número</TableCell>
              <TableCell className={classes.tableTitle}>Tipo</TableCell>
              <TableCell className={classes.tableTitle}>Id usuario</TableCell>
              <TableCell className={classes.tableTitle}>Id perfil</TableCell>
              <TableCell className={classes.tableTitle}>Id sistema</TableCell>
              <TableCell className={classes.tableTitle}>Cuenta sistema</TableCell>
              <TableCell className={classes.tableTitle}>Id jefe</TableCell>
              <TableCell className={classes.tableTitle}>Solicitante</TableCell>
              <TableCell className={classes.tableTitle}>Nueva cuenta sistema</TableCell>
              <TableCell className={classes.tableTitle}>Nuevo id suario</TableCell>
              <TableCell className={classes.tableTitle}>Nuevo id jefe</TableCell>
              <TableCell className={classes.tableTitle}>Nuevo id perfil</TableCell>
              <TableCell className={classes.tableTitle}>Nuevo id sistema</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              this.renderRequestedChanges(requestedChanges)
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(style)(Binnacle);