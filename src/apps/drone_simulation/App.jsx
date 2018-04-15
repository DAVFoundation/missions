import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { initializeApp } from '../../lib/app';
import Map from '../../containers/MapContainer.jsx';
import MainScreenContainer from '../../containers/MainScreenContainer.jsx';
import MapItemDetailsScreenContainer from '../../containers/MapItemDetailsScreenContainer.jsx';
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

          <Route exact path="/" component={ MainScreenContainer('DeliveryMainScreen') } />

          <Route path="/welcome" component={ Welcome } />

          <Route path="/vehicles/:id" component={ MainScreenContainer('DeliveryMainScreen') } />
          <Route path="/vehicles/:id" component={ MapItemDetailsScreenContainer } />

          <Route path="/order" component={ OrderScreenContainer('DeliveryOrderScreen') } />

          <Route path="/searching" component={ SearchingScreenContainer('DeliverySearchingScreen') } />

          <Route path="/mission" component= { MissionContainer } />
          <Route path="/mission/vehicles/:id" component={ MapItemDetailsScreenContainer } />

          <Route path="/confirm-takeoff" component= { ConfirmPickupContainer } />

        </div>
      </Router>
    );
  }
}

export default App;
