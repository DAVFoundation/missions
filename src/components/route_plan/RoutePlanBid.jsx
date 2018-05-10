import React from 'react';
import PropTypes from 'prop-types';
import MapItemCard from '../MapItemCard.jsx';
import currencyImage from '../../images/dav.svg';

const ChargingStationBid = ({bid, routeProvider, shown, chooseBid}) => {
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
      <MapItemCard icon={routeProvider.icon} buttonClass={'choose-bid-button'} buttonOnClick={clickChooseBid} buttonText="ORDER" model={routeProvider.model} id={routeProvider.id} />
      <dl className="bid-details">
        <dt>ETA:</dt>
        <dd>{bid.ETA} hours</dd>
        <dt>Cost for route plan:</dt>
        <dd>{parseFloat(bid.price/1000000000000000000).toFixed(2)}<img src={currencyImage} className="currency-symbol" alt="DAV"/></dd>
      </dl>
    </div>
  );
};

ChargingStationBid.propTypes = {
  bid: PropTypes.object.isRequired,
  routeProvider: PropTypes.object.isRequired,
  shown: PropTypes.bool.isRequired,
  chooseBid: PropTypes.func.isRequired,
};

export default ChargingStationBid;
