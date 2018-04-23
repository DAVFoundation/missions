import {connect} from 'react-redux';
import {resetOrderDetails} from '../actions';
import {getChargerArray} from '../reducers/chargers';

let Components = {};

Components['ChargingMainScreen'] = require('../components/drone_charging/MainScreen.jsx').default;
Components['DeliveryMainScreen'] = require('../components/MainScreen.jsx').default;
Components['RoutePlanMainScreen'] = require('../components/route_plan/MainScreen.jsx').default;


const mapDispatchToProps = (dispatch) => ({
  onMount: () => dispatch(resetOrderDetails()),
});

const MainScreenContainer = (componentName) => {
  let mapStateToProps = () => ({});
  if (componentName === 'ChargingMainScreen') {
    mapStateToProps = (state) => {
      return {
        chargers: getChargerArray(state.chargers),
        coords: state.map.coords
      };
    };
  }
  const MainScreen = Components[componentName];
  return connect(mapStateToProps, mapDispatchToProps)(MainScreen);
};


export default MainScreenContainer;
