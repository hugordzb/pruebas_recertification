const DEV_VARS = {
  PAGES: {
    SSO_CLIENT: "http://localhost:3000/sso"
  },
  SERVERS: {
    RECERTIFICATION: `http://localhost:8080/recertification/api/v1`,
    SSO: `http://localhost:8070/wsso/api/v1`,
  }

};

const PROD_VARS = {
  PAGES: {
    SSO_CLIENT: "http://localhost:3000/sso"
  },
  SERVERS: {
    RECERTIFICATION: `http://localhost:8080/recertification/api/v1`,
    SSO: 'http://localhost:8070/wsso/api/v1',
  }
  
};

export default class Configs {
  constructor() {
    this.current = DEV_VARS;
    this.other = PROD_VARS;
  }
}