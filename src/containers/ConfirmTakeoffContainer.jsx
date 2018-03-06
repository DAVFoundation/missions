import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import ConfirmTakeoff from '../components/ConfirmTakeoff.jsx';
import {confirmTakeoff} from '../actions';

const mapDispatchToProps = (dispatch) => ({
  confirmTakeoff: () => dispatch(confirmTakeoff({}))
});

const matchStateToProps = (state) => {
  return {
    address: state.mission.pickup_address,
    status: state.mission.status,
    appPath: state.app.path
  };
};

export default connect(
  matchStateToProps,
  mapDispatchToProps
)(withRouter(ConfirmTakeoff));
