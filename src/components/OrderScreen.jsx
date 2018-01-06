import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getShortCoordsString, coordsFromString } from '../lib/utils';
import './OrderScreen.css';
import arrow from 'images/arrow-left.svg';
import IconSelector from './IconSelector.jsx';
import getConfig from 'config';

// icons
import sizeLetter from 'images/size_letter.svg';
import sizeCan from 'images/size_can.svg';
import sizePizza from 'images/size_pizza.svg';
import sizeBox from 'images/size_box.svg';

class OrderScreen extends Component {
  constructor(props) {
    super(props);
    this.updateStoreFromForm = this.updateStoreFromForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.createOrderDetailsObject = this.createOrderDetailsObject.bind(this);

    this.state = {
      packageSize: getConfig('default_package_size')
    };

    // Options should be read from some kind of configuration
    // but putting it here for now
    this.packageSizeOptions = [
      { id: 'letter', icon: sizeLetter },
      { id: 'can', icon: sizeCan },
      { id: 'pizza', icon: sizePizza },
      { id: 'box', icon: sizeBox }
    ];

    // Reference to a method that toggles the currently selected
    // package size option on / off.
    this.selectPackageSize = this.selectPackageSize.bind(this);
  }

  componentDidMount() {
    this.props.onMount();
  }

  createOrderDetailsObject() {
    const { userCoords } = this.props;

    return {
      pickup: coordsFromString(this.pickupNode.value) || {
        lat: userCoords.lat,
        long: userCoords.long
      },
      dropoff: coordsFromString(this.dropoffNode.value),
      size: this.state.packageSize || undefined,
      weight: this.weightNode.value || undefined,
      requested_pickup_time: this.pickupTimeNode.value || undefined
    };
  }

  updateStoreFromForm(detailOverride = {}) {
    const details = this.createOrderDetailsObject();
    this.props.updateOrderDetails({ ...details, ...detailOverride });
  }

  submitForm() {
    this.updateStoreFromForm({ stage: 'searching' });
    let requestDetails = this.createOrderDetailsObject();
    this.props.createRequest(requestDetails);
  }

  selectPackageSize(size) {
    this.setState({
      packageSize: this.state.packageSize !== size ? size : undefined
    });
  }

  getSizeContainer() {}

  render() {
    const { userCoords, pickup, dropoff, weight } = this.props; // size
    const requested_pickup_time =
      this.props.requested_pickup_time || new Date().toTimeString().slice(0, 5);
    const userCoordsString = getShortCoordsString(userCoords);
    const pickupPlaceholder = userCoordsString
      ? `Your current location (${userCoordsString})`
      : '';
    const pickupCoordsString = getShortCoordsString(pickup);
    const dropoffCoordsString = getShortCoordsString(dropoff);
    return (
      <div id="order-screen" className="screen">
        <Link to="/" className="back-button" onClick={this.updateStoreFromForm}>
          <img src={arrow} alt="Back" />
        </Link>
        <h1>Order Pickup</h1>
        <div className="form-field">
          <label htmlFor="pickup-location">Set pickup location</label>
          <input
            type="text"
            id="pickup-location"
            placeholder={pickupPlaceholder}
            defaultValue={pickupCoordsString}
            ref={node => {
              this.pickupNode = node;
            }}
          />
        </div>
        <div className="form-field">
          <label htmlFor="dropoff-location">Set dropoff location</label>
          <input
            type="text"
            id="dropoff-location"
            defaultValue={dropoffCoordsString}
            ref={node => {
              this.dropoffNode = node;
            }}
          />
        </div>

        <div className="form-field">
          <label>How big is the package?</label>
          <IconSelector
            onSelect={this.selectPackageSize}
            selectedOption={this.state.packageSize}
            options={this.packageSizeOptions}
          />
        </div>

        <div className="form-field">
          <label htmlFor="weight">Weight</label>
          <select
            id="weight"
            defaultValue={weight}
            ref={node => {
              this.weightNode = node;
            }}
          >
            <option value="500">Up to 500 grams</option>
            <option value="1000">Up to 1 kg</option>
            <option value="5000">Up to 5 kg</option>
            <option value="100000">Up to 100 kg</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="pickup-time">Pickup time</label>
          <input
            id="pickup-time"
            type="time"
            defaultValue={requested_pickup_time}
            ref={node => {
              this.pickupTimeNode = node;
            }}
          />
        </div>
        <Link
          to="/searching"
          className="big-button form-submit-button"
          onClick={this.submitForm}
        >
          Find drones
        </Link>
      </div>
    );
  }
}

OrderScreen.propTypes = {
  userCoords: PropTypes.object,
  pickup: PropTypes.object,
  dropoff: PropTypes.object,
  requested_pickup_time: PropTypes.string,
  size: PropTypes.string,
  weight: PropTypes.string,
  updateOrderDetails: PropTypes.func.isRequired,
  createRequest: PropTypes.func.isRequired,
  onMount: PropTypes.func.isRequired
};

export default OrderScreen;
