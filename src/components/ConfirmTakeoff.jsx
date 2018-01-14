import React, {Component} from 'react';
import './ConfirmTakeoff.css';
import PropTypes from 'prop-types';


class ConfirmTakeoff extends Component {

  constructor () {
    super();
    this.state = {
      alertHidden: true,
      buttonsDisabled: false
    };
  }

  toggleAlert () {
    this.setState({
      alertHidden: !this.state.alertHidden
    });
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.status && (this.props.status === 'takeoff_confirmation_initiated')) {
      this.setState({
        buttonsDisabled: true
      });
    }

    if ((prevProps.status === 'takeoff_confirmation_initiated') && (this.props.status === 'takeoff_confirmation_received')){
      this.props.history.push('/mission');
    }
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
              <button onClick={this.toggleAlert.bind(this)} className="alert-button-cancel" disabled={this.state.buttonsDisabled}>
                CANCEL
              </button>
              <button onClick={this.props.confirmTakeoff} className="alert-button-confirm" disabled={this.state.buttonsDisabled}>
                CONFIRM
              </button>
            </div>
          </div>
        </div>
      </div>);
  }
}

ConfirmTakeoff.propTypes = {
  history: PropTypes.object.isRequired,
  coords: PropTypes.object.isRequired,
  status: PropTypes.string,
  confirmTakeoff: PropTypes.func.isRequired
};


export default ConfirmTakeoff;
