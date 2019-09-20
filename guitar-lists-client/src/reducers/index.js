import { combineReducers } from 'redux';
import users from './users';
import guitars from './guitars';

const rootReducer =  combineReducers({
  users,
  guitars
});

export default rootReducer
