import { combineReducers } from 'redux';
import groceries from './groceries';
import visibilityFilter from './visibilityFilter';

const groceryList = combineReducers({
  groceries,
  visibilityFilter
});

export default groceryList;
