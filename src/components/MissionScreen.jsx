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
    this.state = {
      missionComplete: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.vehicleStatus === 'available' && this.state === false) {
      this.setState({
        missionComplete: true
      });
    }
  }

  render() {
    return (
      !this.state.missionComplete && (<div className="mission-info">
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
            <h3>{this.props.timeLeftInLeg} {this.props.timeLeftInLeg == '1' ? 'minute': 'minutes'}</h3>
          </div>
        </div>
      </div>) ||
      this.state.missionComplete && (<div className="mission-info">
        <div className="mission-info-summary">
          <h1>Delivery completed successfully</h1>
          <p>Cost for delivery:</p>
          <h1>20 <img src={currencyImage} className="currency-symbol" alt="DAV"/></h1>
          <Link to="/" className="big-button close">Close</Link>
        </div>
      </div>)
    );
  }


}

MissionScreen.propTypes = {
  vehicleStatus: PropTypes.string,
  leg: PropTypes.string,
  timeLeftInLeg: PropTypes.string
};


export default MissionScreen;
