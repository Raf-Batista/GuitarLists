import { combineReducers } from 'redux';
import users from './users';
import guitars from './guitars';
import sessions from './sessions';

const rootReducer =  combineReducers({
  users,
  guitars,
  sessions
});

export default rootReducer
