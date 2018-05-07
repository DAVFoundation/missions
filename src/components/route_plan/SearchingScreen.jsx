import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from '../../containers/LinkContainer.jsx';
import MapItemBidPreview from '../MapItemBidPreview.jsx';
import MapItemCard from '../MapItemCard.jsx';
import UserCardContainer from '../../containers/UserCardContainer.jsx';
import '../SearchingScreen.css';
import radar from '../../images/radar.png';
import RoutePlanBid from './RoutePlanBid.jsx';

class SearchingScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSortingOption: 'Best match',
      sortedBids: []
    };

    this.handleSortingOptionChange = this.handleSortingOptionChange.bind(this);
    this.returnSortedBids = this.returnSortedBids.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.stage === 'signing' && prevProps.stage !== 'signing') {
      this.screenNode.scrollTop = 0;
    }

    if (this.props.stage === 'choosing' && prevProps.stage !== 'choosing') {
      //run initial bid sort when bids have been received
      this.handleSortingOptionChange(this.state.selectedSortingOption);
    }
  }

  // This function is called from ChargingBidSelectionHeader when a
  // sorting option is chosen.
  handleSortingOptionChange(option) {
    this.setState({
      selectedSortingOption: option,
      sortedBids: this.returnSortedBids()
    });
  }

  returnSortedBids() {
    return this.props.bids;
  }

  render() {
    const {
      bids,
      captains,
      captainOnMission,
      stage,
      cancelSearch,
      chooseBid,
      missionId
    } = this.props;

    let screenClassNames = ['screen'];
    if (stage === 'choosing') screenClassNames.push('screen--stage-choosing');
    if (stage === 'signing') screenClassNames.push('screen--stage-signing');

    return (
      <div
        id="searching-screen"
        className={screenClassNames.join(' ')}
        ref={node => {
          this.screenNode = node;
        }}
      >
        {stage === 'searching' && (
          <div>
            <h1>Matching you with charging sations</h1>
            <Link
              to="/"
              className="med-button cancel-button"
              onClick={cancelSearch}
            >
              cancel
            </Link>
            <img src={radar} id="radar" />
            <div id="vehicle-bid-preview-cards">
              {bids.map(
                bid =>
                  captains[bid.provider_id] && (
                    <MapItemBidPreview
                      key={bid.id}
                      mapItem={captains[bid.provider_id]}
                    />
                  )
              )}
            </div>
          </div>
        )}

        <div id="vehicle-bid-cards">
          {this.state.sortedBids.map(
            bid =>
              captains[bid.provider_id] && (
                <RoutePlanBid
                  key={bid.id}
                  bid={bid}
                  routeProvider={captains[bid.provider_id]}
                  shown={stage === 'choosing'}
                  chooseBid={chooseBid}
                />
              )
          )}
        </div>

        <div className="screen-background--dark">
          {stage === 'signing' &&
          captainOnMission && (
              <div className="modal-container">
                <div id="signing-box" className="modal-box">
                  <h2>Initiating DAV Transaction</h2>
                  <p>Signing secure smart contract between:</p>
                  <MapItemCard
                    icon={captainOnMission.icon}
                    id={captainOnMission.id}
                    model={captainOnMission.model}
                  />
                  <div id="sign-here">
                    <img
                      src={'/images/signing.gif?' + missionId}
                      alt="Signing smart contract"
                    />
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
  captains: PropTypes.object.isRequired,
  captainOnMission: PropTypes.object,
  missionId: PropTypes.string,
  bids: PropTypes.array.isRequired,
  stage: PropTypes.string.isRequired,
  cancelSearch: PropTypes.func.isRequired,
  chooseBid: PropTypes.func.isRequired
};

export default SearchingScreen;
