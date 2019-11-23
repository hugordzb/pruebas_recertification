import React, { Component } from 'react';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, LinearProgress } from '@material-ui/core';
import { style } from '../../styles/Binnacle'
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { getRequestedChanges } from '../../redux/actions';

class Binnacle extends Component {
  componentDidMount() {
    const { userData, getRequestedChanges } = this.props;
    getRequestedChanges(userData.token);
  }

  renderBinnacle = requestedChanges => {
    const { classes } = this.props;
    if (requestedChanges.length > 0) {
      return requestedChanges.map(change => {
        return (
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
                requestedChanges.map(change => {
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
            </TableBody>
          </Table>
        )
      })
    } else {
      return (<p>No hay cambios registrados</p>)
    }

  }

  render() {
    const { requestedChanges, isloading } = this.props;
    return !isloading ? this.renderBinnacle(requestedChanges) :
      <LinearProgress color={"secondary"} />
  }
}

const mapStateToProps = state => ({
  requestedChanges: state.recertification.requestedChanges,
  isloading: state.loader.isloading
});

const mapDispatchToProps = dispatch => ({
  getRequestedChanges: token => dispatch(getRequestedChanges(token))
})

const connectedBinnacle = connect(mapStateToProps, mapDispatchToProps)(Binnacle)

export default withStyles(style)(connectedBinnacle);