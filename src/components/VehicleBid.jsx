import React from 'react';
import PropTypes from 'prop-types';

const VehicleBid = ({vehicle}) => (
  <div className="vehicle-bid-card">
    {vehicle.model}
  </div>
);

VehicleBid.propTypes = {
  vehicle: PropTypes.object.isRequired,
};

export default VehicleBid;
