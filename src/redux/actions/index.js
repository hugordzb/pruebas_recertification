export const ACTIONS = {
  AUTHENTICATE: "AUTHENTICATE",
  REFRESH: "REFRESH",
  SIGNOUT: "SIGNOUT"
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
    userId: "",
    token: "",
    department: "",
    name: "",
    displayName: "",
    title: "",
    apps: []
  }

  return {
    type: ACTIONS.SIGNOUT,
    userData
  }
}