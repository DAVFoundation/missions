import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Link from '../../containers/LinkContainer.jsx';
import '../MainScreen.css';
import iconUser from '../../images/icon_signed_out.svg';
import logoMissions from '../../images/logo_missions.svg';
import logoMooving from '../../images/logo_mooving.svg';

const logo = (domain => {
  switch (domain) {
  default:
  case 'missions':
    return logoMissions;
  case 'mooving':
    return logoMooving;
  }
})(process.env.DOMAIN);

class MainScreen extends Component {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    return (
      <div id="main-screen" className="screen">
        <div id="header">
          <div id="logo">
            <img src={logo} alt="Missions powered by DAV"/>
          </div>
          <span
            className="logo-subtext">{this.props.chargers.length} charging stations available in viewable area</span>
          <span className="profile">
            <img src={iconUser} alt=""/>
          </span>
        </div>

        <div className="user-location">
          <h3>Your Location</h3>
          <p>1556 Broadway, suite 416</p>
        </div>
        <Link to="order" className="big-button order-button">Find Charging Stations</Link>
      </div>
    );
  }
}

MainScreen.propTypes = {
  onMount: PropTypes.func.isRequired,
  coords: PropTypes.object,
  chargers: PropTypes.array
};


export default MainScreen;
