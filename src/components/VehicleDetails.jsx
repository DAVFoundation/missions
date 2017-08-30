import React from 'react';
import PropTypes from 'prop-types';
import './VehicleDetails.css';

const VehicleDetails = ({vehicle}) => (
  <div className="vehicle-details">
    <div className="vehicle-card">
      <img src={vehicle.icon} />
      <div className="vehicle-vitals">
        <h2>{vehicle.model}</h2>
        <div className="dav-uid">{vehicle.id}</div>
        <div className="rating">Rating <strong>{vehicle.rating}</strong></div>
      </div>
    </div>
    <div className="vehicle-missions-count"><strong>{vehicle.missions_completed} missions</strong> completed successfully</div>
    <div className="vehicle-missions-count-7"><strong>{vehicle.missions_completed_7_days} missions</strong> completed successfully in last 7 days</div>
  </div>
);

VehicleDetails.propTypes = {
  vehicle: PropTypes.object.isRequired,
};

export default VehicleDetails;
