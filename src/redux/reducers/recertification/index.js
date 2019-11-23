import { ACTIONS } from '../../actions';

const initialState = () => {
  let state = {
    auditableSystems: [],
    auditableBosses: [],
    auditableEmployees: [],
    selectedBoss: {}, 
    boss: {},
    requestedChanges: []
  };

  return state;
}

export const recertification = (state = initialState(), action) => {
  switch (action.type) {
    case ACTIONS.DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
      }
    case ACTIONS.ADD_EMPLOYEE_SUCCESS:
      return {
        ...state,
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
    case ACTIONS.GET_BOSSES_DATA_SUCCESS:
      return {
        ...state,
        auditableBosses: action.auditableBosses
      }
    case ACTIONS.SET_SELECTED_BOSS:
      return {
        ...state,
        selectedBoss: action.selectedBoss
      }
    default:
      return state
  }

}