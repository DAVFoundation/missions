import React from 'react';
import PropTypes from 'prop-types';
import MapItemCard from '../MapItemCard.jsx';
import currencyImage from '../../images/dav.svg';

const ChargingStationBid = ({bid, charger, shown, chooseBid}) => {
  const clickChooseBid = (e) => {
    e.preventDefault();
    chooseBid(bid.id, bid.captain_id, bid.price);
  };

  let classNames = ['vehicle-bid-card'];
  if (!shown) {
    classNames.push('vehicle-bid-card--hidden');
  }
  return (
    <div className={classNames.join(' ')}>
      <MapItemCard icon={charger.icon} buttonClass={'choose-bid-button'} buttonOnClick={clickChooseBid} buttonText="GO" model={charger.model} id={charger.id} />
      <dl className="bid-details">
        <dt>Distance from station:</dt>
        <dd>{bid.distance} km</dd>
        <dt>Max charging velocity</dt>
        <dd>{charger.max_charging_velocity} Ah</dd>
        <dt>Cost for charging:</dt>
        <dd>{parseFloat(bid.price/1000000000000000000).toFixed(2)}<img src={currencyImage} className="currency-symbol" alt="DAV"/></dd>
      </dl>
    </div>
  );
};

ChargingStationBid.propTypes = {
  bid: PropTypes.object.isRequired,
  charger: PropTypes.object.isRequired,
  shown: PropTypes.bool.isRequired,
  chooseBid: PropTypes.func.isRequired,
};

export default ChargingStationBid;
