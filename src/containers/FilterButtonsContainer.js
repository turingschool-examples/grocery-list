import { connect } from 'react-redux';
import FilterButtons from '../components/FilterButtons';

import { setVisibilityFilter } from '../actions';

const mapStateToProps = (state) => {
  return { filter: state.visibilityFilter };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onVisibilityChange(filter) {
      dispatch(setVisibilityFilter(filter));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterButtons);
