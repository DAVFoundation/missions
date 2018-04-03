import React, {Component} from 'react';
import './MissionScreen.css';
import gpsPointIcon from '../images/gps_point.svg';
import timeIcon from '../images/time.svg';
import currencyImage from '../images/dav.svg';
import PropTypes from 'prop-types';
import Link from '../containers/LinkContainer.jsx';
import {humanReadableVehicleStatus} from '../lib/utils';

class MissionScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.missionComplete) {
      return (
        <div className="mission-info">
          <div className="mission-info-summary">
            <h1>Delivery completed successfully</h1>
            <p>Cost for delivery:</p>
            <h1>{(this.props.price/1000000000000000000).toFixed(2)} <img src={currencyImage} className="currency-symbol" alt="DAV"/></h1>
            <Link to="/" className="big-button close">Confirm</Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className="mission-info">
          <div className="mission-info-container">
            <div className="mission-info-icon">
              <img src={gpsPointIcon} alt="GPS Point Icon"/>
            </div>
            <div className="mission-info-text">
              <p>Current State:</p>
              <h3>{humanReadableVehicleStatus[this.props.vehicleStatus]}</h3>
            </div>
          </div>
          <div className="mission-info-container">
            <div className="mission-info-icon">
              <img src={timeIcon} alt="Time Icon"/>
            </div>
            <div className="mission-info-text">
              <p>Estimated time to {this.props.leg} location:</p>
              <h3>{parseFloat(this.props.timeLeftInLeg) > 1 ? `${this.props.timeLeftInLeg} minutes` : 'less than a minute'}</h3>
            </div>
          </div>
        </div>
      );
    }
  }
}

MissionScreen.propTypes = {
  vehicleStatus: PropTypes.string,
  missionComplete: PropTypes.bool.isRequired,
  leg: PropTypes.string,
  timeLeftInLeg: PropTypes.number,
  price: PropTypes.number
};

export default MissionScreen;
