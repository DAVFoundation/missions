import React from 'react';
import PropTypes from 'prop-types';
import MapItemCard from './MapItemCard.jsx';
import './MapItemDetails.css';

const MapItemDetails = ({mapItem}) => (
  <div className="vehicle-details">
    <MapItemCard icon={mapItem.icon} id={mapItem.id} model={mapItem.model} />
    <div className="vehicle-missions-count"><strong>{mapItem.missions_completed} missions</strong> completed successfully</div>
    <div className="vehicle-missions-count-7"><strong>{mapItem.missions_completed_7_days} missions</strong> completed successfully in last 7 days</div>
  </div>
);

MapItemDetails.propTypes = {
  mapItem: PropTypes.object.isRequired,
};

export default MapItemDetails;
