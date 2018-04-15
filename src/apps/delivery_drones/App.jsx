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
          <Map addControls={true}/>

          <Route exact path="/delivery_drones/" component={ MainScreenContainer('DeliveryMainScreen') } />

          <Route path="/delivery_drones/welcome" component={ Welcome } />

          <Route path="/delivery_drones/:mapItemType/:id" component={ MainScreenContainer('DeliveryMainScreen') } />
          <Route path="/delivery_drones/:mapItemType/:id" component={ MapItemDetailsScreenContainer } />

          <Route path="/delivery_drones/order" component={ OrderScreenContainer('DeliveryOrderScreen')  } />

          <Route path="/delivery_drones/searching" component={ SearchingScreenContainer('DeliverySearchingScreen') } />

          <Route path="/delivery_drones/mission" component= { MissionContainer } />
          <Route path="/delivery_drones/mission/:mapItemType/:id" component={ MapItemDetailsScreenContainer } />

          <Route path="/delivery_drones/confirm-takeoff" component= { ConfirmPickupContainer } />

        </div>
      </Router>
    );
  }
}

export default App;
