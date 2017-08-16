import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createMap, updateMap } from '../lib/map';
import './Map.css';

class Map extends Component {
  constructor(props) {
    super(props);
    this.map = null;
  }

  shouldComponentUpdate(nextProps) {
    updateMap(nextProps.vehicles.list);
    return false;
  }

  componentDidMount() {
    this.map = createMap('map', {lat: 32.0766127, long: 34.7796028});
    updateMap(this.props.vehicles.list);
  }

  render() {
    return (
      <div id="map" />
    );
  }
}

export default connect(
  (state) => ({vehicles: state.vehicles})
)(Map);
