import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MainScreen.css';
import logo from '../images/logo_missions.png';

class MainScreen extends Component {
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

export default MainScreen;
