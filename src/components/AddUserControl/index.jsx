import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';

class AddUserControl extends Component {

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
      </form>
    );
  }
}

export default AddUserControl;