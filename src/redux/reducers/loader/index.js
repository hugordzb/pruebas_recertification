import { ACTIONS } from '../../actions';

const initialState = () => {
  let state = {};
  
  let isLoading = false;
  let message = "";

  state = {
    isLoading,
    message
  }
  return state;
}

export const loader = (state = initialState(), action) => {
  switch (action.type) {
    case ACTIONS.INIT_LOAD:
      return {
        ...state,
        isLoading: true,
        message: ""
      }
    case ACTIONS.FINISH_LOAD:
      return {
        ...state,
        isLoading: false,
        message: action.message
      }
    default:
      return state
  }

}