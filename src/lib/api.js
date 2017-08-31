const apiRoot = 'http://localhost:8888';

export const fetchStatus = ({ id, lat, long, requestId }) => {
  let url = new URL(`/status`, apiRoot);
  id && url.searchParams.set('id', id);
  lat && url.searchParams.set('lat', lat); // Don't stand on the equator or you'll break this
  long && url.searchParams.set('long', long);
  requestId && url.searchParams.set('requestId', requestId);
  return fetch(url)
    .then(
      response => response.json()
    );
};

export const createRequest = ({user_id, pickup, dropoff, requested_pickup_time, size, weight}) =>
  fetch(`${apiRoot}/request/new?user_id=${user_id}&pickup=${pickup}&dropoff=${dropoff}&requested_pickup_time=${requested_pickup_time}&size=${size}&weight=${weight}`)
    .then(
      response => response.json()
    );
