import { connect } from 'react-redux';
import ConfirmTakeoff from '../components/ConfirmTakeoff.jsx';
import { confirmTakeoff } from '../actions';

const mapDispatchToProps = (dispatch) => ({
  confirmTakeoff: () => dispatch(confirmTakeoff({}))
});

const matchStateToProps = (state) => ({
  lat: state.mission.pickup_lat,
  long: state.mission.pickup_long
});

export default connect(
  matchStateToProps,
  mapDispatchToProps
)(ConfirmTakeoff);
