import React, { Component } from 'react';
import TemplatePage from '../../components/TemplatePage';
import Binnacle from '../../components/Binnacle';
import { connect } from 'react-redux';

class HelpDesk extends Component {
  render() {
    const { userData } = this.props;
    return (
      <TemplatePage>
        <Binnacle userData={userData} />
      </TemplatePage >
    );
  }
}

const mapStateToProps = state => ({
  userData: state.authentication.userData,
});

const connectedHelpDesk = connect(mapStateToProps, null)(HelpDesk);

export default connectedHelpDesk;