import { connect } from 'react-redux';
import OrderScreen from '../components/OrderScreen.jsx';
import { shiftCoords } from '../lib/utils';
import { updateOrderDetails, createNeed } from '../actions';

const mapDispatchToProps = (dispatch) => ({
  updateOrderDetails: (details) => dispatch(updateOrderDetails(details)),
  createNeed: (need) => dispatch(createNeed(need)),
  onMount: () => dispatch(updateOrderDetails({ stage: 'draft' })),
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
    };
  },
  mapDispatchToProps
)(OrderScreen);
