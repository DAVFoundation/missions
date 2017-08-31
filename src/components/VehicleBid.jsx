import React from 'react';
import PropTypes from 'prop-types';

const VehicleBid = ({vehicle}) => (
  <div className="vehicle-bid-card vehicle-bid-card--small">
    <div className="vehicle-card">
      <img src={vehicle.icon} />
      <div className="vehicle-vitals">
        <h2>{vehicle.model}</h2>
        <div className="rating">Rating <strong>{vehicle.rating}</strong></div>
      </div>
    </div>
  </div>
);

VehicleBid.propTypes = {
  vehicle: PropTypes.object.isRequired,
};

export default VehicleBid;
