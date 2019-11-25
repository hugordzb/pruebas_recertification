import React from 'react';
import {Switch, Route} from "react-router-dom";
import { LinearProgress } from '@material-ui/core';
import Whoops404 from './views/Whoops404';
import TemplatePage from './components/TemplatePage';
import { connect } from 'react-redux';
import { signIn } from './redux/actions/';
import Arquitecture from './views/Arquitecture';
import Boss from './views/Boss';
import HelpDesk from './views/HelpDesk';

class App extends React.Component {
  
  componentDidMount() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let token = params.get('token');
    let sistema = params.get('sistema');
    let idPerfil = params.get('idPerfil');

    if((token && token !== '') 
      && (sistema && sistema !== '') 
      && (idPerfil && idPerfil !== '')){
      this.props.signIn(token, sistema, idPerfil);
    }
  }

  loadingComponent = () => {
    return (
      <TemplatePage>
        <LinearProgress />
      </TemplatePage>
    );
  }
  
  renderForProfile = () => {
    if( this.props.userData && this.props.userData.profile){
      switch (this.props.userData.profile) {
        case "Arquitectura":
          return <Route path="/" component={Arquitecture} />
        case "Mesa de servicio":
          return <Route path="/" component={HelpDesk} />
        case "Jefe":
          return <Route path="/" component={Boss} />
        default:
          break;
      }
    }else{
      return <Route path="/" component={this.loadingComponent} />
    }
  }

  render() {
    return (
      <Switch>
        {this.renderForProfile()}
        <Route component={Whoops404} />
      </Switch>
    )
  }
}

const mapStateToProps = state => ({
  userData: state.authentication.userData,
  isAuthenticated: state.authentication.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  signIn: (token, idSistema, idPerfil) => dispatch(signIn(token, idSistema, idPerfil))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);