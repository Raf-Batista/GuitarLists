import { combineReducers } from 'redux';
import users from './users';
import guitars from './guitars';
import session from './session';

const rootReducer =  combineReducers({
  users,
  guitars,
  session
});

export default rootReducer
