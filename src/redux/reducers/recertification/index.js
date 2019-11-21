import { ACTIONS } from '../../actions';

const initialState = () => {
  let state = {
    bosses: [],
    boss: {},
    requestedChanges: [],
    errorMessage: ""
  };

  return state;
}

export const recertification = (state = initialState(), action) => {
  switch (action.type) {
    case ACTIONS.DELETE_EMPLOYEE:
      return {
        ...state,
        userData: action.userData,
        isAuthenticated: (action.userData.userId && action.userData.token) ? true : false
      }
    case ACTIONS.ADD_EMPLOYEE:
      return {
        ...state,
        userData: action.userData,
        isAuthenticated: (action.userData.userId && action.userData.token) ? true : false
      }
    case ACTIONS.GET_BOSS_DETAIL:
      return {
        ...state,
        userData: action.userData,
        isAuthenticated: (action.userData.userId && action.userData.token) ? true : false
      }
    case ACTIONS.GET_EMPLOYEE_DETAIL:
      return {
        ...state,
        userData: action.userData,
        isAuthenticated: (action.userData.userId && action.userData.token) ? true : false
      }
    case ACTIONS.GET_AUDITABLE_ACCOUNTS:
      return {
        ...state,
        userData: action.userData,
        isAuthenticated: (action.userData.userId && action.userData.token) ? true : false
      }
    case ACTIONS.NOTIFY_ERROR:
        return {
          ...state,
          userData: action.userData,
          isAuthenticated: (action.userData.userId && action.userData.token) ? true : false
        }
    default:
      return state
  }

}