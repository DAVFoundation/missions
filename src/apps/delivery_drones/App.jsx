import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { initializeApp } from '../../lib/app';
import Map from '../../containers/MapContainer.jsx';
import MainScreenContainer from '../../containers/MainScreenContainer.jsx';
import VehicleDetailsScreenContainer from '../../containers/VehicleDetailsScreenContainer.jsx';
import OrderScreenContainer from '../../containers/OrderScreenContainer.jsx';
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

          <Route exact path="/delivery_drones/" component={ MainScreenContainer } />

          <Route path="/delivery_drones/welcome" component={ Welcome } />

          <Route path="/delivery_drones/vehicle/:uid" component={ MainScreenContainer } />
          <Route path="/delivery_drones/vehicle/:uid" component={ VehicleDetailsScreenContainer } />

          <Route path="/delivery_drones/order" component={ OrderScreenContainer } />

          <Route path="/delivery_drones/searching" component={ SearchingScreenContainer } />

          <Route path="/delivery_drones/mission" component= { MissionContainer } />
          <Route path="/delivery_drones/mission/vehicle/:uid" component={ VehicleDetailsScreenContainer } />

          <Route path="/delivery_drones/confirm-takeoff" component= { ConfirmPickupContainer } />

        </div>
      </Router>
    );
  }
}

export default App;
