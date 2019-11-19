import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import { SSOServices } from '../../services/SSOServices';

class AddUserControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idEmpleado: "",
      idJefe: "",
      sistema: "",
      cuenta: "",
      perfil: "",
    }
  }

  handleChangeIdEmpleado = event => {
    this.setState({ idEmpleado: event.target.value });
  }

  handleChangeIdJefe = event => {
    this.setState({ idJefe: event.target.value });
  }

  handleChangeSistema = event => {
    this.setState({ sistema: event.target.value });
  }

  handleChangeCuenta = event => {
    this.setState({ cuenta: event.target.value });
  }

  handleChangePerfil = event => {
    this.setState({ perfil: event.target.value });
  }

  addUser = () => {
    alert("agregando usuario")
    let data = {
      tipoMov: "A",
      idUsuario: "bcavazos",
      nIdUsuario: "3",
      perfil: "admin",
      sistema: "TEL",
      nPerfil: "1",
      nSistema: "CIAT",
      cuentaSistema: "1",
      nCuentaSistema: "9",
      idJefe: "jefecito",
      nIdJefe: "jefecito",
      solicitante: "hdrodriguezb"
    }

    let token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU3NDIzNzQyNiwiaWF0IjoxNTc0MTc3NDI2fQ.77emK6QtNfNbAX1mrLnkk5CDGqsvxdq-grMVZPGdRVFMYr9eqY5yC44cHqjw0nEjoi2p0nULkSWmyDrDfE4CVQ";

    new SSOServices(token, true, data).addUser((response => {
      console.log(response);
    }), (responseError => {
      console.log(responseError);
    }));

  }

  render() {
    return (
      <form noValidate autoComplete="off">

        <TextField
          id="idEmpleado"
          label="Id empleado"
          margin="normal"
          onChange={this.handleChangeIdEmpleado}
        />
        <TextField
          id="idJefe"
          label="Id jefe"
          margin="normal"
          onChange={this.handleChangeIdJefe}
        />
        <TextField
          id="sistema"
          label="Sistema"
          margin="normal"
          onChange={this.handleChangeSistema}
        />
        <TextField
          id="cuenta"
          label="Cuenta"
          margin="normal"
          onChange={this.handleChangeCuenta}
        />
        <TextField
          id="perfil"
          label="Perfil"
          margin="normal"
          onChange={this.handleChangePerfil}
        />

        <Button onClick={this.addUser}>Agregar</Button>
      </form>
    );
  }
}

export default AddUserControl;