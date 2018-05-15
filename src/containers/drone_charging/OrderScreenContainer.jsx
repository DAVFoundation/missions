import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  updateOrderDetails,
  createDroneChargingNeed,
  verifyDavId,
  registerDavId,
  closeWalletDialog
} from '../../actions';
import OrderScreen from '../../components/drone_charging/OrderScreen.jsx';

const OrderScreenContainer = () => {
  const mapDispatchToProps = (dispatch) => ({
    updateOrderDetails: (details) => dispatch(updateOrderDetails(details)),
    createNeed: (need) => dispatch(createDroneChargingNeed(need)),
    onMount: () => dispatch(updateOrderDetails({ stage: 'draft' })),
    verifyIdentity: () => dispatch(verifyDavId()),
    registerIdentity: () => dispatch(registerDavId()),
    closeWalletDialog: () => dispatch(closeWalletDialog())
  });

  return connect(
    (state) => {
      let props = {
        registration_step: state.order.registration_step,
        fetching: state.order.fetching,
        appPath: state.app.path
      };
      return props;
    },
    mapDispatchToProps
  )(withRouter(OrderScreen));
};

export default OrderScreenContainer;
