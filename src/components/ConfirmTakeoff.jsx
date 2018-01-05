import React, {Component} from 'react';
import './ConfirmTakeoff.css';
// import PropTypes from 'prop-types';

class ConfirmTakeoff extends Component {

  render() {
    return (
      <div id="confirm-takeoff-screen" className="screen">
        <div className="screen-background--dark"/>
        <div className="modal-container">
          <div className="modal-box confirm-takeoff">
            <h1>Ready for Pickup</h1>
            <p>Drone has arrived at <br/><b>6.497836.49783, 3.3830303</b></p>
            <p>
              <i>Please load the package into the yellow compartment on the bottom of the drone,
                close the door with the latch until you hear a click.</i>
            </p>
            <button className="big-button with-subtext">
              TAKE OFF<br/>
              <span className="button-subtext">PACKAGE LOADED AND SECURE</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmTakeoff;