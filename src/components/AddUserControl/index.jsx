import React, { Component } from 'react';
import { TextField, Button, Select, MenuItem } from '@material-ui/core';
import { SSOServices } from '../../services/SSOServices';

import { connect } from 'react-redux';

class AddUserControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sistemas: [],
      perfiles: [],
      idEmpleado: "",
      idJefe: "",
      sistema: "",
      cuenta: "",
      perfil: "",
    }
  }

  componentDidMount() {
    let token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU3NDIzMDY4NSwiaWF0IjoxNTc0MTcwNjg1fQ.OzWn9bfbZrhI6fmiuCcQXnaKPuYm95ZfxgEWFTooEdNOdmXO3G9XGQFrur_lwnRE32rY4vzMHkEOZqb0FArCZg";
    new SSOServices(token).getSystems((response => {
      console.log(response.data.systems);
      this.setState({ sistemas: response.data.systems });
    }), (responseError => {
      console.log(responseError);
    }));

    new SSOServices(token).getProfilesInSystems((response => {
      console.log(response.data.perfiles);
      this.setState({ perfiles: response.data.perfiles });
    }), (responseError => {
      console.log(responseError);
    }));
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
    const { userData } = this.props;
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
      solicitante: userData.userId
    }

    let token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU3NDIzNzQyNiwiaWF0IjoxNTc0MTc3NDI2fQ.77emK6QtNfNbAX1mrLnkk5CDGqsvxdq-grMVZPGdRVFMYr9eqY5yC44cHqjw0nEjoi2p0nULkSWmyDrDfE4CVQ";

    new SSOServices(token, true, data).addUser((response => {
      console.log(response);
    }), (responseError => {
      console.log(responseError);
    }));

  }

  render() {
    const { sistemas, perfiles } = this.state;
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
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={this.handleChangeSistema}
        >
          {sistemas.map(sistema => {
            return < MenuItem value={sistema.sistema} >{sistema.sistema}</MenuItem>
          })}
        </Select>

        <TextField
          id="cuenta"
          label="Cuenta"
          margin="normal"
          onChange={this.handleChangeCuenta}
        />

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={this.handleChangePerfil}
        >
          {perfiles.map(perfil => {
            return < MenuItem value={`${perfil.systemData.sistema} ${perfil.perfil}`} >{`${perfil.systemData.sistema} ${perfil.perfil}`}</MenuItem>
          })}
        </Select>

        <Button onClick={this.addUser}>Agregar</Button>
      </form >
    );
  }
}

const mapStateToProps = state => ({
  userData: state.authenticate.userData
})

export default connect(mapStateToProps, null)(AddUserControl);