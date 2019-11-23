import React from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TemplatePage from '../../components/TemplatePage';
import Recertification from '../../components/Recertification';

class Arquitecture extends React.Component {
  render() {
    const { userData } = this.props;
    return (
      <TemplatePage>
        <Recertification userData={userData}/>
      </TemplatePage>
    )
  }
}

const mapStateToProps = state => ({
  userData: state.authentication.userData
});

const connectedArquitecture = connect(mapStateToProps, null)(Arquitecture);

export default withRouter(connectedArquitecture);