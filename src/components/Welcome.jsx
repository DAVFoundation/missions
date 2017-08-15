import React from 'react';
import './Welcome.css';

let cards = {};

const changeCard = (nextCard) => {
  for (let card = 1; card <= 4; card++) {
    let cardNode = cards[`welcome_${card}`];
    if (card < nextCard) {
      cardNode.classList.remove('upcoming-card');
      cardNode.classList.add('previous-card');
    } else if (card > nextCard) {
      cardNode.classList.remove('previous-card');
      cardNode.classList.add('upcoming-card');
    } else {
      cardNode.classList.remove('previous-card', 'upcoming-card');
    }
  }
};

const Welcome = () => {
  return (
    <div id="welcome">
      <div className="welcome-card" id="welcome_1" ref={(card) => { cards['welcome_1'] = card; }}>
        <h1>Welcome to Missions by DAV</h1>
        <p>Missions lets you schedule package pickups via drones, robots, and other autonomous vehicles.</p>
        <button onClick={() => changeCard(2)}>&gt;</button>
      </div>
      <div className="welcome-card upcoming-card" id="welcome_2" ref={(card) => { cards['welcome_2'] = card; }}>
        <p>On our main screen you will see a map showing all the drones currently available for missions in your area.</p>
        <button onClick={() => changeCard(3)}>&gt;</button>
      </div>
      <div className="welcome-card upcoming-card" id="welcome_3" ref={(card) => { cards['welcome_3'] = card; }}>
        <p>Click the Order pickup button to order a drone to pickup a package and deliver it for you.</p>
        <button onClick={() => changeCard(4)}>&gt;</button>
      </div>
      <div className="welcome-card upcoming-card" id="welcome_4" ref={(card) => { cards['welcome_4'] = card; }}>
        <strong>Pssst...</strong>
        <p>Until our official launch, this app launches in simulation mode. In simulation mode there will always be a few simulated drones in your area available for missions. You can play around, order, track, and complete missions without creating a DAV user.</p>
        <p>Simulation mode is a great way for you to get a feel for the app, but more importantly, it is an awesome tool for developers to start building on the DAV Network without needing to invest in any hardware. Every part of the DAV stack is built to support both a simulation/development environment and the live one.</p>
        <p>You can switch to the live environment at any time from the settings screen.</p>
      </div>
    </div>
  );
};

export default Welcome;
