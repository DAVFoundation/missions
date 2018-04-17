import React, {Component} from 'react';
import '../MissionScreen.css';
import currencyImage from '../../images/dav.svg';
import PropTypes from 'prop-types';

class MissionScreen extends Component {

  constructor(props) {
    super(props);
  }

  approveCompletedMission() {
    this.props.history.push(this.props.appPath+'/');
  }

  render() {
    if (this.props.missionComplete) {
      return (
        <div className="mission-info">
          <div className="mission-info-summary">
            <h1>Charging completed successfully</h1>
            <p>Cost for delivery:</p>
            <h1>{(this.props.price/1000000000000000000).toFixed(2)} <img src={currencyImage} className="currency-symbol" alt="DAV"/></h1>
            <button onClick={this.approveCompletedMission.bind(this)} className="big-button close" >
              Close
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div id="confirm-takeoff-screen" className="screen">
          <div className="screen-background--dark"/>
          <div className="modal-container">
            <div className="modal-box confirm-takeoff">
              <h1>Waiting for your drone</h1>
              <p>Drone has arrived at</p>
              <p>
                <i>Once your drone has arrived and docked at the charging station, press the ‘Start Charging’ button</i>
              </p>
              <button className="big-button with-subtext">
                START CHARGING<br/>
                <span className="button-subtext">DRONE IS DOCKED AT THE CHARGING STATION</span>
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
  vehicleStatus: PropTypes.string,
  missionComplete: PropTypes.bool.isRequired,
  leg: PropTypes.string,
  timeLeftInLeg: PropTypes.number,
  price: PropTypes.number,
  approveCompletedMission: PropTypes.func.isRequired,
};

export default MissionScreen;
