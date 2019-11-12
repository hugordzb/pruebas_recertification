const ACTIONS = {
  AUTHENTICATE: "AUTHENTICATE",
  REFRESH: "REFRESH",
  SIGNOUT: "SIGNOUT"
}

const initialState = () => {
  let state = {};
  let userJson = localStorage.getItem("userData");

  if (userJson) {
    let userData = JSON.parse(userJson);
    let isAuthenticated = (userData.userId && userData.token) ? true : false;
    state = {
      userData,
      isAuthenticated
    }
  }

  return state;
}

export const authenticate = (state = initialState(), action) => {
  switch (action.type) {
    case ACTIONS.AUTHENTICATE:
      return {
        ...state,
        userData: action.userData,
        isAuthenticated: (action.userData.userId && action.userData.token) ? true : false
      }
    case ACTIONS.REFRESH:
      if (action.userData) {
        return {
          ...state,
            userData: action.userData,
            isAuthenticated: (action.userData.userId && action.userData.token) ? true : false
        }
      } else {

      }
      break;
    case ACTIONS.SIGNOUT:
      return {
        ...state,
          userData: action.userData,
          isAuthenticated: (action.userData.userId && action.userData.token) ? true : false
      }
    default:
      return state
  }

}