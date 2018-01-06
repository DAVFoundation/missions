import { connect } from 'react-redux';
import MainScreen from 'components/MainScreen.jsx';
import { resetOrderDetails } from 'actions';

const mapDispatchToProps = (dispatch) => ({
  onMount: () => dispatch(resetOrderDetails()),
});

export default connect(
  () => ({}),
  mapDispatchToProps
)(MainScreen);
