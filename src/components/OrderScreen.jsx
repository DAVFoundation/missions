import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from '../containers/LinkContainer.jsx';
import './OrderScreen.css';
import arrow from '../images/arrow-left.svg';
import IconSelector from './IconSelector.jsx';
import getConfig from '../config';
import { packageSizeOptions } from '../lib/utils';
import Geosuggest from 'react-geosuggest';
import x_button from '../images/x_button.svg';

class OrderScreen extends Component {
  constructor(props) {
    super(props);
    this.updateStoreFromForm = this.updateStoreFromForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
    this.createOrderDetailsObject = this.createOrderDetailsObject.bind(this);

    this.state = {
      packageSize: getConfig('default_package_size'),
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

  componentWillReceiveProps(nextProps) {
    if(nextProps.registration_step === 'register_fulfilled') {
      this.submitForm();
    }
  }

  createOrderDetailsObject() {
    const { pickup, dropoff, packageSize } = this.state;
    return {
      pickup: pickup ?
        { address: pickup.description, lat: 47.397669, long: 8.5444809 } : undefined,
      dropoff: dropoff ?
        { lat: 47.3982004, long: 8.5448531 } : undefined,
      size: packageSize || undefined,
      weight: this.weightNode.value || undefined,
      pickup_at: this.pickupTimeNode.value || undefined,
      need_type: 'drone_delivery'
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
    this.updateStoreFromForm({ stage: 'searching', registration_step: 'registered' });
    let needDetails = this.createOrderDetailsObject();
    this.props.createNeed(needDetails);
    this.props.history.push(this.props.appPath+'/searching');
  }

  selectPackageSize(size) {
    this.setState({
      packageSize: this.state.packageSize !== size ? size : undefined
    });
  }

  getSizeContainer() { }

  dismissDialog() {
    this.props.closeWalletDialog();
  }

  verifyIdentity() {
    this.props.verifyIdentity();
  }

  registerIdentity() {
    this.props.registerIdentity();
  }

  render() {
    const { weight } = this.props; // size
    const pickup_at =
      this.props.pickup_at || new Date().toTimeString().slice(0, 5);
    let showSignInToWalletDialog = this.props.registration_step === 'unlock_wallet';
    const signInToWalletDialog = (
      <div id="wallet-dialog-screen" className="screen">
        <div className="screen-background--dark"/>
        <div className="modal-container">
          <div className="modal-box wallet-dialog">
            <h1>Please Sign in To A Wallet</h1>
            <p>It seems that you are not signed in to<br/>
            an existing wallet in your browser.<br/>
            Please sign in, or create a new wallet.</p>
            <button onClick={this.dismissDialog.bind(this)} className="big-button">
              OK
            </button>
          </div>
        </div>
      </div>);

    let showRegisterDavIdDialog = this.props.registration_step === 'register_id';
    const registerDavIdDialog = (
      <div id="wallet-dialog-screen" className="screen">
        <div className="screen-background--dark"/>
        <div className="modal-container">
          <div className="modal-box wallet-dialog">
            <div
              onClick={this.dismissDialog.bind(this)}
              className="sort-options__close-button">
              <img src={x_button} alt="close button" />
            </div>
            <h1>Missing DAV ID</h1>
            <p>This wallet is not connected to a DAV ID</p>
            <button onClick={this.registerIdentity.bind(this)} className="big-button">
              CREATE DAV ID
            </button>
            <span>
              Note: This is an Ethereum transaction that will<br/>
              cost you some Gas
            </span>
          </div>
        </div>
      </div>);

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
            ignoreTab={true}
            placeholder="Type the address of the pickup location"
            onChange={
              () => this.setState({ pickup: undefined })
            }
            onSuggestSelect={
              geo => {
                if (geo) {
                  this.setState({ pickup: geo });
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
            ignoreTab={true}
            placeholder="Type the address of the dropoff location"
            onChange={
              () => this.setState({ dropoff: undefined })
            }
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
        <button onClick={this.verifyIdentity.bind(this)} className={(this.state.pickup !== undefined && this.state.pickup.location !== undefined && this.state.dropoff !== undefined) ? 'big-button form-submit-button': 'disabled-button form-submit-button'} >
          Find drones
        </button>
        { showSignInToWalletDialog === false ? (<div/>) : signInToWalletDialog }
        { showRegisterDavIdDialog === false ? (<div/>) : registerDavIdDialog}
      </div>
    );
  }
}

OrderScreen.propTypes = {
  history: PropTypes.object.isRequired,
  appPath: PropTypes.string,
  userCoords: PropTypes.object,
  defaultDropoff: PropTypes.object,
  pickup: PropTypes.object,
  dropoff: PropTypes.object,
  pickup_at: PropTypes.string,
  size: PropTypes.string,
  weight: PropTypes.string,
  registration_step: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  updateOrderDetails: PropTypes.func.isRequired,
  createNeed: PropTypes.func.isRequired,
  onMount: PropTypes.func.isRequired,
  verifyIdentity: PropTypes.func.isRequired,
  registerIdentity: PropTypes.func.isRequired,
  closeWalletDialog: PropTypes.func.isRequired,
};

export default OrderScreen;
