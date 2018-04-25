import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Map from '../../containers/MapContainer.jsx';
import {initializeApp} from '../../lib/app';
import MainScreenContainer from '../../containers/MainScreenContainer.jsx';
import OrderScreenContainer from '../../containers/drone_charging/OrderScreenContainer.jsx';
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
          <Route exact path="/drone_charging/" component={MainScreenContainer('ChargingMainScreen')}/>

          <Route path="/drone_charging/:mapItemType/:id" component={ MainScreenContainer('ChargingMainScreen') } />
          <Route path="/drone_charging/:mapItemType/:id" component={ MapItemDetailsScreenContainer } />
          <Route path="/drone_charging/order" component={ OrderScreenContainer()  } />
          <Route path="/drone_charging/searching" component={ SearchingScreenContainer('ChargingSearchingScreen') } />
          <Route path="/drone_charging/mission" component= { MissionContainer('ChargingMissionScreen') } />
        </div>
      </Router>
    );
  }
}

export default App;
