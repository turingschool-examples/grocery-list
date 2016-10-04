import { connect } from 'react-redux';
import AddGroceryForm from '../components/AddGroceryForm';

import { addGrocery } from '../actions';

const mapDispatchToProps = (dispatch) => {
  return {
    submitGrocery(data) {
      dispatch(addGrocery(data));
    }
  };
};

export default connect(null, mapDispatchToProps)(AddGroceryForm);
