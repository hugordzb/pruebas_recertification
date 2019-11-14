import API from "./API";

export class SSOServices {
  constructor(token, credential = false) {
    this.token = token;
    this.credential = credential;
  }

  signInRecertificaction = (callback, callbackError = (error => { console.log(error); })) => {
    API.request(this.token).get('/system', (responseJson => {
      Promise.resolve({
        data: responseJson
      }).then(callback);
    }), (responseError => {
      Promise.resolve({
        error: responseError
      }).then(callbackError);
    }));
  }

  signInRecertificaction = (callback, callbackError = (error => { console.log(error); })) => {
    API.request(this.token).get('/system', (responseJson => {
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