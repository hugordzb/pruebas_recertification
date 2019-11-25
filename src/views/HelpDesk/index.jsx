import React, { Component } from 'react';
import TemplatePage from '../../components/TemplatePage';
import Binnacle from '../../components/Binnacle';
import { connect } from 'react-redux';

class HelpDesk extends Component {
  render() {
    const { userData, isAuthenticated } = this.props;
    return (
      <TemplatePage>
        {
          isAuthenticated ? <Binnacle userData={userData} /> : <></>
        }
      </TemplatePage >
    );
  }
}

const mapStateToProps = state => ({
  userData: state.authentication.userData,
  isAuthenticated: state.authentication.isAuthenticated
});

const connectedHelpDesk = connect(mapStateToProps, null)(HelpDesk);

export default connectedHelpDesk;