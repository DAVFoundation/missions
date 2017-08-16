const defaultState = {
  vehicles: [
    {
      'id': '0xb2930B35844a230f00E51431aCAe96Fe543a0347',
      'model': 'DJX CargoMate 3',
      'coord': {lat: 32.075477, long: 34.775730},
      'rating': 4.9,
      'missions_completed': 36,
      'missions_completed_7_days': 3,
    },
    {
      'id': '0xF00ce0d081A73400e79e88379ca135C22bfBCBcC',
      'model': 'DJX iHaul',
      'coord': {lat: 32.077593, long: 34.768209},
      'rating': 4.6,
      'missions_completed': 290,
      'missions_completed_7_days': 13,
    },
    {
      'id': '0xe4cFdAf5F656f65f21D04AF3924AA9E3d5828eD0',
      'model': 'Parakeet Heavy',
      'coord': {lat: 32.072447, long: 34.779668},
      'rating': 4.8,
      'missions_completed': 19,
      'missions_completed_7_days': 0,
    }
  ]
};

export default (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
