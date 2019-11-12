const DEV_VARS = {
  SERVERS: {
    SSO: `http://172.20.3.28:8070/wsso/api/v1`,
  }

};



export default class Configs {
  constructor() {
    this.current = DEV_VARS;
  }
}