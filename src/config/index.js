const config = {
  default_dropoff_coordinates: {lat: 55.704265, long: 13.185997},
  default_package_size: 'letter',
  default_package_weight: 500
};
    
export default (key) => {
  if (config[key]) {
    return config[key];
  }
    
  throw 'The given key to config was invalid';
};
  