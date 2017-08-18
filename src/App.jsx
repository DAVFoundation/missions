import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Map from './containers/MapContainer.jsx';
import MainScreen from './components/MainScreen.jsx';
import VehicleDetailsScreen from './components/VehicleDetailsScreen.jsx';
import Welcome from './components/Welcome.jsx';

const App = () =>
  <Router>
    <div>
      <Map />
      <Route path="/" component={ MainScreen } />
      <Route path="/welcome" component={ Welcome } />
      <Route path="/vehicle/:uid" component={ VehicleDetailsScreen } />
    </div>
  </Router>;

export default App;
