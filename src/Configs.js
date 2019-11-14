const DEV_VARS = {
  AUDITABLE_SYSTEMS: {
    TEL: "TEL",
    CIAT: "CIAT",
    SAP: "SAP",
  },
  SERVERS: {
    RECERTIFICATION: `http://172.18.8.210:8080/recertification/api/v1`,
    SSO: `http://localhost:8070/wsso/api/v1`,
  }

};

const PROD_VARS = {
  AUDITABLE_SYSTEMS: {
    TEL: "TEL",
    CIAT: "CIAT",
    SAP: "SAP",
  },
  SERVERS: {
    RECERTIFICATION: `http://172.18.8.210:8080/recertification/api/v1`,
    SSO: `http://172.20.3.28:8070/wsso/api/v1`,
  }

};

export default class Configs {
  constructor() {
    this.current = PROD_VARS;
  }
}