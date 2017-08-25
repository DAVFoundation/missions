const apiRoot = 'http://localhost:8888';

export const fetchStatus = ({ id, lat, long }) =>
  fetch(`${apiRoot}/status?id=${id}&lat=${lat}&long=${long}`)
    .then(
      response => response.json()
    );
