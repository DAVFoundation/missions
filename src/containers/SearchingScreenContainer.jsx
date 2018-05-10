import {connect} from 'react-redux';
import {getBidArray} from '../reducers/bids';
import { getCaptainOnMission } from '../reducers/captains';
import {resetOrderDetails,chooseBid, startChargingMission} from '../actions';
import {cancelNeed} from '../lib/api';
import {withRouter} from 'react-router-dom';

let Components = {
  'ChargingSearchingScreen': require('../components/drone_charging/SearchingScreen.jsx').default,
  'RoutePlanSearchingScreen': require('../components/route_plan/SearchingScreen.jsx').default,
  'DeliverySearchingScreen': require('../components/SearchingScreen.jsx').default
};

const mapDispatchToProps = (dispatch) => ({
  cancelSearch: () => cancelNeed().then(dispatch(resetOrderDetails())),
  chooseBid: (bidId, captain_id, price) => dispatch(chooseBid(bidId, captain_id, price)),
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

    props.captains = state.captains;
    props.captainOnMission = getCaptainOnMission(state);
    props.missionStatus = state.mission.status;
    if (componentName === 'ChargingSearchingScreen') {
      props.chargers = props.captains;
      props.chargerOnMission = props.captainOnMission;
    } else if (componentName === 'DeliverySearchingScreen') {
      props.vehicles = props.captains;
      props.vehicleOnMission = props.captainOnMission;
    }
    return props;
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(SearchingScreen));
};

export default SearchingScreenContainer;
