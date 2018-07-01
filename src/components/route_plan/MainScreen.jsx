import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from '../../containers/LinkContainer.jsx';
import '../MainScreen.css';
import { getUserLocationPlace } from '../../lib/map';
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

  constructor () {
    super();
    this.state = {
      locationPlace: null
    };
  }

  componentDidMount() {
    this.props.onMount();
    getUserLocationPlace().then((res) => {
      this.setState({locationPlace: res});
    }).catch((res) => {
      console.log(res);
    });
  }
  render() {
    return (
      <div id="main-screen" className="screen">
        <div id="header">
          <div id="logo">
            <img src={logo} alt="Missions powered by DAV" />
          </div>
        </div>
        {
          this.state.locationPlace ?
            (<div className="user-location">
              <h3>Your Location</h3>
              <p>{this.state.locationPlace}</p>
            </div>) :
            (<div />)
        }
        <Link to="order" className="big-button order-button">ORDER ROUTE PLAN</Link>
      </div>
    );
  }
}

MainScreen.propTypes = {
  onMount: PropTypes.func.isRequired,
};


export default MainScreen;
