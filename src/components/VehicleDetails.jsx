import React from 'react';
import PropTypes from 'prop-types';

const VehicleDetails = ({vehicle}) => (
  <div>
    VehicleDetails - {vehicle}
  </div>
);

VehicleDetails.propTypes = {
  vehicle: PropTypes.string.isRequired,
};

export default VehicleDetails;
