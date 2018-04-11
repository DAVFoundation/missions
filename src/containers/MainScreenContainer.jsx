import { connect } from 'react-redux';
import { resetOrderDetails } from '../actions';

let Components = {};

Components['ChargingMainScreen'] = require('../components/drone_charging/MainScreen.jsx').default;
Components['DeliveryMainScreen'] = require('../components/MainScreen.jsx').default;


const mapDispatchToProps = (dispatch) => ({
  onMount: () => dispatch(resetOrderDetails()),
});

const MainScreenContainer = (componentName) => {
  const MainScreen = Components[componentName];
  return connect(() => ({}),mapDispatchToProps)(MainScreen);
};


export default MainScreenContainer;
