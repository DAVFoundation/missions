import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import VehicleDetailsScreen from 'components/VehicleDetailsScreen.jsx';



export default connect(
  () => ({}),
)(withRouter(VehicleDetailsScreen));
