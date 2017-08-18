import { connect } from 'react-redux';
import VehicleDetails from '../components/VehicleDetails.jsx';

export default connect(
  (state, ownProps) => ({
    vehicle: ownProps.vehicleUid
  })
)(VehicleDetails);
