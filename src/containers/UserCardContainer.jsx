import { connect } from 'react-redux';
import VehicleCard from '../components/VehicleCard.jsx';

export default connect(
  (state) => ({
    id: state.settings['user_id'],
    icon: state.settings['user_icon'],
    model: 'You',
  })
)(VehicleCard);
