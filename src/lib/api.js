const apiRoot = 'http://localhost:8888';

export const fetchStatus = ({ id, lat, long }) =>
  fetch(`${apiRoot}/status?id=${id}&lat=${lat}&long=${long}`)
    .then(
      response => response.json()
    );

export const createRequest = ({user_id, pickup, dropoff, requested_pickup_time, size, weight}) =>
  fetch(`${apiRoot}/request/new?user_id=${user_id}&pickup=${pickup}&dropoff=${dropoff}&requested_pickup_time=${requested_pickup_time}&size=${size}&weight=${weight}`)
    .then(
      response => response.json()
    );
