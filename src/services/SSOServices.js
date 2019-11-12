import API from "./API";

export class SSOServices {

    constructor(token, credential = false){
        this.token = token;
        this.credential = credential;
    }
    
    /**
    * Login para Aplicación
    * @param {function} callback Función a ejecutar en caso de éxito
    * @param {function} callbackError Función a ejecutar en caso de error
    */
    login = (callback, callbackError = (error => {console.log(error);})) => {
        API.request(this.token, this.credential).post('/auth/login', (responseJson => {
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