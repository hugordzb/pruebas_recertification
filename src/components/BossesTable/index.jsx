import React, { Component } from 'react';
import { Table, TableHead, TableRow, TableCell, 
  TableBody, Paper, withStyles, Button} from '@material-ui/core';
import { style } from '../../styles/BossesTable';
import { connect } from 'react-redux';
import { sendEmail, setSelectedBoss } from '../../redux/actions';

class BossesTable extends Component {

  showBossInfo = boss => {
    const { setSelectedBoss } = this.props;
    setSelectedBoss(boss);
  }

  handleRecertificate = boss => {
    alert("Se va a recertificar por termino a " + boss.jefe);
  }

  handleSendEmail = boss => {
    const { userData, sendEmail } = this.props;
    sendEmail(userData.token, boss)
  }

  renderBossesTable = bosses => {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Table size="small" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={6} className={classes.tableTitle}>Jefes para la recertificación</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tableTitle}>Id</TableCell>
              <TableCell className={classes.tableTitle}>Nombre</TableCell>
              <TableCell className={classes.tableTitle}>Correo</TableCell>
              <TableCell className={classes.tableTitle}>CorreoCC</TableCell>
              <TableCell className={classes.tableTitle}>Departamento</TableCell>
              <TableCell className={classes.tableTitle}>Opciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              bosses.map(boss => {
                return (
                  <TableRow key={`${boss.idJefe}`} onClick={() => this.showBossInfo(boss)}>
                    <TableCell key={`${boss.idJefe}`}>
                      {`${boss.idJefe}`}
                    </TableCell>
                    <TableCell key={`${boss.nombre}`}>
                      {`${boss.nombre}`}
                    </TableCell>
                    <TableCell key={`${boss.correo}`}>
                      {`${boss.correo}`}
                    </TableCell>
                    <TableCell key={`${boss.correoCC}`}>
                      {`${boss.correoCC}`}
                    </TableCell>
                    <TableCell key={`${boss.departamento}`}>
                      {`${boss.departamento}`}
                    </TableCell>
                    <TableCell key={`${boss.idJefe} opciones`}>
                      <Button onClick={() => this.handleSendEmail(boss.idJefe)}>Enviar correo</Button>
                    </TableCell>
                  </TableRow>
                )
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
          bosses ? this.renderBossesTable(bosses) : <p>NO hay nada que renderizar jefes</p>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isloading: state.loader.isLoading
});

const mapDispatchToProps = dispatch => ({
  sendEmail: (token, boss) => dispatch(sendEmail(token, boss)),
  setSelectedBoss: selectedBoss => dispatch(setSelectedBoss(selectedBoss))
});

const connectedBossesTable = connect(mapStateToProps, mapDispatchToProps)(BossesTable);

export default withStyles(style)(connectedBossesTable);