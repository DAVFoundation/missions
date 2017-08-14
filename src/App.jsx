import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Map from './components/Map.jsx';
import Welcome from './components/Welcome.jsx';

const App = () =>
  <Router>
    <div>
      <Map />
      <Route path="/welcome" component={ Welcome } />
    </div>
  </Router>;

export default App;
