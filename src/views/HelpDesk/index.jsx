import React, { Component } from 'react';
import TemplatePage from '../../components/TemplatePage';
import { SSOServices } from '../../services/SSOServices';
import Binnacle from '../../components/Binnacle';
import { connect } from 'react-redux';

class HelpDesk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestedChanges: []
    }
  }

  componentDidMount() {
    const { userData } = this.props;
    userData.token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU3NDMxNzQ1OSwiaWF0IjoxNTc0MjU3NDU5fQ.5Z-1Oxp5-1o1nELGbQJAJ-OKwQEfTB_pvCBL7Evdf1aq7V1mA1t8HsirPUnxGnySwtxEPz4sRMKTVWP7NYtPCA";
    new SSOServices(userData.token).getRequestedChanges((response => {
      console.log(response.data.movimientos);
      this.setState({ requestedChanges: response.data.movimientos });
    }), (responseError => {
      console.log(responseError);
    }));
  }

  render() {
    const { requestedChanges } = this.state;
    return (
      <TemplatePage>
        {
          requestedChanges ? <Binnacle requestedChanges={requestedChanges} />
            : <h1>No existen cambio solicitados</h1>
        }
      </TemplatePage >
    );
  }
}

const mapStateToProps = state => ({
  userData: state.authenticate.userData,
  isAuthenticated: state.authenticate.isAuthenticated,
});

const connectedHelpDesk = connect(mapStateToProps, null)(HelpDesk);

export default connectedHelpDesk;