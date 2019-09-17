import { combineReducers } from 'redux';
import sellers from './sellers';
import guitars from './guitars';

export default combineReducers({
  sellers,
  guitars
});
