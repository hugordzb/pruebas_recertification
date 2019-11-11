import { ACTIONS } from '../../constants/actions'

export const authenticate = userData => {
  localStorage.setItem("userId", userData.userId);
  localStorage.setItem("token", userData.token);
  localStorage.setItem("apps", JSON.stringify(userData.apps));

  return {
    type: ACTIONS.AUTHENTICATE,
    userData
  }
};

export const refresh = () => {
  var userData = {
    userId: localStorage.getItem("userId"),
    token: localStorage.getItem("token"),
    apps: JSON.parse(localStorage.getItem("apps"))
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
    apps: []
  }

  return {
    type: ACTIONS.SIGNOUT,
    userData
  }
}