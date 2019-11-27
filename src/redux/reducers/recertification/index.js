import { ACTIONS } from '../../actions';

const initialState = () => {
  let state = {
    periods: ['0219'],
    selectedPeriod: "",
    bosses: [],
    selectedBoss: {},
    boss: {},
    requestedChanges: []
  };

  return state;
}

export const recertification = (state = initialState(), action) => {
  switch (action.type) {
    case ACTIONS.GET_BOSS_DETAIL_SUCCESS:
      return {
        ...state,
        boss: action.boss
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
      return {
        ...state,
        requestedChanges: state.requestedChanges.splice(state.requestedChanges.indexOf(action.change), 1)
      }
    case ACTIONS.CLEAR_BOSS:
      return {
        ...state,
        boss: {}
      }
    case ACTIONS.SELECT_PERIOD:
      return {
        ...state,
        selectedPeriod: action.selectedPeriod
      }
    case ACTIONS.RECERTIFY_BOSS_SUCCESS:
      return {
        ...state,
        bosses: state.bosses.map(boss => {
          let newBoss = boss;
          if (boss.idJefe === action.bossId) {
            let auxRecertificado = boss.recertificado;
            newBoss.recertificado = boss.inRecertificacion ? !auxRecertificado : auxRecertificado;
          }
          return newBoss;
        })
      }
    case ACTIONS.UPDATE_UPLOADED_BOSSES:
      return {
        ...state,
        bosses: state.bosses.concat(action.updatedBoses)
      }

    case ACTIONS.ADD_PERIOD_SUCCESS:
      return {
        ...state,
        periods: state.periods.concat(action.period)
      }
    default:
      return state
  }

}