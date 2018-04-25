import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Map from '../../containers/MapContainer.jsx';
import {initializeApp} from '../../lib/app';
import MainScreenContainer from '../../containers/MainScreenContainer.jsx';
import OrderScreenContainer from '../../containers/route_plan/OrderScreenContainer.jsx';
import MapItemDetailsScreenContainer from '../../containers/MapItemDetailsScreenContainer.jsx';
import SearchingScreenContainer from '../../containers/SearchingScreenContainer.jsx';
import MissionContainer from '../../containers/MissionContainer.jsx';

class App extends Component {

  componentDidMount() {
    initializeApp();
  }

  render() {
    return (
      <Router>
        <div>
          <Map addControls={false}/>
          <Route exact path="/route_plan/" component={MainScreenContainer('RoutePlanMainScreen')}/>

          <Route path="/route_plan/:mapItemType/:id" component={ MainScreenContainer('ChargingMainScreen') } />
          <Route path="/route_plan/:mapItemType/:id" component={ MapItemDetailsScreenContainer } />
          <Route path="/route_plan/order" component={ OrderScreenContainer()  } />
          <Route path="/route_plan/searching" component={ SearchingScreenContainer('RoutePlanSearchingScreen') } />
          <Route path="/route_plan/mission" component= { MissionContainer('RoutePlanMissionScreen') } />
        </div>
      </Router>
    );
  }
}

export default App;
