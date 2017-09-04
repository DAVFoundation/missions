import React from 'react';
import PropTypes from 'prop-types';
import currencyImage from '../images/dav.svg';

const VehicleBid = ({bid, vehicle, shown, chooseBid}) => {
  const clickChooseBid = (e) => {
    e.preventDefault();
    chooseBid(bid.id);
  };

  let classNames = ['vehicle-bid-card'];
  if (!shown) {
    classNames.push('vehicle-bid-card--hidden');
  }
  return (
    <div className={classNames.join(' ')}>
      <div className="vehicle-card">
        <img src={vehicle.icon} />
        <div className="vehicle-vitals">
          <a href="#" className="med-button choose-bid-button" onClick={clickChooseBid}>Order</a>
          <h2>{vehicle.model}</h2>
          <div className="rating">Rating <strong>{vehicle.rating}</strong></div>
        </div>
      </div>
      <dl className="bid-details">
        <dt>Estimated pickup time:</dt>
        <dd>in {Math.ceil(bid.pickup)} minutes</dd>
        <dt>Estimated delivery time:</dt>
        <dd>{Math.ceil(bid.dropoff)} minutes</dd>
        <dt>Cost for delivery:</dt>
        <dd>{bid.bid} <img src={currencyImage} className="currency-symbol" alt="DAV"/></dd>
      </dl>
    </div>
  );
};

VehicleBid.propTypes = {
  bid: PropTypes.object.isRequired,
  vehicle: PropTypes.object.isRequired,
  shown: PropTypes.bool.isRequired,
  chooseBid: PropTypes.func.isRequired,
};

export default VehicleBid;
