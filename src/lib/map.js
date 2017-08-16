import mapboxgl from 'mapbox-gl';

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
  mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.1.1/mapbox-gl-rtl-text.js');
  let map = new mapboxgl.Map({
    container: containerId,
    style: 'https://openmaptiles.github.io/positron-gl-style/style-cdn.json',
    center: [coords.long, coords.lat],
    zoom: 13,
    attributionControl: false
  });
  map.addControl(new mapboxgl.AttributionControl({
    compact: true
  }));
  map.on('load', () => {
    map.addSource('vehicles', {
      "type": "geojson",
      "data": {
        "type": "FeatureCollection",
        "features": []
      }
    });
    map.addLayer({
      'id': 'vehicles',
      'type': 'circle', // 'symbol',
      'source': 'vehicles'
    })
  });
  return map;
};

export const updateMap = (map, vehicles = []) => {
  map.on('load', () => {
    map.getSource('vehicles').setData(createGeoJson(vehicles));
  });
};
