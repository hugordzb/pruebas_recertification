import { combineReducers } from 'redux';

import { authentication } from './authentication';
import { recertification } from './recertification';

export const reducers = combineReducers({
  authentication,
  recertification
});