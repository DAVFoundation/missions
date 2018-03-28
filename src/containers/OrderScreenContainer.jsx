import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import OrderScreen from '../components/OrderScreen.jsx';
import { shiftCoords } from '../lib/utils';
import { 
  updateOrderDetails, 
  createNeed, 
  verifyDavId,
  registerDavId,
  closeWalletDialog
} from '../actions';

const mapDispatchToProps = (dispatch) => ({
  updateOrderDetails: (details) => dispatch(updateOrderDetails(details)),
  createNeed: (need) => dispatch(createNeed(need)),
  onMount: () => dispatch(updateOrderDetails({ stage: 'draft' })),
  verifyIdentity: () => dispatch(verifyDavId()),
  registerIdentity: () => dispatch(registerDavId()),
  closeWalletDialog: () => dispatch(closeWalletDialog())
});

export default connect(
  (state) => {
    const defaultDropoff = shiftCoords(state.map.coords);
    return {
      defaultDropoff,
      userCoords: state.map.coords,
      pickup: state.order.pickup,
      dropoff: state.order.dropoff,
      pickup_at: state.order.pickup_at,
      size: state.order.size,
      weight: state.order.weight,
      registration_step: state.order.registration_step,
      fetching: state.order.fetching,
      appPath: state.app.path
    };
  },
  mapDispatchToProps
)(withRouter(OrderScreen));
