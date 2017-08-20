import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './OrderScreen.css';
import arrow from '../images/arrow-left.svg';

class OrderScreen extends Component {
  render() {
    return (
      <div id="order-screen" className="screen">
        <Link to="/" className="back-button">
          <img src={arrow} alt="Back" />
        </Link>

        <h1>Order Pickup</h1>

        <div className="form-field">
          <label htmlFor="pickup-location">Set pickup location</label>
          <input type="text" id="pickup-location"/>
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

export default OrderScreen;
