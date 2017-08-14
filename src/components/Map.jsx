import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

class App extends Component {
  constructor(props) {
    super(props);
    this.map = null;
  }

  componentDidMount() {
    mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.1.1/mapbox-gl-rtl-text.js');
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'https://openmaptiles.github.io/positron-gl-style/style-cdn.json',
      center: [34.7796028, 32.0766127],
      zoom: 11,
      attributionControl: false
    }).addControl(new mapboxgl.AttributionControl({
      compact: true
    }));
  }

  render() {
    return (
      <div id="map" />
    );
  }
}

export default App;
