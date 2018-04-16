import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {shiftCoords} from '../lib/utils';
import { NEED_TYPES } from '../config/needTypes.js';
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


const OrderScreenContainer = (componentName) => {

  const mapDispatchToProps = (dispatch) => ({
    updateOrderDetails: (details) => dispatch(updateOrderDetails(details)),
    createNeed: (need) => {
      const needType = componentName === 'ChargingOrderScreen' ? 'drone_charging' : 'delivery_drones';
      dispatch(createNeed(need, needType));
    },
    onMount: () => dispatch(updateOrderDetails({stage: 'draft'})),
    verifyIdentity: () => dispatch(verifyDavId()),
    registerIdentity: () => dispatch(registerDavId()),
    closeWalletDialog: () => dispatch(closeWalletDialog())
  });


  const OrderScreen = Components[componentName];
  return connect(
    (state) => {
      const defaultDropoff = shiftCoords(state.map.coords);
      let props = {
        registration_step: state.order.registration_step,
        fetching: state.order.fetching,
        appPath: state.app.path,
        needType: state.app.needType
      };
      if (state.app.needType === NEED_TYPES.DRONE_DELIVERY) {
        props = {
          ...props, ...{
            defaultDropoff,
            userCoords: state.map.coords,
            pickup: state.order.pickup,
            dropoff: state.order.dropoff,
            pickup_at: state.order.pickup_at,
            size: state.order.size,
            weight: state.order.weight,
          }
        };
      }
      return props;
    },
    mapDispatchToProps
  )(withRouter(OrderScreen));
};

export default OrderScreenContainer;
