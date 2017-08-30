import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SearchingScreen.css';
import radar from '../images/radar.png';

class SearchingScreen extends Component {
  render() {
    return (
      <div id="searching-screen" className="screen">
        <h1>Matching you with autonomous vehicles</h1>
        <Link to="/" className="med-button cancel-button">cancel</Link>
        <img src={radar} id="radar" />
      </div>
    );
  }
}

export default SearchingScreen;
