export const makeImage = (imageData) => {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.src = imageData;
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', () => reject());
  });
};

export const getShortCoordsString = (coords = {}, precision = 6, separator=', ') => {
  const {lat, long} = coords;
  return lat && long && lat.toFixed(precision)+separator+long.toFixed(precision);
};

export const coordsFromString = (strCoords) => {
  const [lat, long] = strCoords.replace(/[^\d.,-]/gi, '').split(',');
  return (lat && long) ? {lat: parseFloat(lat), long: parseFloat(long)} : undefined;
};


export const humanReadableVehicleStatus = {
  travelling_pickup: 'Flying to Pickup',
  landing_pickup: 'Landing at Pickup',
  waiting_pickup: 'Waiting for Takeoff confirmation',
  takeoff_pickup: 'Taking off',
  travelling_dropoff: 'Flying to Dropoff',
  waiting_dropoff: 'Waiting at Dropoff'
};