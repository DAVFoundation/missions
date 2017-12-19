const config = {
  default_dropoff_coordinates: {lat: 32.087450, long: 34.789238},
  default_package_size: 'letter',
  default_package_weight: '500'
};

export default (key) => {
  if (!(key in config)) {
    throw `The given key "${key}" to config was invalid`;
  } else {
    return config[key];
  }
};
