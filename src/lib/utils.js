export const makeImage = (imageData) => {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.src = imageData;
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', () => reject());
  });
};

export const getShortCoordsString = (coords = {}, precision = 6) => {
  const {lat, long} = coords;
  return lat && long && `${lat.toFixed(precision)}, ${long.toFixed(precision)}`;
};

export const coordsFromString = (strCoords) => {
  const [lat, long] = strCoords.replace(/[^\d.,]/gi, '').split(',');
  return (lat && long) ? {lat: parseFloat(lat), long: parseFloat(long)} : undefined;
};
