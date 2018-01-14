import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import ConfirmTakeoff from '../components/ConfirmTakeoff.jsx';
import {confirmTakeoff} from '../actions';

const mapDispatchToProps = (dispatch) => ({
  confirmTakeoff: () => dispatch(confirmTakeoff({}))
});

const matchStateToProps = (state) => {
  return {
    coords: state.mission.pickup,
    status: state.mission.status
  };
};

export default connect(
  matchStateToProps,
  mapDispatchToProps
)(withRouter(ConfirmTakeoff));
