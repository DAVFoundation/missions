import mapboxgl from 'mapbox-gl';
import { makeImage } from './utils';
import droneIcon from '../images/icon_drone.png';
import mapStyle from './map_style.json';

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

export const createMap = ({containerId, coords, onVehicleClick, onMoveEnd}) => {
  // Add support for right-to-left languages
  mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.1.1/mapbox-gl-rtl-text.js');

  // Create the map
  let map = new mapboxgl.Map({
    container: containerId,
    style: mapStyle,
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
      'minzoom': 10,
      'layout': {
        'icon-image': 'drone',
      }
    });
    map.on('click', 'vehicles', (e) => onVehicleClick(e.features[0].properties.id));
  });

  map.on('moveend', () => {
    const mapCenter = map.getCenter();
    onMoveEnd({ lat: mapCenter.lat, long: mapCenter.lng });
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
  handleMapUpdate(map, () => {
    map.getSource('vehicles').setData(createGeoJson(vehicles));
  });
};

const handleMapUpdate = (map, update) => {
  if (!map.loaded()) {
    map.on('load', update);
  } else {
    update();
  }
};

export const initiateZoomTransition = (map, startZoomLevel, endZoomLevel, location) => {
  handleMapUpdate(map, () => {
    map.setZoom(startZoomLevel);
    map.setCenter([location.long, location.lat]);

    map.flyTo({
      center: map.center,
      zoom: endZoomLevel,
      bearing: 0,
      speed: 0.03
    });
  });
};
