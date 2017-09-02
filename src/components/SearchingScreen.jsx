import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import VehicleBid from './VehicleBid.jsx';
import './SearchingScreen.css';
import radar from '../images/radar.png';

class SearchingScreen extends Component {
  render() {
    const { bids, vehicles, cancelSearch } = this.props;
    return (
      <div id="searching-screen" className="screen">
        <h1>Matching you with autonomous vehicles</h1>
        <Link to="/" className="med-button cancel-button" onClick={cancelSearch}>cancel</Link>
        <img src={radar} id="radar" />
        <div id="vehicle-bid-cards">
          {bids.map(bid => (
            <VehicleBid key={bid.id} vehicle={vehicles[bid.vehicle_id]} />
          ))}
        </div>
      </div>
    );
  }
}

SearchingScreen.propTypes = {
  vehicles: PropTypes.object.isRequired,
  bids: PropTypes.array.isRequired,
  cancelSearch: PropTypes.func.isRequired,
};

export default SearchingScreen;
