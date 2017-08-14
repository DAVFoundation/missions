import React from 'react';
import Map from '../components/Map.jsx';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () =>
  <Router>
    <Route path="/map" component={ Map } />
  </Router>;

export default App;
