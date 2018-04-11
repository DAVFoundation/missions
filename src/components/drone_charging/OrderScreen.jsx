import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from '../../containers/LinkContainer.jsx';
import '../OrderScreen.css';
import arrow from '../../images/arrow-left.svg';
import Geosuggest from 'react-geosuggest';
import x_button from '../../images/x_button.svg';

class OrderScreen extends Component {
  constructor(props) {
    super(props);
    this.updateStoreFromForm = this.updateStoreFromForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
    this.createOrderDetailsObject = this.createOrderDetailsObject.bind(this);

    this.state = {};
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
    const { droneLocation } = this.state;
    return {
      droneLocation: droneLocation ?
        { address: droneLocation.description, lat: 47.397669, long: 8.5444809 } : undefined,
      droneType: this.droneTypeNode.value || undefined,
      currentCharge: this.currentChargeNode.value || undefined,
      chargingVelocity: this.chargingVelocityNode.value || undefined,
      searchRadius: this.searchRadiusNode.value || undefined
    };
  }

  updateStoreFromForm(detailOverride = {}) {
    const details = this.createOrderDetailsObject();
    this.props.updateOrderDetails({ ...details, ...detailOverride });
  }

  cancelForm() {
    this.updateStoreFromForm({ stage: 'draft', droneLocation: null, currentCharge: null });
  }

  submitForm() {
    this.updateStoreFromForm({ stage: 'searching', registration_step: 'registered' });
    let needDetails = this.createOrderDetailsObject();
    this.props.createNeed(needDetails);
    this.props.history.push(this.props.appPath+'/searching');
  }

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
        <h1>Find Charging Station</h1>
        <div className="form-field">
          <label htmlFor="drone-location">Current Drone Location</label>
          <Geosuggest
            type="text"
            id="drone-location"
            ignoreTab={true}
            placeholder="Type the address of the drone"
            onChange={
              () => this.setState({ droneLocation: undefined })
            }
            onSuggestSelect={
              geo => {
                if (geo) {
                  this.setState({ droneLocation: geo });
                }
              }
            }
          />
        </div>

        <div className="form-field">
          <label htmlFor="search-radius">Search radius</label>
          <input
            id="search-radius"
            type="number"
            defaultValue="1.5"
            ref={node => {
              this.searchRadiusNode = node;
            }}
          />km
        </div>

        <div className="form-field">
          <label htmlFor="drone-type">Drone Type</label>
          <select
            id="drone-type"
            defaultValue='dji'
            ref={node => {
              this.droneTypeNode = node;
            }}
          >
            <option value="dji">DJI Phantom</option>
            <option value="not-dji">Not DJI Phantom</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="current-charge">Current Charge Level</label>
          <input
            id="current-charge"
            type="number"
            defaultValue="0"
            ref={node => {
              this.currentChargeNode = node;
            }}
            style={{maxWidth: '15%'}}
          />%
        </div>
        <div className="form-field">
          <label htmlFor="charging-velocity">Required Charging Velocity</label>
          <select
            id="charging-velocity"
            defaultValue='15'
            ref={node => {
              this.chargingVelocityNode = node;
            }}
          >
            <option value="15">15Ah</option>
            <option value="30">30Ah</option>
          </select>
        </div>
        <button onClick={this.verifyIdentity.bind(this)} className={(this.state.droneLocation !== undefined && this.state.droneLocation.location !== undefined) ? 'big-button form-submit-button': 'disabled-button form-submit-button'} >
          Find Stations
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
  registration_step: PropTypes.string.isRequired,
  updateOrderDetails: PropTypes.func.isRequired,
  createNeed: PropTypes.func.isRequired,
  onMount: PropTypes.func.isRequired,
  verifyIdentity: PropTypes.func.isRequired,
  registerIdentity: PropTypes.func.isRequired,
  closeWalletDialog: PropTypes.func.isRequired,
};

export default OrderScreen;
