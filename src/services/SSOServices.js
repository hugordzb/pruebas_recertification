import API from "./API";

export class SSOServices {
  constructor(token, pathParam = null, body = null) {
    this.token = token;
    this.body = body;
    this.pathParam = pathParam;
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

  getProfilesInSystems = (callback, callbackError = (error => { console.log(error); })) => {
    API.request(this.token).get(`${global.config.current.SERVERS.RECERTIFICATION}/profileSystems`, (responseJson => {
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

  getBossDetail = (callback, callbackError = (error => { console.log(error); })) => {
    API.request(this.token).get(`${global.config.current.SERVERS.RECERTIFICATION}/bossDetail/${this.pathParam}`, (responseJson => {
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

  getRequestedChanges = (callback, callbackError = (error => { console.log(error); })) => {
    API.request(this.token).get(`${global.config.current.SERVERS.RECERTIFICATION}/binnacle`, (responseJson => {
      Promise.resolve({
        data: responseJson
      }).then(callback);
    }), (responseError => {
      Promise.resolve({
        error: responseError
      }).then(callbackError);
    }));
  }

  sendEmailToBoss = (callback, callbackError = (error => { console.log(error); })) => {
    API.request(this.token).get(`${global.config.current.SERVERS.RECERTIFICATION}/sendRecertification/${this.pathParam}`, (responseJson => {
      Promise.resolve({
        data: responseJson
      }).then(callback);
    }), (responseError => {
      Promise.resolve({
        error: responseError
      }).then(callbackError);
    }));
  }

  processChange = (callback, callbackError = (error => { console.log(error); })) => {
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