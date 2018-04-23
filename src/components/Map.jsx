import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createMap, updateMap, initiateZoomTransition, clearTerminals, addTerminals } from '../lib/map';
import { NEED_TYPES } from '../config/needTypes.js';
import './Map.css';

class Map extends Component {
  constructor(props) {
    super(props);
    this.map = null;
    this.onMapItemClick = this.onMapItemClick.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const terminals = {};

    if (nextProps.pickup) terminals.pickup = nextProps.pickup;
    if (nextProps.dropoff) terminals.dropoff = nextProps.dropoff;

    if (nextProps.startPosition) terminals.pickup = nextProps.startPosition;
    if (nextProps.endPosition) terminals.dropoff = nextProps.endPosition;

    if (nextProps.droneLocation) terminals.droneLocation = nextProps.droneLocation;

    updateMap(this.map, nextProps.mapItems, nextProps.mapItemType, terminals);

    if (this.props.orderStage === 'draft' && nextProps.orderStage === 'searching') {
      initiateZoomTransition(this.map, terminals, { maxZoom: 14 });
      addTerminals(this.map);
    }

    if (nextProps.missionStatus === 'completed') {
      clearTerminals(this.map);
    }

    if (['searching', 'choosing', 'signing'].includes(this.props.orderStage) && nextProps.orderStage === 'draft') {
      clearTerminals(this.map);
    } else {
      addTerminals(this.map);
    }

    if (nextProps.orderStage === 'in_mission') {
      if (nextProps.needType === NEED_TYPES.ROUTE_PLAN || nextProps.needType === NEED_TYPES.DRONE_CHARGING) {
        this.props.history.push(this.props.appPath + '/mission');
      }
      else {
        initiateZoomTransition(this.map, nextProps.pickup, nextProps.dropoff);
        if (this.props.mapItems.length > 0 && nextProps.mapItems[0].status === 'waiting_pickup') {
          this.props.history.push(this.props.appPath + '/confirm-takeoff');
        } else {
          this.props.history.push(this.props.appPath + '/mission');
        }
      }
    }

    return false;
  }

  onMapItemClick({ id, mapItemType }) {
    if (this.props.orderStage == 'in_mission') {
      this.props.history.push(this.props.appPath + `/mission/${mapItemType}/` + id);
    } else {
      this.props.history.push(this.props.appPath + `/${mapItemType}/` + id);
    }
  }


  componentDidMount() {
    this.map = createMap({
      'containerId': 'map',
      'coords': this.props.coords,
      'onMapItemClick': this.onMapItemClick,
      'onMoveEnd': this.props.onMoveEnd,
      'addControls': this.props.addControls
    });
    const terminals = {
      pickup: this.props.pickup,
      dropoff: this.props.dropoff
    };
    updateMap(this.map, this.props.mapItems, this.props.mapItemType, terminals);
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
  coords: { lat: 32.068717, long: 34.775805 }
};

Map.propTypes = {
  mapItems: PropTypes.array.isRequired,
  mapItemType: PropTypes.string.isRequired,
  needType: PropTypes.string.isRequired,
  coords: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  onMoveEnd: PropTypes.func.isRequired,
  orderStage: PropTypes.string.isRequired,
  missionStatus: PropTypes.string,
  pickup: PropTypes.object,
  dropoff: PropTypes.object,
  droneLocation: PropTypes.object,
  startPosition: PropTypes.object,
  endPosition: PropTypes.object,
  appPath: PropTypes.string,
  addControls: PropTypes.bool,
};

export default Map;
