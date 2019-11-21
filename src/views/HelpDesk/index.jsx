import React, { Component } from 'react';
import TemplatePage from '../../components/TemplatePage';
import Binnacle from '../../components/Binnacle';
import { connect } from 'react-redux';
import { getRequestedChanges } from '../../redux/actions';

class HelpDesk extends Component {

  componentDidMount() {
    const { userData } = this.props;
    this.props.getRequestedChanges(userData.token);
  }

  render() {
    const { requestedChanges } = this.props;
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
  requestedChanges: state.recertification.requestedChanges,
});

const mapDispatchToProps = dispatch => ({
  getRequestedChanges: token => dispatch(getRequestedChanges(token))
});

const connectedHelpDesk = connect(mapStateToProps, mapDispatchToProps)(HelpDesk);

export default connectedHelpDesk;