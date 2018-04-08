import { connect } from 'react-redux';
import MapItemCard from '../components/MapItemCard.jsx';

export default connect(
  (state) => ({
    id: state.settings['user_id'],
    icon: state.settings['user_icon'],
    model: 'You',
  })
)(MapItemCard);
