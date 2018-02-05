import React, { Component } from 'react';
import store from '../store';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class LinkContainer extends Component {
  render() {
    return <Link to={store.getState().app.path+this.props.to} className={this.props.className} onClick={this.props.onClick}>
      {this.props.children}
    </Link>;
  }
}

LinkContainer.propTypes = {
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default LinkContainer;
