import React from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TemplatePage from '../../components/TemplatePage';
import Recertification from '../../components/Recertification';

class Arquitecture extends React.Component {
  render() {
    const { userData, isAuthenticated } = this.props;
    return (
      <TemplatePage>
        {
          isAuthenticated ? <Recertification userData={userData}/> : <></>
        }
      </TemplatePage>
    )
  }
}

const mapStateToProps = state => ({
  userData: state.authentication.userData,
  isAuthenticated : state.authentication.isAuthenticated
});

const connectedArquitecture = connect(mapStateToProps, null)(Arquitecture);

export default withRouter(connectedArquitecture);