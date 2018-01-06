import { connect } from 'react-redux';
import ConfirmTakeoff from '../components/ConfirmTakeoff.jsx';
import { confirmTakeoff } from '../actions';

const mapDispatchToProps = (dispatch) => ({
  confirmTakeoff: () => dispatch(confirmTakeoff({}))
});

export default connect(
  null,
  mapDispatchToProps
)(ConfirmTakeoff);
