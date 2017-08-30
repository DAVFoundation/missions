import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getShortCoordsString } from '../lib/utils';
import './OrderScreen.css';
import arrow from '../images/arrow-left.svg';

class OrderScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {coords} = this.props;
    const coordsString = getShortCoordsString(coords);
    const pickupPlaceholder = coordsString ? `${coordsString} (your current location)` : '';
    return (
      <div id="order-screen" className="screen">
        <Link to="/" className="back-button">
          <img src={arrow} alt="Back" />
        </Link>

        <h1>Order Pickup</h1>

        <div className="form-field">
          <label htmlFor="pickup-location">Set pickup location</label>
          <input type="text" id="pickup-location" placeholder={pickupPlaceholder} />
        </div>

        <div className="form-field">
          <label htmlFor="dropoff-location">Set dropoff location</label>
          <input type="text" id="dropoff-location"/>
        </div>

        <div className="form-field">
          <label htmlFor="package-size">How big is the package?</label>
          <input type="text" id="package-size"/>
        </div>

        <div className="form-field">
          <label htmlFor="weight">Weight</label>
          <input type="text" id="weight"/>
        </div>

        <div className="form-field">
          <label htmlFor="pickup-time">Pickup time</label>
          <input type="text" id="pickup-time"/>
        </div>

        <Link to="/" className="big-button form-submit-button">Find drones</Link>

      </div>
    );
  }
}

OrderScreen.propTypes = {
  coords: PropTypes.object,
};

export default OrderScreen;
