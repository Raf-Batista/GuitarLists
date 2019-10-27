import { combineReducers } from 'redux';
import users from './users';
import guitars from './guitars';
import currentUser from './currentUser';

const rootReducer =  combineReducers({
  users,
  guitars,
  currentUser
});

export default rootReducer
