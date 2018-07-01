import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

const Modal = ({show, title, buttonText, onButtonClick, children}) => {
  return show ? (
    <div>
      <div className="curtain"></div>
      <div className="dav-modal">
        <div className="modal-content">
          <h3 className="title">{title}</h3>
          { children.map(child => child) }
        </div>
        <div className="button-container">
          <span className="med-button" onClick={ onButtonClick }>{ buttonText }</span>
        </div>
      </div>
    </div>
  ) : '';
};

Modal.propTypes = {
  show: PropTypes.bool,
  title: PropTypes.string,
  buttonText: PropTypes.string,
  onButtonClick: PropTypes.func,
  children: PropTypes.array
};

export default Modal;
