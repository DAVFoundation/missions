import mapboxgl from 'mapbox-gl';

export const createMap = (containerId, coords) => {
  mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.1.1/mapbox-gl-rtl-text.js');
  return new mapboxgl.Map({
    container: containerId,
    style: 'https://openmaptiles.github.io/positron-gl-style/style-cdn.json',
    center: [coords.long, coords.lat],
    zoom: 11,
    attributionControl: false
  }).addControl(new mapboxgl.AttributionControl({
    compact: true
  }));
};

export const updateMap = (vehicles = []) => {
};
