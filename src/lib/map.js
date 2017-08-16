import mapboxgl from 'mapbox-gl';

export const createMap = () => {
  mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.1.1/mapbox-gl-rtl-text.js');
  return new mapboxgl.Map({
    container: 'map',
    style: 'https://openmaptiles.github.io/positron-gl-style/style-cdn.json',
    center: [34.7796028, 32.0766127],
    zoom: 11,
    attributionControl: false
  }).addControl(new mapboxgl.AttributionControl({
    compact: true
  }));
};
