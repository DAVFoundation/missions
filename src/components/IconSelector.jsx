import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './IconSelector.css';

class IconSelector extends Component {
  render() {
    return (
      <div className="IconSelector">
        {this.props.options.map((option, index) => {
          return (
            <div
              key={'option_' + index}
              className={
                option.id === this.props.selectedOption
                  ? 'option selected'
                  : 'option'
              }
              onClick={() => this.props.onSelect(option.id)}
            >
              <img
                src={option.icon}
                alt={option.id}
                className={
                  option.id === this.props.selectedOption ? 'svgSelected' : ''
                }
              />
            </div>
          );
        })}
      </div>
    );
  }
}

IconSelector.propTypes = {
  options: PropTypes.array.isRequired,
  selectedOption: PropTypes.string,
  onSelect: PropTypes.func.isRequired
};

export default IconSelector;
