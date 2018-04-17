import {connect} from 'react-redux';
import {getBidArray} from '../reducers/bids';
import {getVehicleOnMission} from '../reducers/vehicles';
import {getChargerOnMission} from '../reducers/chargers';
import {resetOrderDetails, createMissionTransaction, startChargingMission} from '../actions';
import {cancelNeed} from '../lib/api';
import {withRouter} from 'react-router-dom';

let Components = {};

Components['ChargingSearchingScreen'] = require('../components/drone_charging/SearchingScreen.jsx').default;
Components['DeliverySearchingScreen'] = require('../components/SearchingScreen.jsx').default;

const mapDispatchToProps = (dispatch) => ({
  cancelSearch: () => cancelNeed().then(dispatch(resetOrderDetails())),
  chooseBid: (bidId, vehicle_id, price) => dispatch(createMissionTransaction(bidId, vehicle_id, price)),
  startChargingMission: (mission) => dispatch(startChargingMission(mission))
});

const SearchingScreenContainer = (componentName) => {
  const SearchingScreen = Components[componentName];
  const mapStateToProps = (state) => {
    const props = {
      bids: getBidArray(state.bids),
      stage: state.order.stage,
      missionId: state.mission.id,
      mission: state.mission,
      appPath: state.app.path
    };

    if (componentName === 'ChargingSearchingScreen') {
      props.chargers = state.chargers;
      props.chargerOnMission = getChargerOnMission(state);
      props.missionStatus = state.mission.status;
    } else if (componentName === 'DeliverySearchingScreen') {
      props.vehicles = state.vehicles;
      props.vehicleOnMission = getVehicleOnMission(state);
    }
    return props;
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(SearchingScreen));
};

export default SearchingScreenContainer;
