export const ACTIONS = {
  AUTHENTICATE: "AUTHENTICATE",
  REFRESH: "REFRESH",
  SIGNOUT: "SIGNOUT",
  DELETE_EMPLOYEE: "DELETE_EMPLOYEES",
  ADD_EMPLOYEE: "ADD_EMPLOYEE",
  GET_BOSS_DETAIL: "GET_BOSS_DETAIL",
  GET_EMPLOYEE_DETAIL: "GET_EMPLOYEE_DETAIL",
  GET_AUDITABLE_ACCOUNTS: "GET_AUDITABLE_ACCOUNTS",
  NOTIFY_ERROR: "NOTIFY_ERROR"
}

export const authenticate = userData => {
  localStorage.setItem('userData', JSON.stringify(userData))
  return {
    type: ACTIONS.AUTHENTICATE,
    userData
  }
};

export const refresh = () => {
  let userData = {};
  let userJson = localStorage.getItem("userData");
  if (userJson) {
    userData = JSON.parse(userJson);

  }
  return {
    type: ACTIONS.REFRESH,
    userData
  }
}

export const signOut = () => {
  localStorage.clear();

  var userData = {
    department: "",
    displayName: "",
    name: "",
    title: "",
    token: "",
    userId: "",
    userType:""
  }

  return {
    type: ACTIONS.SIGNOUT,
    userData
  }
}

/*************** RECERTIFICATION **********************/
export const deleteEmployee = employee => {

  //Consumir servicio de request a change
  return {
    type: ACTIONS.DELETE_EMPLOYEE,
    employee
  }
}

export const addEmployee = employee => {

  //Consumir servicio de request a change
  return {
    type: ACTIONS.ADD_EMPLOYEE,
    employee
  }
}

export const getBossDetail = idBoss => {
  let boss = {};

  return {
    type: ACTIONS.GET_BOSS_DETAIL,
    boss
  }
}

export const getEmployeeDetail = idEmployee => {
  let employee = {};

  return {
    type: ACTIONS.GET_EMPLOYEE_DETAIL,
    employee
  }
}

export const getAuditableAccounts = () => {
  let bosses = [];

  //Consumir servicio para obtener cuentas auditables
  return {
    type: ACTIONS.GET_AUDITABLE_ACCOUNTS,
    bosses
  }
}