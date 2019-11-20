import React, { Component } from 'react';
import TemplatePage from '../../components/TemplatePage';
import EmployeesTable from '../../components/EmployeesTable';
import { SSOServices } from '../../services/SSOServices';
import { LinearProgress } from '@material-ui/core';

class Boss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bossData: null
    }
  }

  componentDidMount() {
    let token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU3NDMxNzQ1OSwiaWF0IjoxNTc0MjU3NDU5fQ.5Z-1Oxp5-1o1nELGbQJAJ-OKwQEfTB_pvCBL7Evdf1aq7V1mA1t8HsirPUnxGnySwtxEPz4sRMKTVWP7NYtPCA";
    let pathParam = "jefe";

    new SSOServices(token, pathParam).getBossDetail((response => {
      console.log(response);
      this.setState({ bossData: response.data });
    }), (responseError => {
      console.log(responseError);
    }));
  }

  render() {
    const { bossData } = this.state;
    return (
      <TemplatePage>
        {
          bossData ? <EmployeesTable bossData={bossData} />
            : <LinearProgress color="secondary" />
        }
      </TemplatePage >
    );
  }
}

export default Boss;