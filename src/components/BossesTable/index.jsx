import React, { Component } from 'react';
import {
  Table, TableHead, TableRow, TableCell,
  TableBody, Paper, withStyles, Button, Checkbox
} from '@material-ui/core';
import { style } from '../../styles/BossesTable';
import { connect } from 'react-redux';
import { sendEmail, setSelectedBoss, getBossDetail, recertifyBoss } from '../../redux/actions';

class BossesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBosses: new Map()
    }
  }

  showBossInfo = boss => {
    this.props.setSelectedBoss(boss);
    this.props.getBossDetail(this.props.userData.token, boss.idJefe);
  }

  saveRecertification = boss => {
    alert("Se van a guardar cambios ");
  }

  handleSendEmail = boss => {
    this.props.sendEmail(this.props.userData.token, boss);
  }

  handleCheck = (event, boss) => {
    const { userData, selectedPeriod } = this.props;
    let isChecked = event.target.checked;
    let auxSelectedBosses = this.state.selectedBosses;

    if(isChecked){
      auxSelectedBosses.set(boss, isChecked);
      this.props.recertifyBoss(userData.token, selectedPeriod, boss.idJefe);
    }else {
      auxSelectedBosses.delete(boss);
    }

    this.setState({selectedBosses: auxSelectedBosses});

    //alert("Cantidad " + this.state.selectedBosses.size)
  }

  renderBossesTable = bosses => {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Button onClick={this.saveRecertification}>Recertificar</Button>
        <Table size="small" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={8} className={classes.tableTitle}>Jefes para la recertificación</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tableTitle}>Id</TableCell>
              <TableCell className={classes.tableTitle}>Nombre</TableCell>
              <TableCell className={classes.tableTitle}>Correo</TableCell>
              <TableCell className={classes.tableTitle}>CorreoCC</TableCell>
              <TableCell className={classes.tableTitle}>Departamento</TableCell>
              <TableCell colSpan={3} className={classes.tableTitle}>Opciones</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={7} className={classes.tableTitle}></TableCell>
              <TableCell className={classes.tableTitle}>Recertificado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              bosses.map(boss => {
                return (
                  <TableRow key={boss.idJefe}>
                    <TableCell key={boss.idJefe}>
                      {boss.idJefe}
                    </TableCell>
                    <TableCell key={boss.nombre}>
                      {boss.nombre}
                    </TableCell>
                    <TableCell key={boss.correo}>
                      {boss.correo}
                    </TableCell>
                    <TableCell key={boss.correoCC}>
                      {boss.correoCC ? boss.correoCC : ''}
                    </TableCell>
                    <TableCell key={boss.departamento}>
                      {boss.departamento}
                    </TableCell>
                    <TableCell key={`${boss.idJefe} send email`}>
                      <Button onClick={() => this.handleSendEmail(boss.idJefe)}>Enviar correo</Button>
                    </TableCell>
                    <TableCell key={`${boss.idJefe} show employees`}>
                      <Button className={"show_employees"} onClick={() => this.showBossInfo(boss)}>Ver empleados</Button>
                    </TableCell>
                    <TableCell key={`${boss.idJefe} isRecertificated cell`}>
                      <Checkbox
                        onChange={(event) => this.handleCheck(event, boss)}
                        color="primary"
                        checked={boss.recertificado}
                      />
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
      <>
        {
          bosses ? this.renderBossesTable(bosses) : <p>No hay jefes para mostrar</p>
        }
      </>
    );
  }
}

const mapStateToProps = state => ({
  isloading: state.loader.isLoading,
  userData: state.authentication.userData,
  selectedPeriod: state.recertification.selectedPeriod
});

const mapDispatchToProps = dispatch => ({
  sendEmail: (token, bossId) => dispatch(sendEmail(token, bossId)),
  setSelectedBoss: selectedBoss => dispatch(setSelectedBoss(selectedBoss)),
  getBossDetail: (token, bossId) => dispatch(getBossDetail(token, bossId)),
  recertifyBoss: (token, period, bossId) => dispatch(recertifyBoss(token, period, bossId)),
});

const connectedBossesTable = connect(mapStateToProps, mapDispatchToProps)(BossesTable);

export default withStyles(style)(connectedBossesTable);