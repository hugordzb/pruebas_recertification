import { combineReducers } from 'redux';

import { authenticate } from './authenticate';
import { recertification } from './recertification';

export const reducers = combineReducers({
  authenticate,
  recertification
});