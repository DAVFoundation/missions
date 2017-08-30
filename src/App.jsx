import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { initializeApp } from './lib/app';
import Map from './containers/MapContainer.jsx';
import MainScreen from './components/MainScreen.jsx';
import VehicleDetailsScreen from './components/VehicleDetailsScreen.jsx';
import OrderScreenContainer from './containers/OrderScreenContainer.jsx';
import Welcome from './components/Welcome.jsx';

class App extends Component {

  componentDidMount() {
    initializeApp();
  }

  render() {
    return (
      <Router>
        <div>
          <Map />

          <Route exact path="/" component={ MainScreen } />

          <Route path="/welcome" component={ Welcome } />

          <Route path="/vehicle/:uid" component={ MainScreen } />
          <Route path="/vehicle/:uid" component={ VehicleDetailsScreen } />

          <Route path="/order" component={ OrderScreenContainer } />

        </div>
      </Router>
    );
  }
}

export default App;
