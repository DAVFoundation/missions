const apiRoot = 'http://localhost:8888';

export const fetchStatus = ({id = '0xabc', lat = 32.068717, long = 34.775805} = {}) =>
  fetch(`${apiRoot}/status?id=${id}&lat=${lat}&long=${long}`)
    .then(
      response => response.json()
    );
