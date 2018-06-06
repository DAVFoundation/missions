import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Link from '../../containers/LinkContainer.jsx';
import arrow from '../../images/arrow-left.svg';
import Geosuggest from 'react-geosuggest';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import '../OrderScreen.css';
import x_button from '../../images/x-button.svg';


class OrderScreen extends Component {
  constructor(props) {
    super(props);
    this.updateStoreFromForm = this.updateStoreFromForm.bind(this);
    this.handleSearchRadiusChange = this.handleSearchRadiusChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
    this.createOrderDetailsObject = this.createOrderDetailsObject.bind(this);

    this.state = {
      searchRadiusValue: 2
    };
  }

  handleSearchRadiusChange(value) {
    this.setState({
      searchRadiusValue: value
    });
  }

  componentDidMount() {
    this.props.onMount();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.registration_step === 'register_fulfilled') {
      this.submitForm();
    }
  }

  createOrderDetailsObject() {
    const {droneLocation} = this.state;
    return {
      droneLocation: {
        address: droneLocation.description,
        lat: droneLocation.location.lat,
        long: droneLocation.location.lng
      },
      droneType: this.droneTypeNode.value || undefined,
      currentCharge: this.currentChargeNode.value || undefined,
      chargingVelocity: this.chargingVelocityNode.value || undefined,
      searchRadius: this.state.searchRadiusValue || undefined,
      need_type: this.props.needType
    };
  }

  updateStoreFromForm(detailOverride = {}) {
    const details = this.createOrderDetailsObject();
    this.props.updateOrderDetails({...details, ...detailOverride});
  }

  cancelForm() {
    this.updateStoreFromForm({stage: 'draft', droneLocation: null, currentCharge: null});
  }

  submitForm() {
    this.updateStoreFromForm({stage: 'searching', registration_step: 'registered'});
    let needDetails = this.createOrderDetailsObject();
    this.props.createNeed(needDetails);
    this.props.history.push(this.props.appPath + '/searching');
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
              <img src={x_button} alt="close button"/>
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
        <Link to="" className="back-button" onClick={this.cancelForm}>
          <img src={arrow} alt="Back"/>
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
              () => this.setState({droneLocation: undefined})
            }
            onSuggestSelect={
              geo => {
                if (geo) {
                  this.setState({droneLocation: geo});
                }
              }
            }
          />
        </div>

        <div className="form-field">
          <label htmlFor="search-radius">Search radius (km)</label>
          <Slider
            maxValue={20}
            minValue={0}
            value={this.state.searchRadiusValue}
            orientation='horizontal'
            onChange={this.handleSearchRadiusChange}
          />
        </div>

        <div className="form-field">
          <label htmlFor="drone-type">Drone Type</label>
          <select
            id="drone-type"
            defaultValue='mavic'
            ref={node => {
              this.droneTypeNode = node;
            }}
          >
            <option value="mavic">DJI Mavic Air</option>
            <option value="matrice">DJI Matrice 100</option>
            <option value="phantom">DJI Phantom 4</option>
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
            style={{maxWidth: '15%', display: 'inline-block', marginRight: '10px'}}
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
        <button onClick={this.verifyIdentity.bind(this)}
          className={(this.state.droneLocation !== undefined && this.state.droneLocation.location !== undefined) ? 'big-button form-submit-button' : 'disabled-button form-submit-button'}>
          Find Stations
        </button>
        {showSignInToWalletDialog === false ? (<div/>) : signInToWalletDialog}
        {showRegisterDavIdDialog === false ? (<div/>) : registerDavIdDialog}
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
