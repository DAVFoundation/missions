import randomString from 'randomstring';

// icons
import sizeLetter from '../images/size-letter.svg';
import sizeCan from '../images/size-can.svg';
import sizePizza from '../images/size-pizza.svg';
import sizeBox from '../images/size-box.svg';

export const makeImage = imageData => {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.src = imageData;
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', () => reject());
  });
};

export const shiftCoords = coords => {
  const { lat, long } = coords;
  if (lat && long)
    return { lat: lat + randomShift(), long: long + randomShift() };
};

export const getShortCoordsString = (
  coords = {},
  precision = 6,
  separator = ', ',
) => {
  const { lat, long } = coords;
  return (
    (lat || lat === 0) &&
    (long || long === 0) &&
    `${lat.toFixed(precision)}${separator}${long.toFixed(precision)}`
  );
};

export const coordsFromString = strCoords => {
  const [lat, long] = strCoords.replace(/[^\d.,-]/gi, '').split(',');
  return lat && long
    ? { lat: parseFloat(lat), long: parseFloat(long) }
    : undefined;
};

export const humanReadableVehicleStatus = {
  travelling_pickup: 'Flying to Pickup',
  landing_pickup: 'Landing at Pickup',
  waiting_pickup: 'Waiting for Takeoff confirmation',
  takeoff_pickup: 'Taking off',
  travelling_dropoff: 'Flying to Dropoff',
  landing_dropoff: 'Landing at Dropoff',
  waiting_dropoff: 'Waiting at Dropoff',
  available: 'Completed',
};

const randomShift = () => {
  return (Math.floor(Math.random() * 10) + 4) / 10000;
};

export const packageSizeOptions = [
  { id: 'letter', icon: sizeLetter, cargoType: 7 },
  { id: 'can', icon: sizeCan, cargoType: 6 },
  { id: 'pizza', icon: sizePizza, cargoType: 18 },
  { id: 'box', icon: sizeBox, cargoType: 14 },
];

/**
 * Generates a random DAV address (a UID)
 *
 * @returns {String} DAV address. A string of length 42 beginning with 0x followed by 40 hexadecimal characters
 */
export const randomDavAddress = () => {
  return (
    '0x' +
    randomString.generate({
      length: 40,
      charset: 'hex',
    })
  );
};
