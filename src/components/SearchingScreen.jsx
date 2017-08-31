import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './SearchingScreen.css';
import radar from '../images/radar.png';

class SearchingScreen extends Component {
  render() {
    const { bids } = this.props;
    return (
      <div id="searching-screen" className="screen">
        <h1>Matching you with autonomous vehicles</h1>
        <Link to="/" className="med-button cancel-button">cancel</Link>
        <img src={radar} id="radar" />
        {bids.map(bid => (
          <div key={bid.id}>{bid.id}</div>
        ))}
      </div>
    );
  }
}

SearchingScreen.propTypes = {
  vehicles: PropTypes.array.isRequired,
  bids: PropTypes.array.isRequired,
};

export default SearchingScreen;
