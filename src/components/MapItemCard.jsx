import React from 'react';
import PropTypes from 'prop-types';

const MapItemCard = ({ id, icon, model, buttonText, buttonOnClick, buttonClass }) => {
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
      </div>
    </div>
  );
};

MapItemCard.propTypes = {
  id: PropTypes.string,
  icon: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  buttonOnClick: PropTypes.func,
  buttonClass: PropTypes.string,
};

export default MapItemCard;
