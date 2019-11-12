const request = {
    _fetch: (
        url,
        config,
        callback, 
        callbackError = (error => {
            alert(error.message)
        }),
        callbackCatch = (error => {
            console.log(JSON.stringify(error));
            alert(error.message); 
            throw error;
        })
        ) => {
        fetch(global.config.current.SERVERS.SSO + url, config).then(function(response){
            if(response.status === 401){
                let primiseDenied = Promise.resolve({
                    message: 'Usuario y/o Contraseña incorrectos',
                    status: 401
                });

                primiseDenied.then(callbackError);
            }else if(response.status === 200){
                response.json().then(callback);
            }else if(response.status === 201){
                response.text().then(callback);
            }else{
                response.json().then(callbackError);
            }
        }).catch(callbackCatch);
    },
    _fetch_file: (
        url, 
        config, 
        callback, 
        callbackCatch = (error => {
            console.log(JSON.stringify(error));
            alert(error.message); 
            throw error;
        })
    ) => {
        fetch(global.config.current.JBPM_SERVER + url, config)
        .then(resp => resp.blob())
        .then(callback)
        .catch(callbackCatch);
    }
}

const API = {
    request: (tokenBasic, credential, contentType = 'application/json') => {
        
        var getConfig = (method, body = null, isJson = false) => {
            if(body === null){
                if(credential){
                    return {
                        headers: {
                            'Content-Type': contentType, 
                            'credential': tokenBasic
                       },
                       method: method
                    };
                }else{
                    return {
                        headers: {
                            'Content-Type': contentType, 
                            'Authorization': `Bearer ${tokenBasic}`
                       },
                       method: method
                    };
                }
            }else{
                if(credential){
                    return {
                        headers: {
                            'Content-Type': contentType, 
                            'credential': tokenBasic
                       },
                       method: method
                    };
                }else{
                    return {
                        headers: {
                            'Content-Type': contentType,
                            'Authorization': `Basic ${tokenBasic}`
                       },
                       method: method,
                       body: (isJson ? JSON.stringify(body) : body )
                    };
                }
            }
        };

        return {
            post: (
                url,
                callback, 
                callbackError,
                callbackCatch
                ) => {
                request._fetch(url, 
                    getConfig('POST', null, false), 
                    callback, 
                    callbackError, 
                    callbackCatch);
            }, 
            put: (
                url, 
                body,
                callback, 
                callbackError, 
                callbackCatch
                ) => {
                request._fetch(url,
                    getConfig('PUT', body, true), 
                    callback,
                    callbackError,
                    callbackCatch);
            },
            postBodyJson: (
                url,
                json,
                callback, 
                callbackError,
                callbackCatch
                ) => {
                request._fetch(url, 
                    getConfig('POST', json, true), 
                    callback, 
                    callbackError, 
                    callbackCatch);
            },
            delete: (
                url,
                callback, 
                callbackError,
                callbackCatch
                ) => {
                request._fetch(url, 
                    getConfig('DELETE'), 
                    callback, 
                    callbackError, 
                    callbackCatch);
            }, 
            get: (url, callback, callbackError, callbackCatch) => {
                request._fetch(url, 
                    getConfig('GET'), 
                    callback, 
                    callbackError, 
                    callbackCatch);
            },
            getFile: (url, callback, callbackCatch) => {
                request._fetch_file(url, 
                    getConfig('GET'), 
                    callback, callbackCatch);
            }
        };
    }
}

export default API;