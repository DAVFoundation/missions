import React from 'react';
import PropTypes from 'prop-types';
import MapItemCard from './MapItemCard.jsx';
import currencyImage from '../images/dav.svg';

const VehicleBid = ({bid, vehicle, shown, chooseBid}) => {
  const clickChooseBid = (e) => {
    e.preventDefault();
    chooseBid(bid.id, bid.vehicle_id, bid.price);
  };

  let classNames = ['vehicle-bid-card'];
  if (!shown) {
    classNames.push('vehicle-bid-card--hidden');
  }
  return (
    <div className={classNames.join(' ')}>
      <MapItemCard icon={vehicle.icon} buttonClass={'choose-bid-button'} buttonOnClick={clickChooseBid} buttonText="Order" model={vehicle.model} id={vehicle.id} />
      <dl className="bid-details">
        <dt>Estimated pickup time:</dt>
        <dd>in {Math.ceil(bid.time_to_pickup/60000)} minutes</dd>
        <dt>Estimated delivery time:</dt>
        <dd>{Math.ceil(bid.time_to_dropoff/60000)} minutes</dd>
        <dt>Cost for delivery:</dt>
        <dd>{parseFloat(bid.price/1000000000000000000).toFixed(2)}<img src={currencyImage} className="currency-symbol" alt="DAV"/></dd>
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
