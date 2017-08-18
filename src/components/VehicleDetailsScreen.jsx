import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import VehicleDetailsContainer from '../containers/VehicleDetailsContainer.jsx';

const VehicleDetailsScreen = ({match}) => {
  return (
    <div id="vehicle-details-screen" className="screen">
      <Link to="/" className="screen-background--dark" />
      <div className="modal-container">
        <div className="modal-box">
          <Link to="/">x</Link>
          <VehicleDetailsContainer vehicleUid={match.params.uid} />
        </div>
      </div>
    </div>
  );
};

VehicleDetailsScreen.propTypes = {
  match: PropTypes.object.isRequired,
};

export default VehicleDetailsScreen;
