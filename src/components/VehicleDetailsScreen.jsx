import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VehicleDetailsContainer from 'containers/VehicleDetailsContainer.jsx';

class VehicleDetailsScreen extends Component {

  constructor(props){
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack(){
    this.props.history.goBack();
  }

  render(){
    return (
      <div id="vehicle-details-screen" className="screen">
        <button onClick={this.goBack} className="screen-background--dark" />
        <div className="modal-container">
          <div className="modal-box">
            <button onClick={this.goBack} className="modal-close-button">x</button>
            <VehicleDetailsContainer vehicleUid={this.props.match.params.uid} />
          </div>
        </div>
      </div>
    );
  }
}

VehicleDetailsScreen.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default VehicleDetailsScreen;
