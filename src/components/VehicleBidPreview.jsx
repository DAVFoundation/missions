import React from 'react';
import PropTypes from 'prop-types';
import MapItemCard from './MapItemCard.jsx';

const VehicleBidPreview = ({vehicle}) => (
  <div className="vehicle-bid-card vehicle-bid-card--small">
    <MapItemCard icon={vehicle.icon} model={vehicle.model} id={vehicle.id} />
  </div>
);

VehicleBidPreview.propTypes = {
  vehicle: PropTypes.object.isRequired,
};

export default VehicleBidPreview;
