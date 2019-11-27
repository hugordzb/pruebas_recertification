import { ACTIONS } from '../../actions';

const initialState = () => {
  let state = {
    //systems: [],
    periods: ['0219'],
    selectedPeriod: "",
    bosses: [],
    selectedBoss: {},
    employees: [],
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
        bosses: action.bosses
      }
    case ACTIONS.SET_SELECTED_BOSS:
      return {
        ...state,
        selectedBoss: action.selectedBoss
      }
    case ACTIONS.GET_REQUESTED_CHANGES_SUCCESS:
      return {
        ...state,
        requestedChanges: action.requestedChanges
      }
    case ACTIONS.PROCESS_CHANGE_SUCCESS:
      let newRequestedChanges = state.requestedChanges;
      newRequestedChanges.splice(newRequestedChanges.indexOf(action.change), 1);
      return {
        ...state,
        requestedChanges: newRequestedChanges
      }
    case ACTIONS.CLEAR_BOSS:
      let boss = {};
      return {
        ...state,
        boss
      }
    case ACTIONS.SELECT_PERIOD:
      return {
        ...state,
        selectedPeriod: action.selectedPeriod
      }
    case ACTIONS.RECERTIFY_BOSS_SUCCESS:
      let newBosses = state.bosses.map(boss => {
        let newBoss = boss;
        if (boss.idJefe === action.bossId) {
          let auxRecertificado = boss.recertificado;
          newBoss.recertificado = boss.inRecertificacion ? !auxRecertificado : auxRecertificado;
        }
        return newBoss;
      });
      return {
        ...state,
        bosses: newBosses
      }
      case ACTIONS.UPDATE_UPLOADED_BOSSES:    
        return {
          ...state,
          bosses: state.bosses.concat(action.updatedBoses)
        }
    default:
      return state
  }

}