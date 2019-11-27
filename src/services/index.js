import API from "../network/API";

export class Services {
  constructor(token = null, pathParam = null, body = null, file = null) {
    this.token = token;
    this.pathParam = pathParam;
    this.body = body;
    this.file = file
  }

  createTokenRecertification = (username, tokenSSO, callback, callbackError = (error => { console.log(error); })) => {
    let customHeader = new Headers();
    customHeader.append('Content-Type', 'application/json');
    customHeader.append('credential', username);
    customHeader.append('ssoToken', tokenSSO);

    var config = {
      headers : customHeader,
      method: 'POST'
    }

    API.request().custom_get(`${global.config.current.SERVERS.RECERTIFICATION}/login`, config, 
    (responseJSON => {
      Promise.resolve({
        data: responseJSON
      }).then(callback);
    }), (responseError => {
      Promise.resolve({
        error: responseError
      }).then(callbackError);
    }));
  }

  checkAccessSignIn = (idSistema, idPerfil, callback, callbackError = (error => { console.log(error); })) => {
    API.request(this.token).get(`${global.config.current.SERVERS.SSO}/system?sistema=${idSistema}&idPerfil=${idPerfil}`, (responseJson => {
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

  requestChange = (callback, callbackError = (error => { console.log(error); })) => {
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
    API.request(this.token).put(`${global.config.current.SERVERS.RECERTIFICATION}/processChange`, this.body, (responseJson => {
      Promise.resolve({
        data: responseJson
      }).then(callback);
    }), (responseError => {
      Promise.resolve({
        error: responseError
      }).then(callbackError);
    }));
  }
  

  getBossesData = (callback, callbackError = (error => { console.log(error); })) => {
    API.request(this.token).get(`${global.config.current.SERVERS.RECERTIFICATION}/bossesData/${this.pathParam}`, (responseJson => {
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

  uploadFile = (callback, callbackError = (error => { console.log(error); })) => {
    API.request(this.token, null, this.file).postFile(`${global.config.current.SERVERS.RECERTIFICATION}/conciliacion/recertificacion`, (responseJson => {
      Promise.resolve({
        data: responseJson
      }).then(callback);
    }), (responseError => {
      Promise.resolve({
        error: responseError
      }).then(callbackError);
    }));
  }

  recertifyBoss = (callback, callbackError = (error => { console.log(error); })) => {
    API.request(this.token).put(`${global.config.current.SERVERS.RECERTIFICATION}/recertifyBoss`, this.body, (responseJson => {
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