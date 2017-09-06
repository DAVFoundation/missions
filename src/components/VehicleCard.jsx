import React from 'react';
import PropTypes from 'prop-types';

const VehicleCard = ({ id, icon, model, rating, buttonText, buttonOnClick, buttonClass }) => {
  let buttonClasses = ['med-button'];
  if (buttonClass) buttonClasses.push(buttonClass);
  return (
    <div className="vehicle-card">
      <img src={icon} className="user-icon" />
      <div className="vehicle-vitals">
        {buttonText && buttonOnClick && (
          <a href="#" className={buttonClasses.join(' ')} onClick={buttonOnClick}>{buttonText}</a>
        )}
        <h2>{model}</h2>
        {id && <div className="dav-uid">{id}</div>}
        {rating && <div className="rating">Rating <strong>{rating}</strong></div>}
      </div>
    </div>
  );
};

VehicleCard.propTypes = {
  id: PropTypes.string,
  icon: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  rating: PropTypes.number,
  buttonText: PropTypes.string,
  buttonOnClick: PropTypes.func,
  buttonClass: PropTypes.string,
};

export default VehicleCard;
