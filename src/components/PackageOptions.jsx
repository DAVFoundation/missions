import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PackageOptions.css';
import sizeLetter from '../images/size_letter.svg';
import sizeCan from '../images/size_can.svg';
import sizePizza from '../images/size_pizza.svg';
import sizeBox from '../images/size_box.svg';

class PackageOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [
        { id: 'letter', icon: sizeLetter },
        { id: 'can', icon: sizeCan },
        { id: 'pizza', icon: sizePizza },
        { id: 'box', icon: sizeBox }
      ]
    };
  }

  render() {
    return (
      <div className="packageOptions">
        {this.state.options.map((option, index) => {
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

PackageOptions.propTypes = {
  selectedOption: PropTypes.string,
  onSelect: PropTypes.func.isRequired
};

export default PackageOptions;
