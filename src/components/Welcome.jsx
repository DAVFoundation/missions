import React, { Component } from 'react';
import './Welcome.css';

class Welcome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      card: 1
    };
    this.changeCard.bind(this);
    this.getClassNamesForCard.bind(this);
  }

  changeCard(nextCard) {
    this.setState({card: nextCard});
  }

  getClassNamesForCard(cardId) {
    let classNames = ['welcome-card'];
    if (cardId < this.state.card) {
      classNames.push('previous-card');
    } else if (cardId > this.state.card) {
      classNames.push('upcoming-card');
    }
    return classNames.join(' ');
  }

  render() {
    return (
      <div id="welcome">
        <div className={this.getClassNamesForCard(1)}>
          <h1>Welcome to Missions by DAV</h1>
          <p>Missions lets you schedule package pickups via drones, robots, and other autonomous vehicles.</p>
          <button onClick={() => this.changeCard(2)}>&gt;</button>
        </div>
        <div className={this.getClassNamesForCard(2)}>
          <p>On our main screen you will see a map showing all the drones currently available for missions in your area.</p>
          <button onClick={() => this.changeCard(3)}>&gt;</button>
        </div>
        <div className={this.getClassNamesForCard(3)}>
          <p>Click the Order pickup button to order a drone to pickup a package and deliver it for you.</p>
          <button onClick={() => this.changeCard(4)}>&gt;</button>
        </div>
        <div className={this.getClassNamesForCard(4)}>
          <strong>Pssst...</strong>
          <p>Until our official launch, this app launches in simulation mode. In simulation mode there will always be a few simulated drones in your area available for missions. You can play around, order, track, and complete missions without creating a DAV user.</p>
          <p>Simulation mode is a great way for you to get a feel for the app, but more importantly, it is an awesome tool for developers to start building on the DAV Network without needing to invest in any hardware. Every part of the DAV stack is built to support both a simulation/development environment and the live one.</p>
          <p>You can switch to the live environment at any time from the settings screen.</p>
        </div>
      </div>
    );
  }
}

export default Welcome;
