import mapboxgl from 'mapbox-gl';
import { makeImage } from './utils'
import droneIcon from '../images/drone_icon.png';

const createGeoJson = (features = []) => {
  return {
    "type": "FeatureCollection",
    "features": features.map(feature => ({
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [feature.coords.long, feature.coords.lat]
      },
      "properties": {
        "id": feature.id,
      }

    }))
  };
};

export const createMap = (containerId, coords) => {
  // Add support for right-to-left languages
  mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.1.1/mapbox-gl-rtl-text.js');

  // Create the map
  let map = new mapboxgl.Map({
    container: containerId,
    style: 'https://openmaptiles.github.io/positron-gl-style/style-cdn.json',
    center: [coords.long, coords.lat],
    zoom: 13,
    attributionControl: false
  });

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
      "type": "geojson",
      "data": {
        "type": "FeatureCollection",
        "features": []
      }
    });
    map.addLayer({
      'id': 'vehicles',
      'type': 'symbol',
      'source': 'vehicles',
      "layout": {
        "icon-image": "drone",
      }
    })
  });

  return map;
};

export const updateMap = (map, vehicles = []) => {
  map.on('load', () => {
    map.getSource('vehicles').setData(createGeoJson(vehicles));
  });
};
