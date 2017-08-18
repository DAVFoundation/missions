import React from 'react';
import PropTypes from 'prop-types';
import VehicleDetailsContainer from '../containers/VehicleDetailsContainer.jsx';

const VehicleDetailsScreen = ({match}) => {
  return (
    <div id="vehicle-details-screen" className="screen">
      <VehicleDetailsContainer vehicleUid={match.params.uid} />
    </div>
  );
};

VehicleDetailsScreen.propTypes = {
  match: PropTypes.object.isRequired,
};

export default VehicleDetailsScreen;
