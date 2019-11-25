import React, { Component } from 'react';
import { Grid, Input, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { uploadFile } from '../../redux/actions';

class FileUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    }
  }

  onChangeFiles = event => {
    let files = event.target.files;
    if(files.length > 0){
      this.setState({file: files[0]});
    }
  }

  sendFile = () => {
    const { userData } = this.props;
    let file = this.state.file;
    if(file){
      alert(`Se va a enviar el acrchivo "${file.name}"`);
      this.props.uploadFile(userData.token, file);
    }else {
      alert(`No ha elegido ningun archivo para enviar`);
    }
  }

  render() {
    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <h1>Carga de plantilla</h1>
        <Input type="file" onChange={this.onChangeFiles}></Input>
        <Button onClick={this.sendFile}>Cargar</Button>
      </Grid>        
    );
  }
}

const mapStatetoProps = state => ({
  userData: state.authentication.userData
})

const mapDispatchToProps = dispatch => ({
  uploadFile: (token, file) => dispatch(uploadFile(token, file))
});

const connectedFileUploader = connect(mapStatetoProps, mapDispatchToProps)(FileUploader);

export default connectedFileUploader;