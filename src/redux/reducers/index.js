import { combineReducers } from 'redux';

import { authentication } from './authentication';
import { recertification } from './recertification';
import { loader } from './loader'

export const reducers = combineReducers({
  authentication,
  recertification,
  loader
});