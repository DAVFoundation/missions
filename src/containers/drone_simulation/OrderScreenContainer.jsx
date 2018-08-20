import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { shiftCoords, packageSizeOptions } from '../../lib/utils';
import { NEED_TYPES } from '../../config/needTypes.js';
import {
  updateOrderDetails,
  verifyDavId_NO_BLOCKCHAIN,
  registerDavId,
  closeWalletDialog
} from '../../actions';

import OrderScreen from '../../components/drone_simulation/OrderScreen.jsx';
import moment from 'moment';

import { createAction } from 'redux-actions';
import { createNeed } from '../../lib/dav';
const createDroneDeliveryNeed = createAction('CREATE_CHARGING_NEED', 
  ({pickup, dropoff, pickup_at, size, weight}) => {

    pickup_at = moment(pickup_at, 'HH:mm').format('x');
    const sizeOption = packageSizeOptions.find(sizeOption => sizeOption.id === size);
    const params = {
      need_location_latitude: pickup.lat,
      need_location_longitude: pickup.long,
      pickup_at: pickup_at,
      pickup_latitude: pickup.lat,
      pickup_longitude: pickup.long,
      pickup_address: pickup.address,
      dropoff_latitude: dropoff.lat,
      dropoff_longitude: dropoff.long,
      cargo_type: sizeOption.cargoType,
      weight: parseFloat(weight),
      need_type: NEED_TYPES.DRONE_DELIVERY
    };
    return createNeed(params);
  }
);
const OrderScreenContainer = () => {
  const mapDispatchToProps = (dispatch) => ({
    updateOrderDetails: (details) => dispatch(updateOrderDetails(details)),
    createNeed: (need) => dispatch(createDroneDeliveryNeed(need)),
    onMount: () => dispatch(updateOrderDetails({stage: 'draft'})),
    verifyIdentity: () => dispatch(verifyDavId_NO_BLOCKCHAIN()),
    registerIdentity: () => dispatch(registerDavId()),
    closeWalletDialog: () => dispatch(closeWalletDialog())
  });

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
