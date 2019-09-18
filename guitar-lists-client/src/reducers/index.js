import { combineReducers } from 'redux';
import sellers from './sellers';
import guitars from './guitars';

const rootReducer =  combineReducers({
  sellers,
  guitars
});

export default rootReducer
