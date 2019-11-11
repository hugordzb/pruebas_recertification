import { ACTIONS } from '../../../constants/actions';

const initialState = {
  user: {
    userId: '',
    isAuthenticated: false,
    token: '',
    apps: [],
  }
}

export const authenticate = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.AUTHENTICATE:
      return {
        ...state,
        user: {
          userId: action.userData.userId,
          isAuthenticated: (action.userData.userId && action.userData.token) ? true : false,
          token: action.userData.token,
          apps: action.userData.apps
        }
      }
    case ACTIONS.REFRESH:
      return {
        ...state,
        user: {
          userId: action.userData.userId,
          isAuthenticated: (action.userData.userId && action.userData.token) ? true : false,
          token: action.userData.token,
          apps: action.userData.apps
        }
      }
    case ACTIONS.SIGNOUT:
      return {
        ...state,
        user: {
          userId: action.userData.userId,
          isAuthenticated: (action.userData.userId && action.userData.token) ? true : false,
          token: action.userData.token,
          apps: action.userData.apps
        }
      }
    default:
      return state
  }

}