import { connect } from 'react-redux';
import OrderScreen from '../components/OrderScreen.jsx';

export default connect(
  (state) => ({
    coords: state.map.coords
  })
)(OrderScreen);
