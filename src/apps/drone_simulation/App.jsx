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

          <Route exact path="/" component={ MainScreenContainer } />

          <Route path="/welcome" component={ Welcome } />

          <Route path="/vehicle/:uid" component={ MainScreenContainer } />
          <Route path="/vehicle/:uid" component={ VehicleDetailsScreenContainer } />

          <Route path="/order" component={ OrderScreenContainer } />

          <Route path="/searching" component={ SearchingScreenContainer } />

          <Route path="/mission" component= { MissionContainer } />
          <Route path="/mission/vehicle/:uid" component={ VehicleDetailsScreenContainer } />

          <Route path="/confirm-takeoff" component= { ConfirmPickupContainer } />

        </div>
      </Router>
    );
  }
}

export default App;
