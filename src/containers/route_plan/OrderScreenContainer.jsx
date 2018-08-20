import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  updateOrderDetails,
  verifyDavId,
  registerDavId,
  closeWalletDialog
} from '../../actions';
import OrderScreen from '../../components/route_plan/OrderScreen.jsx';

import { createAction } from 'redux-actions';
import { NEED_TYPES } from '../../config/needTypes.js';
import { createNeed } from '../../lib/dav';
export const createRoutePlanNeed = createAction('CREATE_ROUTEPLAN_NEED',
  ({startPosition, endPosition, flightHeight, heightUnits}) => {
    const params = {
      need_location_latitude: startPosition.lat,
      need_location_longitude: startPosition.long,
      start_latitude: startPosition.lat,
      start_longitude: startPosition.long,
      end_latitude: endPosition.lat,
      end_longitude: endPosition.long,
      flight_height: flightHeight,
      height_units: heightUnits,
      need_type: NEED_TYPES.ROUTE_PLAN
    };

    return createNeed(params);
  }
);

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
