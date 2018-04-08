import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapItemDetailsContainer from '../containers/MapItemDetailsContainer.jsx';

class MapItemDetailsScreen extends Component {

  constructor(props){
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack(){
    this.props.history.goBack();
  }

  render(){
    return (
      <div id="vehicle-details-screen" className="screen">
        <button onClick={this.goBack} className="screen-background--dark" />
        <div className="modal-container">
          <div className="modal-box">
            <button onClick={this.goBack} className="modal-close-button">x</button>
            <MapItemDetailsContainer id={this.props.match.params.id} mapItemType={this.props.match.params.mapItemType}/>
          </div>
        </div>
      </div>
    );
  }
}

MapItemDetailsScreen.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default MapItemDetailsScreen;
