import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createMap, updateMap } from '../lib/map';
import './Map.css';

class Map extends Component {
  constructor(props) {
    super(props);
    this.map = null;
  }

  shouldComponentUpdate(nextProps) {
    updateMap(this.map, nextProps.vehicles.list);
    return false;
  }

  componentDidMount() {
    this.map = createMap('map', this.props.coords);
    updateMap(this.map, this.props.vehicles.list);
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
  vehicles: PropTypes.object.isRequired,
  coords: PropTypes.object.isRequired,
};

export default Map;
