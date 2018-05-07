import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from '../../containers/LinkContainer.jsx';
import './OrderScreen.css';
import arrow from '../../images/arrow-left.svg';
import x_button from '../../images/x_button.svg';
import { getUserLocation } from '../../lib/map';

class OrderScreen extends Component {
  constructor(props) {
    super(props);
    this.updateStoreFromForm = this.updateStoreFromForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
    this.createOrderDetailsObject = this.createOrderDetailsObject.bind(this);

    this.state = {
      startCoordinates: '',
      endCoordinates: '',
    };
  }

  componentDidMount() {
    this.props.onMount();
    getUserLocation().then((res) => {
      this.setState({
        startCoordinates: `${res.coords.latitude}, ${res.coords.longitude}`,
        endCoordinates: `${res.coords.latitude - 0.03}, ${res.coords.longitude + 0.05}`  
      });
    }).catch((res) => {
      console.log(res);
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.registration_step === 'register_fulfilled') {
      this.submitForm();
    }
  }

  createOrderDetailsObject() {
    const [ startLat, startLong ] = this.parseCoordinates(this.state.startCoordinates);
    const [ endLat, endLong ] = this.parseCoordinates(this.state.endCoordinates);
    return {
      startPosition: {
        lat: startLat,
        long: startLong
      },
      endPosition: {
        lat: endLat,
        long: endLong
      },
      flightHeight: this.flightHeight.value || 400,
      heightUnits: this.heightUnits.value || 'meters',
      need_type: this.props.needType
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

  parseCoordinates(value) {
    let coordinates = [];
    if(value) {
      let parts = value.split(',');
      if(parts.length === 2) {
        for(let part of parts) {
          if(/^(-?[\d.]+)$/.test(part.trim()) === true) {
            coordinates.push(parseFloat(part));
          } else {
            throw('Failed to parse coordinate');
          }
        }
      } else {
        throw('Coordinates have to come in pairs');
      }
    } else {
      throw('Coordinates cannot be null');
    }
    return coordinates;
  }

  areValidCoordinates(value) {
    try {
      this.parseCoordinates(value);
      return true;
    } catch(err){
      return false;
    }
  }

  isValidForm() {
    // console.log(this.state.startCoordinates);
    return this.areValidCoordinates(this.state.startCoordinates) && this.areValidCoordinates(this.state.endCoordinates);
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
        <h1>Order Route Plan</h1>
        <div id="order-screen-content">
          <div className="form-field">
            <label htmlFor="start-coordinates">&apos;Start&apos; coordinates</label>
            <input
              id="start-coordinates"
              type="text"
              placeholder="38.802610, -116.419389"
              value={ this.state.startCoordinates }
              onChange={
                (event) => this.setState({ startCoordinates: event.target.value })
              }
            />
          </div>

          <div className="form-field">
            <label htmlFor="end-coordinates">&apos;End&apos; coordinates</label>
            <input
              id="end-coordinates"
              type="text"
              placeholder="38.807643, -116.587960"
              value={ this.state.endCoordinates }
              onChange={
                (event) => this.setState({ endCoordinates: event.target.value })
              }
            />
          </div>

          <div className="form-field">
            <label htmlFor="flight-height">Max flight height</label>
            <input
              id="flight-height"
              type="number"
              defaultValue="400"
              ref={node => {
                this.flightHeight = node;
              }}
              style={{maxWidth: '30%', display: 'inline-block', marginRight: '10px'}}
            />
            <select
              id="height-units"
              defaultValue='meters'
              style={{maxWidth: '30%', display: 'inline-block', marginRight: '10px'}}
              ref={node => {
                this.heightUnits = node;
              }}
            >
              <option value="meters">Meters</option>
              <option value="feet">Feet</option>
            </select>
          </div>
        </div>
        <div id="bottom-button-container">
          <button onClick={this.verifyIdentity.bind(this)} className={ this.isValidForm() ? 'big-button form-submit-button': 'disabled-button form-submit-button'} >
            Find Routes
          </button>
        </div>
        { showSignInToWalletDialog === false ? (<div/>) : signInToWalletDialog }
        { showRegisterDavIdDialog === false ? (<div/>) : registerDavIdDialog}
      </div>
    );
  }
}

OrderScreen.propTypes = {
  history: PropTypes.object.isRequired,
  appPath: PropTypes.string,
  needType: PropTypes.string,
  registration_step: PropTypes.string.isRequired,
  updateOrderDetails: PropTypes.func.isRequired,
  createNeed: PropTypes.func.isRequired,
  onMount: PropTypes.func.isRequired,
  verifyIdentity: PropTypes.func.isRequired,
  registerIdentity: PropTypes.func.isRequired,
  closeWalletDialog: PropTypes.func.isRequired,
};

export default OrderScreen;
