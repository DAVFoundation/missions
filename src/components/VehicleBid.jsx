import React from 'react';
import PropTypes from 'prop-types';

const VehicleBid = ({bid, vehicle, shown}) => {
  let classNames = ['vehicle-bid-card'];
  if (!shown) {
    classNames.push('vehicle-bid-card--hidden');
  }
  return (
    <div className={classNames.join(' ')}>
      <div className="vehicle-card">
        <img src={vehicle.icon} />
        <div className="vehicle-vitals">
          <h2>{vehicle.model}</h2>
          <p>{bid.id}</p>
          <div className="rating">Rating <strong>{vehicle.rating}</strong></div>
        </div>
      </div>
    </div>
  );
};

VehicleBid.propTypes = {
  bid: PropTypes.object.isRequired,
  vehicle: PropTypes.object.isRequired,
  shown: PropTypes.bool.isRequired,
};

export default VehicleBid;
