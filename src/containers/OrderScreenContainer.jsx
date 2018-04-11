import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { shiftCoords } from '../lib/utils';
import {
  updateOrderDetails,
  createNeed,
  verifyDavId,
  registerDavId,
  closeWalletDialog
} from '../actions';


let Components = {};

Components['ChargingOrderScreen'] = require('../components/drone_charging/OrderScreen.jsx').default;
Components['DeliveryOrderScreen'] = require('../components/OrderScreen.jsx').default;


const mapDispatchToProps = (dispatch) => ({
  updateOrderDetails: (details) => dispatch(updateOrderDetails(details)),
  createNeed: (need) => dispatch(createNeed(need)),
  onMount: () => dispatch(updateOrderDetails({ stage: 'draft' })),
  verifyIdentity: () => dispatch(verifyDavId()),
  registerIdentity: () => dispatch(registerDavId()),
  closeWalletDialog: () => dispatch(closeWalletDialog())
});

const OrderScreenContainer = (componentName) => {
  const OrderScreen = Components[componentName];
  return connect(
    (state) => {
      const defaultDropoff = shiftCoords(state.map.coords);
      let props = {
        registration_step: state.order.registration_step,
        fetching: state.order.fetching,
        appPath: state.app.path
      };
      if (componentName === 'DeliveryOrderScreen') {
        props = {...props, ...{defaultDropoff,
          userCoords: state.map.coords,
          pickup: state.order.pickup,
          dropoff: state.order.dropoff,
          pickup_at: state.order.pickup_at,
          size: state.order.size,
          weight: state.order.weight,}};
      }
      return props;
    },
    mapDispatchToProps
  )(withRouter(OrderScreen));
};

export default OrderScreenContainer;
