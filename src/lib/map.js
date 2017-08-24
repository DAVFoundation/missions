import mapboxgl from 'mapbox-gl';
import { makeImage } from './utils';
import droneIcon from '../images/icon_drone.png';

const createGeoJson = (features = []) => {
  return {
    'type': 'FeatureCollection',
    'features': features.map(feature => ({
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [feature.coords.long, feature.coords.lat]
      },
      'properties': {
        'id': feature.id,
      }
    }))
  };
};

const getUserLocation = () => new Promise(
  (resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject)
);

/**
 * Returns a promise that resolves only if we can determine that the user has granted geolocation permission
 * Promise rejects if permission wasn't granted, denied, or Permissions API is not supported
 *
 * @returns {Promise}
 */
const hasGeolocationPermission = () => new Promise((resolve, reject) => {
  if (!navigator.permissions) reject();
  navigator.permissions.query({name: 'geolocation'}).then(
    result => result.state === 'granted' ? resolve() : reject()
  );
});

export const createMap = ({containerId, coords, onVehicleClick}) => {
  // Add support for right-to-left languages
  mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.1.1/mapbox-gl-rtl-text.js');

  // Create the map
  let map = new mapboxgl.Map({
    container: containerId,
    style: '/lib/map_style.json',
    center: [coords.long, coords.lat],
    zoom: 14,
    attributionControl: false
  });

  // Add controls to geolocate the user
  map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  }), 'bottom-left');

  // Add minimal attribution controls
  map.addControl(new mapboxgl.AttributionControl({
    compact: true
  }));

  // add images, sources, and layers on load
  map.on('load', () => {
    makeImage(droneIcon).then(
      img => map.addImage('drone', img)
    );
    map.addSource('vehicles', {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': []
      }
    });
    map.addLayer({
      'id': 'vehicles',
      'type': 'symbol',
      'source': 'vehicles',
      'layout': {
        'icon-image': 'drone',
      }
    });
    map.on('click', 'vehicles', (e) => onVehicleClick(e.features[0].properties.id));
  });

  // Check if user has already granted permission to access geolocation
  // If permission was granted, get user location and center map on them
  hasGeolocationPermission()
    .then(getUserLocation)
    .then(
      ({ coords }) => map.setCenter([coords.longitude, coords.latitude])
    ).catch(() => {});

  return map;
};

export const updateMap = (map, vehicles = []) => {
  const _updateMap = () => {
    map.getSource('vehicles').setData(createGeoJson(vehicles));
  };
  if (!map.loaded()) {
    map.on('load', _updateMap);
  } else {
    _updateMap();
  }
};
