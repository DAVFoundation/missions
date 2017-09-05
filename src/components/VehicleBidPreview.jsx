import React from 'react';
import PropTypes from 'prop-types';
import VehicleCard from './VehicleCard.jsx';

const VehicleBidPreview = ({vehicle}) => (
  <div className="vehicle-bid-card vehicle-bid-card--small">
    <VehicleCard icon={vehicle.icon} model={vehicle.model} rating={vehicle.rating} />
  </div>
);

VehicleBidPreview.propTypes = {
  vehicle: PropTypes.object.isRequired,
};

export default VehicleBidPreview;
