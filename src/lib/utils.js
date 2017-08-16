export const makeImage = (imageData) => {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.src = imageData;
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', () => reject());
  });
};
