import { Services } from "../../services";

const aux_token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU3NDQ0MjE5MCwiaWF0IjoxNTc0MzgyMTkwfQ.QvZwIWLiNLaEJD55jYBEeV9fG2liJSRXNdKvYpN81oORQcYZwcb8ZmP_Wb5Yyz-xbVVjqrbtYEP6sHUtdzRIQQ";

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
  GET_AUDITABLE_USER_ACCOUNTS_SUCCESS: "GET_AUDITABLE_USER_ACCOUNTS_SUCCESS"
}

export const signIn = token => {
  return dispatch => {
    dispatch(initLoad());

    new Services(aux_token).signIn((response => {
      let userData = response.data;
      userData["token"] = aux_token;
      localStorage.setItem('userData', JSON.stringify(userData));
      dispatch(signInSuccess(userData));
      dispatch(finishLoad("Inicio de sesión de forma correcta"));
      window.location.href = `${window.location.href.replace(`${window.location.pathname}`, "")}${window.location.pathname}`;
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
    dispatch(initLoad());

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

    new Services(aux_token, null, data).requestChange((response => {
      console.log(response);
      dispatch(deleteEmployeeSuccess(employee));
      dispatch(finishLoad("Se borro el empleado de manera correcta"));
    }), (responseError => {
      dispatch(finishLoad("Hubo un error en la carga"));
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
    dispatch(initLoad());

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

    new Services(aux_token, null, data).requestChange((response => {
      console.log(response);
      dispatch(addEmployeeSuccess(employee));
      dispatch(finishLoad("Se dio de alta el empleado de manera correcta"));
    }), (responseError => {
      dispatch(finishLoad("Hubo un error en la carga"));
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
    dispatch(initLoad());

    let boss = {};
    new Services(aux_token, idBoss).getBossDetail((response => {
      console.log(response);
      boss = response.data;
      dispatch(getBossDetailSuccess(boss));
      dispatch(finishLoad("Carga exitosa de la información del jefe"));
    }), (responseError => {
      dispatch(finishLoad("Hubo un error en la carga"));
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
}

const getEmployeeDetailSuccess = employee => {
  return {
    type: ACTIONS.GET_EMPLOYEE_DETAIL_SUCCESS,
    employee
  }
}

export const getAuditableSystems = token => {
  return dispatch => {
    dispatch(initLoad());

    let auditableSystems = [];

    new Services(aux_token).getSystems((response => {
      console.log(response.data.systems);
      auditableSystems = response.data.systems;
      dispatch(getAuditableSystemsSucccess(auditableSystems));
      dispatch(finishLoad("Carga exitosa de los sistemas auditables"));
    }), (responseError => {
      dispatch(finishLoad("Hubo un error en la carga"));
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
    dispatch(initLoad());
    let auditableAccounts = [];

    new Services(aux_token).getAuditableUserAccounts((response => {
      console.log(response.data.jefes);
      auditableAccounts = response.data.jefes;
      dispatch(getAuditableUserAccountsSuccess(auditableAccounts));
      dispatch(finishLoad("Carga exitosa de las cuentas auditables"));
    }), (responseError => {
      console.log(responseError);
      dispatch(finishLoad("Hubo un error en la carga"));
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
    dispatch(initLoad());

    let requestedChanges = [];

    new Services(aux_token).getRequestedChanges((response => {
      console.log(response.data.movimientos);
      requestedChanges = response.data.movimientos;
      dispatch(getRequestedChangesSuccess(requestedChanges));
      dispatch(finishLoad("Carga exitosa de los cambios solicitados"));
    }), (responseError => {
      dispatch(finishLoad("Hubo un error en la carga"));
    }));
  }
};

const getRequestedChangesSuccess = requestedChanges => {
  return {
    type: ACTIONS.GET_AUDITABLE_USER_ACCOUNTS_SUCCESS,
    requestedChanges
  }
}
