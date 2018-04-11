import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Map from '../../containers/MapContainer.jsx';
import {initializeApp} from '../../lib/app';
import MainScreenContainer from '../../containers/MainScreenContainer.jsx';
import OrderScreenContainer from '../../containers/OrderScreenContainer.jsx';
import MapItemDetailsScreenContainer from '../../containers/MapItemDetailsScreenContainer.jsx';

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
          <Route path="/drone_charging/order" component={ OrderScreenContainer('ChargingOrderScreen')  } />
        </div>
      </Router>
    );
  }
}

export default App;
