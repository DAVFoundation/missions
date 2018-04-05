import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {makeImage} from './utils';
import droneIcon from '../images/icon_drone.png';
import locationIcon from '../images/icon_location.png';
import chargingStationIcon from '../images/icon_charging_station.png';
import pickupIcon from '../images/pin-pickup.svg';
import dropoffIcon from '../images/pin-dropoff.svg';
import mapStyle from './map_style.json';
import turf from 'turf';

const icons = {droneIcon, locationIcon, chargingStationIcon, pickupIcon, dropoffIcon};

const createGeoJson = (features = []) => {
  return {
    type: 'FeatureCollection',
    features: features.map(feature => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [feature.coords.long, feature.coords.lat],
      },
      properties: {
        id: feature.id,
      },
    })),
  };
};

const getUserLocation = () =>
  new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject),
  );

/**
 * Returns a promise that resolves only if we can determine that the user has granted geolocation permission
 * Promise rejects if permission wasn't granted, denied, or Permissions API is not supported
 *
 * @returns {Promise}
 */
const hasGeolocationPermission = () =>
  new Promise((resolve, reject) => {
    if (!navigator.permissions) reject();
    navigator.permissions
      .query({name: 'geolocation'})
      .then(result => (result.state === 'granted' ? resolve() : reject()));
  });

export const createMap = ({
  containerId,
  coords,
  onVehicleClick,
  onMoveEnd,
  addControls
}) => {
  // Add support for right-to-left languages
  mapboxgl.setRTLTextPlugin(
    'lib/mapbox-gl-rtl-text.js.min',
  );

  // Create the map
  let map = new mapboxgl.Map({
    container: containerId,
    style: mapStyle,
    center: [coords.long, coords.lat],
    zoom: 14,
    attributionControl: false,
  });


  if (addControls) {
    // Add controls to geolocate the user
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      }),
      'bottom-left',
    );

    // Add minimal attribution controls
    map.addControl(
      new mapboxgl.AttributionControl({
        compact: true,
      }),
    );
  }

  // add images, sources, and layers on load
  map.on('load', () => {
    Object.keys(icons).forEach((key) => {
      const imgId = key.replace('Icon', '');
      makeImage(icons[key]).then(img => map.addImage(imgId, img));
    });

    map.addSource('vehicles', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [],
      },
    });
    map.addLayer({
      id: 'vehicles',
      type: 'symbol',
      source: 'vehicles',
      minzoom: 10,
      layout: {
        'icon-image': 'drone',
        'icon-allow-overlap': true,
        'icon-ignore-placement': true,
      },
    });

    map.addSource('chargingStations', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [],
      },
    });

    map.addLayer({
      id: 'chargingStations',
      type: 'symbol',
      source: 'chargingStations',
      minzoom: 10,
      layout: {
        'icon-image': 'chargingStation',
        'icon-allow-overlap': true,
        'icon-ignore-placement': true,
      },
    });

    map.on('click', 'vehicles', e =>
      onVehicleClick(e.features[0].properties.id),
    );
  });

  map.on('moveend', () => {
    const mapCenter = map.getCenter();
    onMoveEnd({lat: mapCenter.lat, long: mapCenter.lng});
  });

  // Check if user has already granted permission to access geolocation
  // If permission was granted, get user location and center map on them
  hasGeolocationPermission()
    .then(getUserLocation)
    .then(({coords}) => {
      addUserLocationIcon(map, coords);
      let chargingStations = addControls ? [] : generateRandomChargingStations(coords);
      addChargingStations(map, chargingStations);
      return map.setCenter([coords.longitude, coords.latitude]);
    })
    .catch(() => {
    });

  return map;
};

export const updateMap = (map, vehicles = [], {pickup, dropoff} = {}, chargingStations = []) => {
  handleMapUpdate(map, () => {
    if (vehicles) map.getSource('vehicles').setData(createGeoJson(vehicles));
    if (pickupAndDropoffPresent(map, pickup, dropoff)) {
      map.getSource('pickup').setData(turf.point([pickup.long, pickup.lat]));
      map.getSource('dropoff').setData(turf.point([dropoff.long, dropoff.lat]));
    }
    addChargingStations(map, chargingStations);
  });
};

const addChargingStations = (map, chargingStations) => {
  if (chargingStations) map.getSource('chargingStations').setData(createGeoJson(chargingStations));
};

const handleMapUpdate = (map, update) => {
  if (!map.loaded()) {
    map.on('load', update);
  } else {
    update();
  }
};

const pickupAndDropoffPresent = (map, pickup, dropoff) => {
  return (
    pickup && dropoff && map.getSource('pickup') && map.getSource('dropoff')
  );
};

export const initiateZoomTransition = (map, pickup, dropoff, options) => {
  handleMapUpdate(map, () => {
    const collection = turf.featureCollection([
      turf.point([pickup.long, pickup.lat]),
      turf.point([dropoff.long, dropoff.lat]),
    ]);
    let bbox = turf.bbox(collection);
    map.fitBounds(bbox, {...options, padding: {top: 100, bottom: 300, left: 50, right: 50}});
  });
};

export const clearTerminals = map => {
  if (map.getSource('pickup') && map.getSource('dropoff')) {
    map.removeLayer('pickup');
    map.removeLayer('dropoff');
    map.removeSource('pickup');
    map.removeSource('dropoff');
  }
};

const addUserLocationIcon = (map, coords) => {
  if (!map.getSource('location')) {
    map.addSource('location', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [],
      }
    });
  }

  map.addLayer({
    id: 'location',
    type: 'symbol',
    source: 'location',
    minzoom: 10,
    layout: {
      'icon-image': 'location',
      'icon-allow-overlap': true,
      'icon-ignore-placement': true,
    },
  });

  map.getSource('location').setData(turf.point([coords.longitude, coords.latitude]));
};

export const addTerminals = map => {
  if (!map.getSource('pickup') && !map.getSource('dropoff')) {
    map.addSource('pickup', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [],
      },
    });
    map.addLayer({
      id: 'pickup',
      type: 'symbol',
      source: 'pickup',
      minzoom: 10,
      layout: {
        'icon-image': 'pickup',
        'icon-allow-overlap': true,
        'icon-ignore-placement': true,
      },
    });
    map.addSource('dropoff', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [],
      },
    });
    map.addLayer({
      id: 'dropoff',
      type: 'symbol',
      source: 'dropoff',
      minzoom: 10,
      layout: {
        'icon-image': 'dropoff',
        'icon-allow-overlap': true,
        'icon-ignore-placement': true,
      },
    });
  }
};


// generate random charging stations just for viewing/testing purposes
const generateRandomChargingStations = (coords) => {
  let chargingStations = [];
  for (let i = 0; i < 4; i++) {
    chargingStations.push({coords: randomCoords({coords, radius: 1000})});
  }
  return chargingStations;
};

const randomCoords = ({ coords, radius }) => {
  const angle = Math.random() * 2 * Math.PI;
  const distance = Math.random() * radius;
  const longDegreesPerMeter = 1 / 111321.377778; // longitude degrees per meter
  const latDegreesPerMeter = 1 / 111134.86111; // latitude degrees per meter
  const x = parseFloat(
    (coords.latitude + latDegreesPerMeter * distance * Math.cos(angle)).toFixed(6),
  );
  const y = parseFloat(
    (coords.longitude + longDegreesPerMeter * distance * Math.sin(angle)).toFixed(6),
  );
  return { lat: x, long: y };
};
