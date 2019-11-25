import React, { Component } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, LinearProgress, Fab } from '@material-ui/core';
import { style } from '../../styles/Binnacle'
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { getRequestedChanges, processChange } from '../../redux/actions';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

class Binnacle extends Component {
  componentDidMount() {
    const { userData, getRequestedChanges } = this.props;
    getRequestedChanges(userData.token);
  }

  handleApprovement = (change, approvement) => {
    const { userData } = this.props;
    if (approvement) {
      alert("Se va a aprobar ");
      this.props.processChange(userData.token, change, userData.userId);
    } else {
      alert("No se va a aprobar");
    }

  }

  renderBinnacle = requestedChanges => {
    const { classes } = this.props;
    if (requestedChanges.length > 0) {
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
              <TableCell colSpan={2} className={classes.tableTitle}>Opciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              requestedChanges.map((change, i) => {
                return (
                  <TableRow key={`${change.idMovimiento} id ${i} row`}>
                    <TableCell key={`${change.idMovimiento} id ${i} cell`}>{`${change.idMovimiento}`}</TableCell>
                    <TableCell key={`${change.tipoMov} ${i} type cell`}>{change.tipoMov}</TableCell>
                    <TableCell key={`${change.idUsuario} ${i} userId cell`}>{change.idUsuario}</TableCell>
                    <TableCell key={`${change.idPerfil} ${i} profile cell`}>{change.idPerfil}</TableCell>
                    <TableCell key={`${change.idSistema} ${i} systemId cell`}>{change.idSistema}</TableCell>
                    <TableCell key={`${change.cuentaSistema} ${i} systemAccount cell`}>{change.cuentaSistema}</TableCell>
                    <TableCell key={`${change.idJefe} ${i} bossId cell`}>{change.idJefe}</TableCell>
                    <TableCell key={`${change.solicitante} ${i} requester cell`}>{change.solicitante}</TableCell>
                    <TableCell key={`${change.ncuentaSistema} ${i} new systemAccount cell`}>{change.ncuentaSistema}</TableCell>
                    <TableCell key={`${change.nidUsuario} ${i} new userId cell`}>{change.nidUsuario}</TableCell>
                    <TableCell key={`${change.nidJefe} ${i} new bossId cell`}>{change.nidJefe}</TableCell>
                    <TableCell key={`${change.nidPerfil} ${i} new profileId cell`}>{change.nidPerfil}</TableCell>
                    <TableCell key={`${change.nidSistema} ${i} new systemId cell`}>{change.nidSistema}</TableCell>
                    <TableCell key={`${change.idMovimiento} ${i} approvement change cell`}>
                      <Fab color="primary" onClick={() => this.handleApprovement(change, true)}>
                        <ThumbUpIcon />
                      </Fab>
                    </TableCell>
                    <TableCell key={`${change.idMovimiento} ${i} disapprovement change cell`}>
                      <Fab color="secondary" onClick={() => this.handleApprovement(change, false)}>
                        <ThumbDownIcon />
                      </Fab>
                    </TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      )
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
  getRequestedChanges: token => dispatch(getRequestedChanges(token)),
  processChange: (token, change, whoAttended) => dispatch(processChange(token, change, whoAttended))
})

const connectedBinnacle = connect(mapStateToProps, mapDispatchToProps)(Binnacle)

export default withStyles(style)(connectedBinnacle);