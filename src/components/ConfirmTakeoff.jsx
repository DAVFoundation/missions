import React, {Component} from 'react';
import './ConfirmTakeoff.css';
import PropTypes from 'prop-types';


class ConfirmTakeoff extends Component {

  constructor () {
    super();
    this.state = {
      alertHidden: true
    };
  }

  toggleAlert () {
    this.setState({
      alertHidden: !this.state.alertHidden
    });
  }

  render() {
    return (this.state.alertHidden && (<div id="confirm-takeoff-screen" className="screen">
      <div className="screen-background--dark"/>
      <div className="modal-container">
        <div className="modal-box confirm-takeoff">
          <h1>Ready for Pickup</h1>
          <p>Drone has arrived at <br/><b>{this.props.coords.lat}, {this.props.coords.long}</b></p>
          <p>
            <i>Please load the package into the yellow compartment on the bottom of the drone,
              close the door with the latch until you hear a click.</i>
          </p>
          <button onClick={this.toggleAlert.bind(this)} className="big-button with-subtext">
            TAKE OFF<br/>
            <span className="button-subtext">PACKAGE LOADED AND SECURE</span>
          </button>
        </div>
      </div>
    </div>))
      || !this.state.alertHidden && (<div id="confirm-takeoff-screen" className="screen">
        <div className="screen-background--dark"/>
        <div className="modal-container">
          <div className="modal-box alert-box confirm-takeoff">
            <h1>Drone will take off immediately</h1>
            <p>Are you sure the package is secure and the area around the drone is clear?</p>
            <div className="alert-button-container">
              <button onClick={this.toggleAlert.bind(this)} className="alert-button-cancel">
                CANCEL
              </button>
              <button onClick={this.props.confirmTakeoff} className="alert-button-confirm">
                CONFIRM
              </button>
            </div>
          </div>
        </div>
      </div>);
  }
}

ConfirmTakeoff.propTypes = {
  confirmTakeoff: PropTypes.func.isRequired,
  coords: PropTypes.object.isRequired
};


export default ConfirmTakeoff;
