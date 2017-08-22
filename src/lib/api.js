const apiRoot = 'http://localhost:8888';

export const fetchStatus = () =>
  fetch(apiRoot+'/status')
    .then(
      response => response.json()
    );
