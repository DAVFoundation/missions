import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  updateOrderDetails,
  verifyDavId,
  registerDavId,
  closeWalletDialog
} from '../../actions';
import OrderScreen from '../../components/drone_charging/OrderScreen.jsx';

import { createAction } from 'redux-actions';
import { NEED_TYPES } from '../../config/needTypes.js';
import { createNeed } from '../../lib/dav';
const createDroneChargingNeed = createAction('CREATE_CHARGING_NEED', 
  ({chargingVelocity, currentCharge, droneLocation, droneType, searchRadius}) => {
    const params = {
      chargingVelocity,
      currentCharge,
      droneLocation,
      droneType,
      searchRadius,
      need_location_latitude: droneLocation.lat,
      need_location_longitude: droneLocation.long,
      need_type: NEED_TYPES.DRONE_CHARGING
    };
    return createNeed(params);
  }
);

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

