import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from '../containers/LinkContainer.jsx';
import './MainScreen.css';
import logo from '../images/logo_missions.svg';

class MainScreen extends Component {
  componentDidMount() {
    this.props.onMount();
  }
  render() {
    return (
      <div id="main-screen" className="screen">
        <div id="logo">
          <img src={logo} alt="Missions powered by DAV" />
        </div>
        <Link to="/order" className="big-button order-button">Order Pickup</Link>
      </div>
    );
  }
}

MainScreen.propTypes = {
  onMount: PropTypes.func.isRequired,
};


export default MainScreen;
