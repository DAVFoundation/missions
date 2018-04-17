import React, {Component} from 'react';
import '../MissionScreen.css';
import '../ConfirmTakeoff.css';
import currencyImage from '../../images/dav.svg';
import PropTypes from 'prop-types';

class MissionScreen extends Component {

  constructor(props) {
    super(props);
  }

  approveCompletedMission() {
    this.props.history.push(this.props.appPath + '/');
  }

  render() {
    if (this.props.missionComplete) {
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
    } else if (this.props.missionStatus === 'docking_confirmation_received') {
      return (
        <div id="confirm-takeoff-screen" className="screen">
          <div className="screen-background--dark"/>
          <div className="modal-container">
            <div className="modal-box confirm-takeoff">
              <h1>Charging in progress</h1>
              <p>Whenever you would like to end charging, press the ‘Stop Charging’ button</p>
              <p>
                <i></i>
              </p>
              <button onClick={this.props.completeChargingMission} className="big-button">
                STOP CHARGING
              </button>
            </div>
          </div>
        </div>);
    } else if (this.props.missionStatus === 'charger_waiting') {
      return (
        <div id="confirm-takeoff-screen" className="screen">
          <div className="screen-background--dark"/>
          <div className="modal-container">
            <div className="modal-box confirm-takeoff">
              <h1>Waiting for your drone</h1>
              <p>Once your drone has arrived and docked at the charging station, press the ‘Start Charging’ button</p>
              <p>
                <i></i>
              </p>
              <button onClick={this.props.confirmDroneDocking} className="big-button with-subtext">
                START CHARGING<br/>
                <span className="button-subtext">DRONE AT CHARGING STATION</span>
              </button>
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
  price: PropTypes.number,
  approveCompletedMission: PropTypes.func.isRequired,
  confirmDroneDocking: PropTypes.func.isRequired,
  completeChargingMission: PropTypes.func.isRequired,
};

export default MissionScreen;
