import { combineReducers } from 'redux';
import groceries from './groceries';
import visibilityFilter from './visibilityFilter';

export default combineReducers({
  groceries,
  visibilityFilter
});
