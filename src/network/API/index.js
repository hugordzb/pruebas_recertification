const request = {
  _fetch: (
    url,
    config,
    callback,
    callbackError = (
      error => {
        alert(error.message)
      }),
    callbackCatch = (
      error => {
        console.log(JSON.stringify(error)); alert(error.message); throw error;
      })
  ) => {
    fetch(url, config)
      .then(
        function (response) {
          if (response.status === 401) {
            let primiseDenied = Promise.resolve({
              message: 'Usuario y/o Contraseña incorrectos',
              status: 401
            });

            primiseDenied.then(callbackError);
          } else if (response.status === 200) {
            response.json().then(callback);
          } else if (response.status === 201) {
            response.text().then(callback);
          } else {
            response.json().then(callbackError);
          }
        }
      ).catch(callbackCatch);
  },
  _fetch_file: (
    url,
    config,
    callback,
    callbackCatch = (
      error => {
        console.log(JSON.stringify(error));
        alert(error.message);
        throw error;
      })
  ) => {
    fetch(url, config)
      .then(resp => resp.blob())
      .then(callback)
      .catch(callbackCatch);
  }
}

const API = {
  request: (tokenBearer, contentType = 'application/json') => {
    var getConfig = (method, body = null, isJson = false) => {

      let headers = new Headers();

      headers.append('Content-Type', contentType);
      headers.append('Authorization', `Bearer ${tokenBearer}`);

      if (body === null) {
        return {
          headers,
          method
        }
      } else {
        return {
          headers,
          method,
          body: (isJson ? JSON.stringify(body) : body )
        }
      }

    };

    return {
      post: (url, callback, callbackError, callbackCatch) => {
        request._fetch(url, getConfig('POST', null, false), callback, callbackError, callbackCatch);
      },
      get: (url, callback, callbackError, callbackCatch) => {
        request._fetch(url, getConfig('GET'), callback, callbackError, callbackCatch);
      },
      put: (url, body, callback, callbackError, callbackCatch) => {
        request._fetch(url, getConfig('PUT', body, true), callback, callbackError, callbackCatch);
      },
      postBodyJson: (url, json, callback, callbackError, callbackCatch) => {
        request._fetch(url, getConfig('POST', json, true), callback, callbackError, callbackCatch);
      },
      delete: (url, callback, callbackError, callbackCatch) => {
        request._fetch(url, getConfig('DELETE'), callback, callbackError, callbackCatch);
      },
      getFile: (url, callback, callbackCatch) => {
        request._fetch_file(url, getConfig('GET'), callback, callbackCatch);
      }
    };
  }
}

export default API;
