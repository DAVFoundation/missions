import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

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
          <a className="med-button choose-bid-button" onClick={() => console.log(bid.id)}>Order</a>
          <h2>{vehicle.model}</h2>
          <div className="rating">Rating <strong>{vehicle.rating}</strong></div>
        </div>
      </div>
      <dl className="bid-details">
        <dt>Estimated pickup time:</dt>
        <dd>{moment(bid.pickup, 'x').fromNow()}</dd>
        <dt>Estimated dropoff time:</dt>
        <dd>{moment(bid.dropoff, 'x').format('h:mm a')}</dd>
        <dt>Cost for delivery:</dt>
        <dd>{bid.bid} DAV</dd>
      </dl>
    </div>
  );
};

VehicleBid.propTypes = {
  bid: PropTypes.object.isRequired,
  vehicle: PropTypes.object.isRequired,
  shown: PropTypes.bool.isRequired,
};

export default VehicleBid;
