export const makeImage = (imageData) => {
  let image = new Image();
  image.src = imageData;
  return image;
};
