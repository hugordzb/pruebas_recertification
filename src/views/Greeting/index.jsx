import React, { Component } from 'react';
import TemplatePage from '../../components/TemplatePage';
import { Typography } from '@material-ui/core';

class Greeting extends Component {
  render() {
    return (
      <TemplatePage>
        <Typography variant="h1">¡Bienvenidos!</Typography>
        
        <Typography variant="subtitle1">Aqui puedes encontrar todas tus aplicaciones Truper</Typography>

      </TemplatePage>
    );
  }
}

export default Greeting;