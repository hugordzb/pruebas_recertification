import { ACTIONS } from '../../actions';

const initialState = () => {
  let state = {};
  let userJson = localStorage.getItem("userData");

  if (userJson) {
    let userData = JSON.parse(userJson);
    let isAuthenticated = (userData.userId && userData.token) ? true : false;
    state = {
      userData,
      isAuthenticated,
      profile: "Arquitectura"
    }
  }

  return state;
}

export const authentication = (state = initialState(), action) => {
  switch (action.type) {
    case ACTIONS.SIGNIN_SUCCESS:
      return {
        ...state,
        userData: action.userData,
        isAuthenticated: (action.userData.userId && action.userData.token) ? true : false
      }
    case ACTIONS.SIGNOUT_SUCCESS:
      return {
        ...state,
          userData: action.userData,
          isAuthenticated: (action.userData.userId && action.userData.token) ? true : false
      }
    default:
      return state
  }

}