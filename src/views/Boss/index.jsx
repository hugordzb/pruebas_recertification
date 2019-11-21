import React, { Component } from 'react';
import TemplatePage from '../../components/TemplatePage';
import EmployeesTable from '../../components/EmployeesTable';
import { SSOServices } from '../../services/SSOServices';
import { LinearProgress } from '@material-ui/core';
import { connect } from 'react-redux';

class Boss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bossData: null
    }
  }

  componentDidMount() {
    const { userData } = this.props;
    userData.token ="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU3NDMxNzQ1OSwiaWF0IjoxNTc0MjU3NDU5fQ.5Z-1Oxp5-1o1nELGbQJAJ-OKwQEfTB_pvCBL7Evdf1aq7V1mA1t8HsirPUnxGnySwtxEPz4sRMKTVWP7NYtPCA"; 
    let pathParam = "jefe";

    new SSOServices(userData.token, pathParam).getBossDetail((response => {
      console.log(response);
      this.setState({ bossData: response.data });
    }), (responseError => {
      console.log(responseError);
    }));
  }

  render() {
    const { userData } = this.props;
    const { bossData } = this.state;
    return (
      <TemplatePage>
        {
          bossData ? <EmployeesTable bossData={bossData} userData={userData}/>
            : <LinearProgress color="secondary" />
        }
      </TemplatePage >
    );
  }
}

const mapStateToProps = state => ({
  userData: state.authenticate.userData,
  isAuthenticated: state.authenticate.isAuthenticated,
});

const connectedBoss = connect(mapStateToProps, null)(Boss);

export default connectedBoss;