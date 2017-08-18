import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createMap, updateMap } from '../lib/map';
import './Map.css';

class Map extends Component {
  constructor(props) {
    super(props);
    this.map = null;
    this.onVehicleClick = this.onVehicleClick.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    updateMap(this.map, nextProps.vehicles);
    return false;
  }

  onVehicleClick(id) {
    console.log('vehicle', id);
  }

  componentDidMount() {
    this.map = createMap({
      'containerId': 'map',
      'coords': this.props.coords,
      'onVehicleClick': this.onVehicleClick
    });
    updateMap(this.map, this.props.vehicles);
  }

  render() {
    return (
      <div id="map" />
    );
  }
}

Map.defaultProps = {
  coords: {lat: 32.068717, long: 34.775805}
};

Map.propTypes = {
  vehicles: PropTypes.array.isRequired,
  coords: PropTypes.object.isRequired,
};

export default Map;
