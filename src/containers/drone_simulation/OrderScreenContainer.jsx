import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {shiftCoords} from '../../lib/utils';
import { NEED_TYPES } from '../../config/needTypes.js';
import {
  updateOrderDetails,
  createDroneDeliveryNeed,
  verifyDavId,
  registerDavId,
  closeWalletDialog
} from '../../actions';

import OrderScreen from '../../components/drone_simulation/OrderScreen.jsx';

const OrderScreenContainer = () => {
  const mapDispatchToProps = (dispatch) => ({
    updateOrderDetails: (details) => dispatch(updateOrderDetails(details)),
    createNeed: (need) => dispatch(createDroneDeliveryNeed(need)),
    onMount: () => dispatch(updateOrderDetails({stage: 'draft'})),
    verifyIdentity: () => dispatch(verifyDavId()),
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
