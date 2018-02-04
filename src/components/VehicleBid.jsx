import React from 'react';
import PropTypes from 'prop-types';
import VehicleCard from './VehicleCard.jsx';
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
      <VehicleCard icon={vehicle.icon} buttonClass={'choose-bid-button'} buttonOnClick={clickChooseBid} buttonText="Order" model={vehicle.model} />
      <dl className="bid-details">
        <dt>Estimated pickup time:</dt>
        <dd>in {Math.ceil(bid.time_to_pickup/60000)} minutes</dd>
        <dt>Estimated delivery time:</dt>
        <dd>{Math.ceil(bid.time_to_dropoff/60000)} minutes</dd>
        <dt>Cost for delivery:</dt>
        <dd>{parseFloat(bid.price).toFixed(2)} <img src={currencyImage} className="currency-symbol" alt="DAV"/></dd>
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
