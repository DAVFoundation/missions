import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { initializeApp } from '../../lib/app';
import Map from '../../containers/MapContainer.jsx';
import MainScreenContainer from '../../containers/MainScreenContainer.jsx';
import MapItemDetailsScreenContainer from '../../containers/MapItemDetailsScreenContainer.jsx';
import OrderScreenContainer from '../../containers/drone_simulation/OrderScreenContainer.jsx';
import MissionContainer from '../../containers/MissionContainer.jsx';
import SearchingScreenContainer from '../../containers/SearchingScreenContainer.jsx';
import ConfirmPickupContainer from '../../containers/ConfirmTakeoffContainer.jsx';
import Welcome from '../../components/Welcome.jsx';

class App extends Component {

  componentDidMount() {
    initializeApp();
  }

  render() {
    return (
      <Router>
        <div>
          <Map />

          <Route exact path="/drone_simulation/" component={ MainScreenContainer('DeliveryMainScreen') } />

          <Route path="/drone_simulation/welcome" component={ Welcome } />

          <Route path="/drone_simulation/vehicles/:id" component={ MapItemDetailsScreenContainer } />

          <Route path="/drone_simulation/order" component={ OrderScreenContainer() } />

          <Route path="/drone_simulation/searching" component={ SearchingScreenContainer('DeliverySearchingScreen') } />

          <Route path="/drone_simulation/mission" component= { MissionContainer('DeliveryMissionScreen') } />
          <Route path="/drone_simulation/mission/vehicles/:id" component={ MapItemDetailsScreenContainer } />

          <Route path="/drone_simulation/confirm-takeoff" component= { ConfirmPickupContainer } />

        </div>
      </Router>
    );
  }
}

export default App;
