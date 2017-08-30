export const makeImage = (imageData) => {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.src = imageData;
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', () => reject());
  });
};

export const getShortCoordsString = (coords, precision = 7) => {
  const {lat, long} = coords;
  return lat && long && `${lat.toFixed(precision)}, ${long.toFixed(precision)}`;
};
