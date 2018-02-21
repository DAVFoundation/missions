import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import ConfirmTakeoff from '../components/ConfirmTakeoff.jsx';
import {confirmTakeoff} from '../actions';

const mapDispatchToProps = (dispatch) => ({
  confirmTakeoff: () => dispatch(confirmTakeoff({}))
});

const matchStateToProps = (state) => {
  return {
    coords: {long: parseFloat(state.mission.pickup_longitude).toFixed(6), lat: parseFloat(state.mission.pickup_latitude).toFixed(6)},
    status: state.mission.status,
    appPath: state.app.path
  };
};

export default connect(
  matchStateToProps,
  mapDispatchToProps
)(withRouter(ConfirmTakeoff));
