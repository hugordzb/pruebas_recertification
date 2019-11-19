import API from "./API";

export class SSOServices {
  constructor(token, credential = false) {
    this.token = token;
    this.credential = credential;
  }

  signInRecertificaction = (callback, callbackError = (error => { console.log(error); })) => {
    API.request(this.token).get(`${global.config.current.SERVERS.SSO}/system`, (responseJson => {
      Promise.resolve({
        data: responseJson
      }).then(callback);
    }), (responseError => {
      Promise.resolve({
        error: responseError
      }).then(callbackError);
    }));
  }

  getSystems = (callback, callbackError = (error => { console.log(error); })) => {
    API.request(this.token).get(`${global.config.current.SERVERS.RECERTIFICATION}/auditableSystems`, (responseJson => {
      Promise.resolve({
        data: responseJson
      }).then(callback);
    }), (responseError => {
      Promise.resolve({
        error: responseError
      }).then(callbackError);
    }));
  }

  getAuditableUserAccounts = (callback, callbackError = (error => { console.log(error); })) => {
    API.request(this.token).get(`${global.config.current.SERVERS.RECERTIFICATION}/auditableAcounts`, (responseJson => {
      Promise.resolve({
        data: responseJson
      }).then(callback);
    }), (responseError => {
      Promise.resolve({
        error: responseError
      }).then(callbackError);
    }));
  }

  addUser = (callback, callbackError = (error => { console.log(error); })) => {
    API.request(this.token).post(`${global.config.current.SERVERS.RECERTIFICATION}/requestChange`, (responseJson => {
      Promise.resolve({
        data: responseJson
      }).then(callback);
    }), (responseError => {
      Promise.resolve({
        error: responseError
      }).then(callbackError);
    }));
  }

}