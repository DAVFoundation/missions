import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createMap, updateMap, initiateZoomTransition, clearTerminals, addTerminals} from '../lib/map';
import './Map.css';

class Map extends Component {
  constructor(props) {
    super(props);
    this.map = null;
    this.onVehicleClick = this.onVehicleClick.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const terminals = {
      pickup: nextProps.pickup,
      dropoff: nextProps.dropoff
    };

    updateMap(this.map, nextProps.vehicles, terminals);

    if(this.props.orderStage === 'draft' && nextProps.orderStage === 'searching') {
      initiateZoomTransition(this.map, nextProps.pickup, nextProps.pickup,{maxZoom:14});
      addTerminals(this.map);
    }

    if (nextProps.missionStatus === 'completed') {
      clearTerminals(this.map);
    }

    if(['searching', 'choosing', 'signing'].includes(this.props.orderStage) && nextProps.orderStage === 'draft') {
      clearTerminals(this.map);
    } else {
      addTerminals(this.map);
    }

    if (nextProps.orderStage === 'in_mission') {
      if (this.props.vehicles.length > 0) {

        if (nextProps.vehicles[0].status === 'waiting_pickup') {
          this.props.history.push(this.props.appPath+'/confirm-takeoff');
        } else {
          this.props.history.push(this.props.appPath+'/mission');
        }

        if (nextProps.vehicles[0].status === 'travelling_pickup') {
          initiateZoomTransition(this.map, nextProps.vehicles[0].coords, nextProps.pickup, { maxZoom: 18 });
        }

        if (nextProps.vehicles[0].status === 'travelling_dropoff') {
          initiateZoomTransition(this.map, nextProps.pickup, nextProps.dropoff);
        }
      }
    }

    return false;
  }

  onVehicleClick(id) {
    if (this.props.orderStage == 'in_mission'){
      this.props.history.push(this.props.appPath+'/mission/vehicle/'+id);
    } else {
      this.props.history.push(this.props.appPath+'/vehicle/'+id);
    }
  }

  componentDidMount() {
    this.map = createMap({
      'containerId': 'map',
      'coords': this.props.coords,
      'onVehicleClick': this.onVehicleClick,
      'onMoveEnd': this.props.onMoveEnd
    });
    const terminals = {
      pickup: this.props.pickup,
      dropoff: this.props.dropoff
    };
    updateMap(this.map, this.props.vehicles, terminals);
  }

  render() {
    return (
      <div>
        <div id="map" />
        <div id="map-overlay" />
      </div>
    );
  }
}

Map.defaultProps = {
  coords: {lat: 32.068717, long: 34.775805}
};

Map.propTypes = {
  vehicles: PropTypes.array.isRequired,
  coords: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  onMoveEnd: PropTypes.func.isRequired,
  orderStage: PropTypes.string.isRequired,
  missionStatus: PropTypes.string,
  pickup: PropTypes.object,
  dropoff: PropTypes.object,
  appPath: PropTypes.string
};

export default Map;
