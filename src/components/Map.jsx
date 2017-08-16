import React, { Component } from 'react';
import { createMap } from '../lib/map';
import './Map.css';

class Map extends Component {
  constructor(props) {
    super(props);
    this.map = null;
  }

  componentDidMount() {
    this.map = createMap();
  }

  render() {
    return (
      <div id="map" />
    );
  }
}

export default Map;
