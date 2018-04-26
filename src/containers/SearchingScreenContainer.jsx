import {connect} from 'react-redux';
import {getBidArray} from '../reducers/bids';
import {getVehicleOnMission} from '../reducers/vehicles';
import {getChargerOnMission} from '../reducers/chargers';
import {getRouteProvidersOnMission} from '../reducers/routes';
import {resetOrderDetails, chooseBid} from '../actions';
import {cancelNeed} from '../lib/api';

let Components = {
  'ChargingSearchingScreen': require('../components/drone_charging/SearchingScreen.jsx').default,
  'RoutePlanSearchingScreen': require('../components/route_plan/SearchingScreen.jsx').default,
  'DeliverySearchingScreen': require('../components/SearchingScreen.jsx').default
};

const mapDispatchToProps = (dispatch) => ({
  cancelSearch: () => cancelNeed().then(dispatch(resetOrderDetails())),
  chooseBid: (bidId, vehicle_id, price) => dispatch(chooseBid(bidId, vehicle_id, price)),
});

const SearchingScreenContainer = (componentName) => {
  const SearchingScreen = Components[componentName];
  const mapStateToProps = (state) => {
    const props = {
      bids: getBidArray(state.bids),
      stage: state.order.stage,
      missionId: state.mission.id,
      appPath: state.app.path
    };

    if (componentName === 'ChargingSearchingScreen') {
      props.chargers = state.chargers;
      props.chargerOnMission = getChargerOnMission(state);
    } else if (componentName === 'RoutePlanSearchingScreen') {
      props.routeProviders = state.routes;
      props.providersOnMission = getRouteProvidersOnMission(state);
    } else if (componentName === 'DeliverySearchingScreen') {
      props.vehicles = state.vehicles;
      props.vehicleOnMission = getVehicleOnMission(state);
    } 
    return props;
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchingScreen);
};

export default SearchingScreenContainer;
'';
