import { Services } from "../../services";

const aux_token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU3NDQyMTI1OCwiaWF0IjoxNTc0MzYxMjU4fQ.r8iS0L1JtagVKfy3dZaUcAb-3V1199s_2egc8c0H1X8KSVKZlczUX9kJ5Pg7UOs1b0cjCRcdNZLBCeO5K015ew";

export const ACTIONS = {
  SIGNIN_SUCCESS: "SIGNIN_SUCCESS",
  SIGNOUT_SUCCESS: "SIGNOUT_SUCCESS",
  INIT_LOAD: "INIT_LOAD",
  FINISH_LOAD: "FINISH_LOAD",
  DELETE_EMPLOYEE_SUCCESS: "DELETE_EMPLOYEE_SUCCESS",
  ADD_EMPLOYEE_SUCCESS: "ADD_EMPLOYEE_SUCCESS",
  GET_BOSS_DETAIL_SUCCESS: "GET_BOSS_DETAIL_SUCCESS",
  GET_EMPLOYEE_DETAIL_SUCCESS: "GET_EMPLOYEE_DETAIL_SUCCESS",
  GET_AUDITABLE_SYSTEMS_SUCCESS: "GET_AUDITABLE_SYSTEMS_SUCCESS",
  GET_AUDITABLE_USER_ACCOUNTS_SUCCESS: "GET_AUDITABLE_USER_ACCOUNTS_SUCCESS",
  NOTIFY_ERROR: "NOTIFY_ERROR"
}

export const signIn = token => {
  return dispatch => {
    dispatch(initLoad());

    new Services(token).signIn((response => {
      let userData = response.data;
      userData["token"] = token;
      localStorage.setItem('userData', JSON.stringify(userData));
      dispatch(signInSuccess(userData));
      dispatch(finishLoad("Inicio de sesión de forma correcta"));
    }), (responseError => {
      console.log(responseError);
      dispatch(finishLoad("Hubo un error en la carga"));
    }));
  }

};

const signInSuccess = userData => {
  return {
    type: ACTIONS.SIGNIN_SUCCESS,
    userData
  }
};

export const signOut = () => {
  return dispatch => {
    localStorage.clear();

    var userData = {
      userId: "",
      token: "",
      department: "",
      name: "",
      displayName: "",
      title: "",
      apps: []
    }
    dispatch(signOutSuccess(userData));
  }
}

const signOutSuccess = userData => {
  return {
    type: ACTIONS.SIGNOUT_SUCCESS,
    userData
  }
}

/************LOADER ACTIONS ***************/

const initLoad = () => {
  return {
    type: ACTIONS.INIT_LOAD
  }
}


const finishLoad = message => {
  return {
    type: ACTIONS.FINISH_LOAD,
    message
  }
}

/*************** RECERTIFICATION **********************/
export const deleteEmployee = (employee, token, requester) => {
  return dispatch => {
    token = aux_token;// borrar al terminar pruebas
    alert("Borrando usuario");// borrar al terminar pruebas

    let data = {
      tipoMov: "B",
      idUsuario: "bcavazos",
      nIdUsuario: "3",
      perfil: "admin",
      sistema: "TEL",
      nPerfil: "1",
      nSistema: "CIAT",
      cuentaSistema: "1",
      nCuentaSistema: "9",
      idJefe: "jefecito",
      nIdJefe: "jefecito",
      solicitante: requester
    }

    new Services(token, null, data).requestChange((response => {
      console.log(response);
      dispatch(deleteEmployeeSuccess(employee));
    }), (responseError => {
      dispatch(notifyError(responseError));
    }));
  }
}

const deleteEmployeeSuccess = employee => {
  return {
    type: ACTIONS.DELETE_EMPLOYEE_SUCCESS,
    employee
  }
}

export const addEmployee = (employee, token, requester) => {
  return dispatch => {
    token = aux_token;// borrar al terminar pruebas
    alert("Borrando usuario");// borrar al terminar pruebas

    let data = {
      tipoMov: "A",
      idUsuario: "bcavazos",
      nIdUsuario: "3",
      perfil: "admin",
      sistema: "TEL",
      nPerfil: "1",
      nSistema: "CIAT",
      cuentaSistema: "1",
      nCuentaSistema: "9",
      idJefe: "jefecito",
      nIdJefe: "jefecito",
      solicitante: requester
    }

    new Services(token, null, data).requestChange((response => {
      console.log(response);
      dispatch(addEmployeeSuccess(employee));
    }), (responseError => {
      dispatch(notifyError(responseError));
    }));
  }
}

const addEmployeeSuccess = employee => {
  return {
    type: ACTIONS.ADD_EMPLOYEE_SUCCESS,
    employee
  }
}

export const getBossDetail = (idBoss, token) => {
  return dispatch => {
    let boss = {};
    new Services(token, idBoss).getBossDetail((response => {
      console.log(response);
      boss = response.data;
      dispatch(getBossDetailSuccess(boss));
    }), (responseError => {
      dispatch(notifyError(responseError));
    }));
  }
}

const getBossDetailSuccess = boss => {
  return {
    type: ACTIONS.GET_BOSS_DETAIL_SUCCESS,
    boss
  }
};

export const getEmployeeDetail = idEmployee => {// Falta actualizar
  let employee = {};
  getEmployeeDetailSuccess(employee);
  notifyError();
}

const getEmployeeDetailSuccess = employee => {
  return {
    type: ACTIONS.GET_EMPLOYEE_DETAIL_SUCCESS,
    employee
  }
}

export const getAuditableSystems = token => {
  return dispatch => {
    let auditableSystems = [];

    new Services(token).getSystems((response => {
      console.log(response.data.systems);
      auditableSystems = response.data.systems;
      dispatch(getAuditableSystemsSucccess(auditableSystems));
    }), (responseError => {
      dispatch(notifyError(responseError));
    }));
  }
}

const getAuditableSystemsSucccess = auditableSystems => {
  return {
    type: ACTIONS.GET_AUDITABLE_SYSTEMS_SUCCESS,
    auditableSystems
  }
}

export const getAuditableUserAccounts = token => {
  return dispatch => {
    let auditableAccounts = [];

    new Services(token).getAuditableUserAccounts((response => {
      console.log(response.data.jefes);
      auditableAccounts = response.data.jefes;
      dispatch(getAuditableUserAccountsSuccess(auditableAccounts));
    }), (responseError => {
      console.log(responseError);
      dispatch(notifyError(responseError));
    }));
  }
}

const getAuditableUserAccountsSuccess = auditableAccounts => {
  return {
    type: ACTIONS.GET_AUDITABLE_USER_ACCOUNTS_SUCCESS,
    auditableAccounts
  }
}

export const getRequestedChanges = token => {
  return dispatch => {
    let requestedChanges = [];

    new Services(token).getRequestedChanges((response => {
      console.log(response.data.movimientos);
      requestedChanges = response.data.movimientos;
      dispatch(getRequestedChangesSuccess(requestedChanges));
    }), (responseError => {
      dispatch(notifyError(responseError));
    }));
  }
};

const getRequestedChangesSuccess = requestedChanges => {
  return {
    type: ACTIONS.GET_AUDITABLE_USER_ACCOUNTS_SUCCESS,
    requestedChanges
  }
}


const notifyError = errorMessage => {
  return {
    type: ACTIONS.NOTIFY_ERROR,
    errorMessage
  }
}