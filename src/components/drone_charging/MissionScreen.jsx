import React, {Component} from 'react';
import '../MissionScreen.css';
import '../ConfirmTakeoff.css';
import timeIcon from '../../images/time.svg';
import currencyImage from '../../images/dav.svg';
import droneWaiting from '../../images/charging_drone_waiting.png';
import stationWaiting from '../../images/icon_charging_station.png';
import chargingIcon from '../../images/charging_icon.png';
import {humanReadableVehicleStatus} from '../../lib/utils';
import PropTypes from 'prop-types';

class MissionScreen extends Component {

  constructor(props) {
    super(props);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if(nextProps.missionStatus === 'completed') {
      this.props.history.push(this.props.appPath);
    }
  }

  approveCompletedMission() {
    this.props.approveCompletedMission();
  }

  render() {
    if (this.props.vehicleStatus === 'ready') {
      return (
        <div className="mission-info">
          <div className="mission-info-summary">
            <h1>Charging completed successfully</h1>
            <p>Cost for charging:</p>
            <h1>{(this.props.price / 1000000000000000000).toFixed(2)}
              <img src={currencyImage} className="currency-symbol" alt="DAV"/>
            </h1>
            <button onClick={this.approveCompletedMission.bind(this)} className="big-button close">
              CONFIRM
            </button>
          </div>
        </div>
      );
    } else if (this.props.vehicleStatus === 'docking_confirmation_received') {
      return (
        <div id="confirm-takeoff-screen" className="screen">
          <div className="screen-background--dark"/>
          <div className="modal-container">
            <div className="modal-box confirm-takeoff">
              <h1>Charging in progress</h1>
              <p>Whenever you would like to end charging, press the ‘Stop Charging’ button</p>
              <p>
                <img src={chargingIcon} alt="charging icon"/>
              </p>
              <button onClick={this.props.completeChargingMission} className="big-button">
                STOP CHARGING
              </button>
            </div>
          </div>
        </div>);
    } else if (this.props.vehicleStatus === 'charger_waiting') {
      return (
        <div id="confirm-takeoff-screen" className="screen">
          <div className="screen-background--dark"/>
          <div className="modal-container">
            <div className="modal-box confirm-takeoff">
              <h1>Waiting for your drone</h1>
              <p>Once your drone has arrived and docked at the charging station, press the ‘Start Charging’ button</p>
              <p>
                <img src={droneWaiting} alt="Waiting for drone icon"/>
              </p>
              <button onClick={this.props.confirmDroneDocking} className="big-button with-subtext">
                START CHARGING<br/>
                <span className="button-subtext">DRONE AT CHARGING STATION</span>
              </button>
            </div>
          </div>
        </div>
      );
    } else if (this.props.vehicleStatus === 'in_progress') {
      return (
        <div id="confirm-takeoff-screen" className="screen">
          <div className="screen-background--dark"/>
          <div className="modal-container">
            <div className="modal-box confirm-takeoff">
              <h1>Awaiting Station Availabilty</h1>
              <p>The charging station is now preparing for your drone’s arrival.
                  You will be notified when it is ready</p>
              <p>
                <img src={stationWaiting} alt="Waiting for station icon"/>
              </p>
              <progress/>
            </div>
          </div>
        </div>
      );
    } else {
      return ( // TODO:  fix in_mission case and use captainstateinsted of mission
        <div className="mission-info">
          <div className="mission-info-container">
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
              <p>Estimated time:</p>
              <h3>{parseFloat(this.props.timeLeft) > 1 ? `${this.props.timeLeft} minutes` : 'less than a minute'}</h3>
            </div>
          </div>
        </div>
      );
    }
  }
}

MissionScreen.propTypes = {
  history: PropTypes.object.isRequired,
  appPath: PropTypes.string,
  missionComplete: PropTypes.bool.isRequired,
  missionStatus: PropTypes.string.isRequired,
  vehicleStatus: PropTypes.string,
  timeLeft: PropTypes.number,
  price: PropTypes.number,
  approveCompletedMission: PropTypes.func.isRequired,
  confirmDroneDocking: PropTypes.func.isRequired,
  completeChargingMission: PropTypes.func.isRequired,
};

export default MissionScreen;
