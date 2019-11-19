import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';

class AddUserControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idEmpleado: "",

    }
  }

  addUser = () => {
    alert("agregando usuario")
  }

  render() {
    return (
      <form noValidate autoComplete="off">

        <TextField
          id="idEmpleado"
          label="Id empleado"
          margin="normal"
        />
        <TextField
          id="idJefe"
          label="Id jefe"
          margin="normal"
        />
        <TextField
          id="sistema"
          label="Sistema"
          margin="normal"
        />
        <TextField
          id="cuenta"
          label="Cuenta"
          margin="normal"
        />
        <TextField
          id="perfil"
          label="Perfil"
          margin="normal"
        />

        <Button onClick={this.addUser}>Agregar</Button>

        <p>{window.location.href.replace(`${window.location.protocol}//${window.location.hostname}:${window.location.port}`, "")}</p>
        <p>{window.location.pathname}</p>
        <p>{window.location.href.replace(`${window.location.pathname}`, "")}</p>
        <p>{window.location.hostname}</p>
      </form>
    );
  }
}

export default AddUserControl;