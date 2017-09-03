import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import VehicleBid from './VehicleBid.jsx';
import VehicleBidPreview from './VehicleBidPreview.jsx';
import './SearchingScreen.css';
import radar from '../images/radar.png';

class SearchingScreen extends Component {
  render() {
    const { bids, vehicles, stage, cancelSearch, chooseBid } = this.props;
    let screenClassNames = ['screen'];
    if (stage === 'choosing') screenClassNames.push('screen--stage-choosing');
    return (
      <div id="searching-screen" className={screenClassNames.join(' ')}>
        {stage === 'searching' && (
          <div>
            <h1>Matching you with autonomous vehicles</h1>
            <Link to="/" className="med-button cancel-button" onClick={cancelSearch}>cancel</Link>
            <img src={radar} id="radar" />
            <div id="vehicle-bid-preview-cards">
              {bids.map(bid => (
                <VehicleBidPreview key={bid.id} vehicle={vehicles[bid.vehicle_id]} />
              ))}
            </div>
          </div>
        )}
        <div id="vehicle-bid-cards">
          {bids.map(bid => (
            <VehicleBid key={bid.id} bid={bid} vehicle={vehicles[bid.vehicle_id]} shown={stage === 'choosing'} chooseBid={chooseBid} />
          ))}
        </div>
      </div>
    );
  }
}

SearchingScreen.propTypes = {
  vehicles: PropTypes.object.isRequired,
  bids: PropTypes.array.isRequired,
  stage: PropTypes.string.isRequired,
  cancelSearch: PropTypes.func.isRequired,
  chooseBid: PropTypes.func.isRequired,
};

export default SearchingScreen;
