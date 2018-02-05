import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from '../containers/LinkContainer.jsx';
import VehicleBid from './VehicleBid.jsx';
import VehicleBidPreview from './VehicleBidPreview.jsx';
import VehicleCard from './VehicleCard.jsx';
import UserCardContainer from '../containers/UserCardContainer.jsx';
import './SearchingScreen.css';
import radar from '../images/radar.png';

class SearchingScreen extends Component {

  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.stage === 'signing' && prevProps.stage !== 'signing') {
      this.screenNode.scrollTop = 0;
    }
  }

  render() {
    const { bids, vehicles, stage, cancelSearch, chooseBid, vehicleOnMission, missionId } = this.props;

    let screenClassNames = ['screen'];
    if (stage === 'choosing') screenClassNames.push('screen--stage-choosing');
    if (stage === 'signing')  screenClassNames.push('screen--stage-signing');

    return (
      <div id="searching-screen" className={screenClassNames.join(' ')} ref={node => { this.screenNode = node; }}>
        {stage === 'searching' && (
          <div>
            <h1>Matching you with autonomous vehicles</h1>
            <Link to="/" className="med-button cancel-button" onClick={cancelSearch}>cancel</Link>
            <img src={radar} id="radar" />
            <div id="vehicle-bid-preview-cards">
              {bids.map(bid => vehicles[bid.vehicle_id] && (
                <VehicleBidPreview key={bid.id} vehicle={vehicles[bid.vehicle_id]} />
              ))}
            </div>
          </div>
        )}

        <div id="vehicle-bid-cards">
          {bids.map(bid => vehicles[bid.vehicle_id] && (
            <VehicleBid key={bid.id} bid={bid} vehicle={vehicles[bid.vehicle_id]} shown={stage === 'choosing'} chooseBid={chooseBid} />
          ))}
        </div>

        <div className="screen-background--dark">
          {stage === 'signing' && vehicleOnMission && (
            <div className="modal-container">
              <div id="signing-box" className="modal-box">
                <h2>Initiating DAV Transaction</h2>
                <p>Signing secure smart contract between:</p>
                <VehicleCard icon={vehicleOnMission.icon} id={vehicleOnMission.id} model={vehicleOnMission.model} />
                <div id="sign-here">
                  <img src={'/images/signing.gif?'+missionId} alt="Signing smart contract" />
                </div>
                <UserCardContainer />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

SearchingScreen.propTypes = {
  vehicles: PropTypes.object.isRequired,
  vehicleOnMission: PropTypes.object,
  missionId: PropTypes.number,
  bids: PropTypes.array.isRequired,
  stage: PropTypes.string.isRequired,
  cancelSearch: PropTypes.func.isRequired,
  chooseBid: PropTypes.func.isRequired
};

export default SearchingScreen;
