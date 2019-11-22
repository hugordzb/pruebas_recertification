import { ACTIONS } from '../../actions';

const initialState = () => {
  let state = {
    auditableSystems: [],
    auditableAccounts: [],
    boss: {},
    requestedChanges: [],
    errorMessage: ""
  };

  return state;
}

export const recertification = (state = initialState(), action) => {
  switch (action.type) {
    case ACTIONS.DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        userData: action.userData,
        isAuthenticated: (action.userData.userId && action.userData.token) ? true : false
      }
    case ACTIONS.ADD_EMPLOYEE_SUCCESS:
      return {
        ...state,
        userData: action.userData,
        isAuthenticated: (action.userData.userId && action.userData.token) ? true : false
      }
    case ACTIONS.GET_BOSS_DETAIL_SUCCESS:
      return {
        ...state,
        boss: action.boss
      }
    case ACTIONS.GET_EMPLOYEE_DETAIL_SUCCESS:
      return {
        ...state,
      }
    case ACTIONS.GET_AUDITABLE_SYSTEMS_SUCCESS:
      return {
        ...state,
        auditableSystems: action.auditableSystems
      }
    case ACTIONS.GET_AUDITABLE_USER_ACCOUNTS_SUCCESS:
      return {
        ...state,
        auditableAccounts: action.auditableAccounts
      }
    case ACTIONS.NOTIFY_ERROR_SUCCESS:
      return {
        ...state,
        messageError: action.messageError
      }
    default:
      return state
  }

}