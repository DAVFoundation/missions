import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  updateOrderDetails,
  createRoutePlanNeed,
  verifyDavId,
  registerDavId,
  closeWalletDialog
} from '../../actions';
import OrderScreen from '../../components/route_plan/OrderScreen.jsx';

const OrderScreenContainer = (/* componentName */) => {
  const mapDispatchToProps = (dispatch) => ({
    updateOrderDetails: (details) => dispatch(updateOrderDetails(details)),
    createNeed: (need) => dispatch(createRoutePlanNeed(need)),
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
        appPath: state.app.path,
        needType: state.app.needType
      };
      return props;
    },
    mapDispatchToProps
  )(withRouter(OrderScreen));
};

export default OrderScreenContainer;
