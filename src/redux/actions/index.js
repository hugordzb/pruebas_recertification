import { Services } from "../../services";

export const ACTIONS = {
  //Authtentication
  SIGNIN_SUCCESS: "SIGNIN_SUCCESS",
  SIGNOUT_SUCCESS: "SIGNOUT_SUCCESS",
  //Loader
  INIT_LOAD: "INIT_LOAD",
  FINISH_LOAD: "FINISH_LOAD",
  //Recertification
  SET_SELECTED_BOSS: "SET_SELECTED_BOSS",
  GET_BOSSES_DATA_SUCCESS: "GET_BOSSES_DATA_SUCCESS",
  DELETE_EMPLOYEE_SUCCESS: "DELETE_EMPLOYEE_SUCCESS",
  GET_BOSS_DETAIL_SUCCESS: "GET_BOSS_DETAIL_SUCCESS",
  SEND_EMAIL_SUCCESS: "SEND_EMAIL_SUCCESS", //Falta usar
  GET_REQUESTED_CHANGES_SUCCESS: "GET_REQUESTED_CHANGES_SUCCESS",
  PROCESS_CHANGE_SUCCESS: "PROCESS_CHANGE_SUCCESS",
  UPLOAD_FILE_SUCCESS: "UPLOAD_FILE_SUCCESS",
  UPDATE_UPLOADED_BOSSES: "UPDATE_UPLOADED_BOSSES",
  CLEAR_BOSS: "CLEAR_BOSS",
  SELECT_PERIOD: "SELECT_PERIOD",
  RECERTIFY_BOSS_SUCCESS: "RECERTIFY_BOSS_SUCCESS",
  ADD_PERIOD_SUCCESS: "ADD_PERIOD_SUCCESS"
}

export const signIn = (token, idSistema, idPerfil) => {//Este token no se cambia, tiene que ser el que se recibe
  return dispatch => {
    dispatch(initLoad());

    let servicio = new Services(token);

    servicio.checkAccessSignIn(idSistema, idPerfil, (response => {
      let userData = response.data;
      userData["tokenSSO"] = token;
      localStorage.setItem('userData', JSON.stringify(userData));
      dispatch(signInSuccess(userData));
      dispatch(finishLoad("Inicio de sesión de forma correcta"));

      servicio.createTokenRecertification(userData.userId, token,
        (responseRecert => {
          userData['token'] = responseRecert.data.token;
          localStorage.setItem('userData', JSON.stringify(userData));
          dispatch(signInSuccess(userData));
          dispatch(finishLoad("Inicio de sesión de forma correcta"));
        }), (responseErrorRecer => {
          console.log(responseErrorRecer);
        }));
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
    window.location.href = `${global.config.current.PAGES.SSO_CLIENT}`;
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
export const deleteEmployee = (token, employee, requester) => {
  return dispatch => {
    dispatch(initLoad());

    let data = {
      tipoMov: "B",
      idUsuario: employee.idEmpleado,
      nIdUsuario: "-",
      perfil: "-",
      sistema: "-",
      nPerfil: "-",
      nSistema: "-",
      cuentaSistema: "-",
      nCuentaSistema: "-",
      idJefe: requester,
      nIdJefe: "-",
      solicitante: requester
    }

    new Services(token, null, data).requestChange((response => {
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

export const getBossDetail = (token, bossId) => {
  return dispatch => {
    dispatch(initLoad());
    dispatch(clearBoss());

    let boss = {};
    new Services(token, bossId).getBossDetail((response => {
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

export const getRequestedChanges = token => {
  return dispatch => {
    dispatch(initLoad());

    let requestedChanges = [];
    new Services(token).getRequestedChanges((response => {
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
    type: ACTIONS.GET_REQUESTED_CHANGES_SUCCESS,
    requestedChanges
  }
}


export const sendEmail = (token, bossId) => {
  return dispatch => {
    dispatch(initLoad());
    new Services(token, bossId).sendEmailToBoss((response => {
      dispatch(finishLoad("Se envio de forma correcta el correo"));
    }), (responseError => {
      dispatch(finishLoad(`Hubo un error al enviar el correo a ${bossId}`));
    }));
  }
}

export const getBossesData = (token, selectedPeriod) => {
  return dispatch => {
    dispatch(initLoad());
    new Services(token, selectedPeriod).getBossesData((response => {
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

export const processChange = (token, change, whoAttended) => {
  let data = {
    "idMovimiento": change.idMovimiento,
    "atendio": whoAttended,
    "estatus": "true",
    "comentarios": "Se va a hacer"
  }

  return dispatch => {
    new Services(token, null, data).processChange((response => {
      dispatch(processChangeSuccess(change));
      dispatch(finishLoad("Se borro el empleado de manera correcta"));
    }), (responseError => {
      dispatch(finishLoad("Hubo un error en la carga"));
    }));
  }
}

const processChangeSuccess = change => {
  return {
    type: ACTIONS.PROCESS_CHANGE_SUCCESS,
    change
  }
}

export const uploadFile = (token, file) => {
  return dispatch => {
    new Services(token, null, null, file).uploadFile((response => {
      let newBosses = response.data;
      if (Array.isArray(newBosses) && newBosses.length > 0) {
        dispatch(updateUploadedBosses(newBosses));
        dispatch(uploadFileSuccess(file));
        dispatch(finishLoad("Se subio correctamente el archivo"));
      } else {
        dispatch(uploadFileSuccess(file));
        dispatch(finishLoad("Se subio correctamente el archivo, no hay nuevos jefes"));
      }
    }), (responseError => {
      dispatch(finishLoad("Hubo un error en la carga del archivo"));
    }));
  }
}

const updateUploadedBosses = updatedBoses => {
  return {
    type: ACTIONS.UPDATE_UPLOADED_BOSSES,
    updatedBoses
  }
}

const uploadFileSuccess = file => {
  return {
    type: ACTIONS.UPLOAD_FILE_SUCCESS,
    file
  }
}

const clearBoss = () => {
  return {
    type: ACTIONS.CLEAR_BOSS
  }
}

export const updateRecertificationStatus = (token, bossId) => {
  return dispatch => {

    updateRecertificationStatusSuccess(bossId)
  }
}

const updateRecertificationStatusSuccess = bossId => {
  return {
    type: ACTIONS.UPDATE_RECERTIFICATION_STATUS_SUCCESS,
    bossId
  }
}

export const selectPeriod = selectedPeriod => {
  return {
    type: ACTIONS.SELECT_PERIOD,
    selectedPeriod
  }
}

export const recertifyBoss = (token, period, bossId) => {
  let data = {
    periodo: period,
    idJefe: bossId
  };
  return dispatch => {
    new Services(token, null, data).recertifyBoss((response => {
      dispatch(recertifyBossSuccess(period, bossId));
      dispatch(finishLoad("Se recertifico correctamente el jefe"));
    }), (responseError => {
      dispatch(finishLoad("Hubo un error al recertificar"));
    }));
  }
}

const recertifyBossSuccess = (period, bossId) => {
  return {
    type: ACTIONS.RECERTIFY_BOSS_SUCCESS,
    period,
    bossId
  }
}


export const addPeriod = (token, period) => {
  return {
    type:ACTIONS.ADD_PERIOD_SUCCESS,
    period
  }
  /*return dispatch => {
    dispatch(addPeriodSuccess(period));
  }*/
}

const addPeriodSuccess = period => {
  return {
    type:ACTIONS.ADD_PERIOD_SUCCESS,
    period
  }
} 
