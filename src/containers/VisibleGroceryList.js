import { connect } from 'react-redux';
import GroceryList from '../components/GroceryList';

import {
  purchaseGrocery,
  starGrocery,
  deleteGrocery,
  clearGroceries
} from '../actions';

const getVisibleGroceries = (groceries, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return groceries;
    case 'SHOW_PURCHASED':
      return groceries.filter(t => t.purchased);
    case 'SHOW_UNPURCHASED':
      return groceries.filter(t => !t.purchased);
    case 'SHOW_STARRED':
      return groceries.filter(t => t.starred);
    default:
      return groceries;
  }
};

const mapStateToProps = (state) => {
  return { groceries: getVisibleGroceries(state.groceries, state.visibilityFilter) };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPurchaseGrocery(id) {
      dispatch(purchaseGrocery(id));
    },
    onStarGrocery(id) {
      dispatch(starGrocery(id));
    },
    onDeleteGrocery(id) {
      dispatch(deleteGrocery(id));
    },
    onClearGroceries(id) {
      dispatch(clearGroceries(id));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroceryList);
