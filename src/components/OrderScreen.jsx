import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from '../containers/LinkContainer.jsx';
import './OrderScreen.css';
import arrow from '../images/arrow-left.svg';
import IconSelector from './IconSelector.jsx';
import getConfig from '../config';
import { packageSizeOptions } from '../lib/utils';
import Geosuggest from 'react-geosuggest';

class OrderScreen extends Component {
  constructor(props) {
    super(props);
    this.updateStoreFromForm = this.updateStoreFromForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
    this.createOrderDetailsObject = this.createOrderDetailsObject.bind(this);

    this.state = {
      packageSize: getConfig('default_package_size')
    };

    // Options should be read from some kind of configuration
    // but putting it here for now
    this.packageSizeOptions = packageSizeOptions;

    // Reference to a method that toggles the currently selected
    // package size option on / off.
    this.selectPackageSize = this.selectPackageSize.bind(this);
  }

  componentDidMount() {
    this.props.onMount();
  }

  createOrderDetailsObject() {
    const { userCoords, defaultDropoff } = this.props;
    const { pickup, dropoff, packageSize } = this.state;
    return {
      pickup: pickup ?
        { address: pickup.description, lat: pickup.location.lat, long: pickup.location.lng } :
        { lat: userCoords.location.lat, long: userCoords.location.long },
      dropoff: dropoff ?
        { lat: dropoff.lat, long: dropoff.lng } :
        defaultDropoff,
      size: packageSize || undefined,
      weight: this.weightNode.value || undefined,
      pickup_at: this.pickupTimeNode.value || undefined
    };
  }

  updateStoreFromForm(detailOverride = {}) {
    const details = this.createOrderDetailsObject();
    this.props.updateOrderDetails({ ...details, ...detailOverride });
  }

  cancelForm() {
    this.updateStoreFromForm({ stage: 'draft', pickup: null, dropoff: null });
  }

  submitForm() {
    this.updateStoreFromForm({ stage: 'searching' });
    let needDetails = this.createOrderDetailsObject();
    this.props.createNeed(needDetails);
  }

  selectPackageSize(size) {
    this.setState({
      packageSize: this.state.packageSize !== size ? size : undefined
    });
  }

  getSizeContainer() { }

  render() {
    const { weight } = this.props; // size
    const pickup_at =
      this.props.pickup_at || new Date().toTimeString().slice(0, 5);
    return (
      <div id="order-screen" className="screen">
        <Link to="/" className="back-button" onClick={this.cancelForm}>
          <img src={arrow} alt="Back" />
        </Link>
        <h1>Order Pickup</h1>
        <div className="form-field">
          <label htmlFor="pickup-location">Set pickup location</label>
          <Geosuggest
            type="text"
            id="pickup-location"
            placeholder="Type the address of the pickup location"
            onSuggestSelect={
              geo => {
                if (geo) {
                  this.setState({ pickup: geo});
                }
              }
            }
          />
        </div>
        <div className="form-field">
          <label htmlFor="dropoff-location">Set dropoff location</label>
          <Geosuggest
            type="text"
            id="dropoff-location"
            placeholder="Type the address of the dropoff location"
            onSuggestSelect={
              geo => {
                if (geo) {
                  this.setState({ dropoff: geo.location });
                }
              }
            }
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
            defaultValue={pickup_at}
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
  defaultDropoff: PropTypes.object,
  pickup: PropTypes.object,
  dropoff: PropTypes.object,
  pickup_at: PropTypes.string,
  size: PropTypes.string,
  weight: PropTypes.string,
  updateOrderDetails: PropTypes.func.isRequired,
  createNeed: PropTypes.func.isRequired,
  onMount: PropTypes.func.isRequired
};

export default OrderScreen;
