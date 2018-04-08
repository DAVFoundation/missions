import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from '../../containers/LinkContainer.jsx';
import '../MainScreen.css';
import logo from '../../images/logo_missions.svg';
import iconUser from '../../images/icon_signed_out.svg';


class MainScreen extends Component {
  componentDidMount() {
    this.props.onMount();
  }
  render() {
    return (
      <div id="main-screen" className="screen">
        <div id="header">
          <div id="logo">
            <img src={logo} alt="Missions powered by DAV" />
          </div>
          <span className="logo-subtext">4 charging stations available in viewable area</span>
          <span className="profile">
            <img src={iconUser} alt=""/>
          </span>
        </div>

        <div className="user-location">
          <h3>Your Location</h3>
          <p>1556 Broadway, suite 416</p>
        </div>
        <Link to="/order" className="big-button order-button">Find Charging Stations</Link>
      </div>
    );
  }
}

MainScreen.propTypes = {
  onMount: PropTypes.func.isRequired,
};


export default MainScreen;
