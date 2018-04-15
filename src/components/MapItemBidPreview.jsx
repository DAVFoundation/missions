import React from 'react';
import PropTypes from 'prop-types';
import MapItemCard from './MapItemCard.jsx';

const MapItemBidPreview = ({mapItem}) => (
  <div className="vehicle-bid-card vehicle-bid-card--small">
    <MapItemCard icon={mapItem.icon} model={mapItem.model} id={mapItem.id} />
  </div>
);

MapItemBidPreview.propTypes = {
  mapItem: PropTypes.object.isRequired,
};

export default MapItemBidPreview;
