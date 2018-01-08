import { connect } from 'react-redux';
import ConfirmTakeoff from '../components/ConfirmTakeoff.jsx';
import { confirmTakeoff } from '../actions';

const mapDispatchToProps = (dispatch) => ({
  confirmTakeoff: () => dispatch(confirmTakeoff({}))
});

const matchStateToProps = (state) => ({
  coords: state.mission.pickup
});

export default connect(
  matchStateToProps,
  mapDispatchToProps
)(ConfirmTakeoff);
