import React from 'react';
import PropTypes from 'prop-types';
import VehicleCard from './VehicleCard.jsx';
import './VehicleDetails.css';

const VehicleDetails = ({vehicle}) => (
  <div className="vehicle-details">
    <VehicleCard icon={vehicle.icon} id={vehicle.id} model={vehicle.model} rating={vehicle.rating} />
    <div className="vehicle-missions-count"><strong>{vehicle.missions_completed} missions</strong> completed successfully</div>
    <div className="vehicle-missions-count-7"><strong>{vehicle.missions_completed_7_days} missions</strong> completed successfully in last 7 days</div>
  </div>
);

VehicleDetails.propTypes = {
  vehicle: PropTypes.object.isRequired,
};

export default VehicleDetails;
