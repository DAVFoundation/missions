import { connect } from 'react-redux';
import Map from '../components/Map.jsx';

export default connect(
  (state) => ({vehicles: state.vehicles})
)(Map);
