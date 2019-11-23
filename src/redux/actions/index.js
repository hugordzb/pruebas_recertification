import { Services } from "../../services";

const aux_token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU3NDU4ODAzMCwiaWF0IjoxNTc0NTI4MDMwfQ.2nXRmvI0l4aynkuFNn_WaSGz2ee3uJ00j7wMjamVZC_g8IOAqCDNwWN2Ivhg6K4KJ0a0HThs7ZLYO0tZEzYzzw";

export const ACTIONS = {
  SIGNIN_SUCCESS: "SIGNIN_SUCCESS",
  SIGNOUT_SUCCESS: "SIGNOUT_SUCCESS",
  INIT_LOAD: "INIT_LOAD",
  FINISH_LOAD: "FINISH_LOAD",
  SET_SELECTED_BOSS: "SET_SELECTED_BOSS",
  GET_BOSSES_DATA_SUCCESS: "GET_BOSSES_DATA_SUCCESS",
  DELETE_EMPLOYEE_SUCCESS: "DELETE_EMPLOYEE_SUCCESS",
  ADD_EMPLOYEE_SUCCESS: "ADD_EMPLOYEE_SUCCESS",
  GET_BOSS_DETAIL_SUCCESS: "GET_BOSS_DETAIL_SUCCESS",
  GET_EMPLOYEE_DETAIL_SUCCESS: "GET_EMPLOYEE_DETAIL_SUCCESS",
  GET_AUDITABLE_SYSTEMS_SUCCESS: "GET_AUDITABLE_SYSTEMS_SUCCESS",
  GET_AUDITABLE_USER_ACCOUNTS_SUCCESS: "GET_AUDITABLE_USER_ACCOUNTS_SUCCESS",
  SEND_EMAIL_SUCCESS: "SEND_EMAIL_SUCCESS"
}

export const signIn = token => {//Este token no se cambia, tiene que ser el que se recibe
  return dispatch => {
    dispatch(initLoad());

    new Services(token).signIn((response => {
      let userData = response.data;
      userData["token"] = token;
      localStorage.setItem('userData', JSON.stringify(userData));
      dispatch(signInSuccess(userData));
      dispatch(finishLoad("Inicio de sesión de forma correcta"));
      //window.location.href = `${window.location.href.replace(`${window.location.pathname}`, "")}${window.location.pathname}`;
    }), (responseError => {
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

export const getBossDetail = (token, bossId) => {
  return dispatch => {
    dispatch(initLoad());

    let boss = {};
    new Services(aux_token, bossId).getBossDetail((response => {
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
      auditableAccounts = response.data.jefes;
      dispatch(getAuditableUserAccountsSuccess(auditableAccounts));
      dispatch(finishLoad("Carga exitosa de las cuentas auditables"));
    }), (responseError => {
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


export const sendEmail = (token, bossId) => {
  return dispatch => {
    dispatch(initLoad());
    new Services(aux_token, bossId).sendEmailToBoss((response => {
      dispatch(finishLoad("Se envio de forma correcta el correo"));
    }), (responseError => {
      dispatch(finishLoad(`Hubo un error al enviar el correo a ${bossId}`));
    }));
  }
} 


export const getBossesData = token => {
  return dispatch => {
    dispatch(initLoad());
    new Services(aux_token).getBossesData((response => {
      dispatch(getBossesDataSuccess(response.data.jefes));
      dispatch(finishLoad("Se obtuvieron de forma correcta los jefes"));
    }), (responseError => {
      dispatch(finishLoad("No se pudo obtener la información de los jefes"));
    }));
  }
}

const getBossesDataSuccess = bosses => {
  return {
    type: ACTIONS.GET_BOSSES_DATA_SUCCESS,
    bosses
  }
}

export const setSelectedBoss = selectedBoss => {
  return {
    type: ACTIONS.SET_SELECTED_BOSS,
    selectedBoss
  }
}