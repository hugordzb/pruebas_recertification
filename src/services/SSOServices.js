import API from "./API";

export class SSOServices {
  constructor(token, credential = false, body = null) {
    this.token = token;
    this.credential = credential;
    this.body = body;
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
    API.request(this.token).put(`${global.config.current.SERVERS.RECERTIFICATION}/requestChange`, this.body, (responseJson => {
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