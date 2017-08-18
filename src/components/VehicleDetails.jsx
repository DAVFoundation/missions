import React from 'react';
import PropTypes from 'prop-types';

const VehicleDetails = ({vehicle}) => (
  <div>
    VehicleDetails - {vehicle.model}
  </div>
);

VehicleDetails.propTypes = {
  vehicle: PropTypes.object.isRequired,
};

export default VehicleDetails;
