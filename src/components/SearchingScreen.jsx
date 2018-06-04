import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from '../containers/LinkContainer.jsx';
import VehicleBid from './VehicleBid.jsx';
import MapItemBidPreview from './MapItemBidPreview.jsx';
import MapItemCard from './MapItemCard.jsx';
import UserCardContainer from '../containers/UserCardContainer.jsx';
import BidSelectionHeader from '../components/BidSelectionHeader.jsx';
import './SearchingScreen.css';
import radar from '../images/radar.png';

class SearchingScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSortingOption: 'Best match',
      sortedBids: []
    };

    this.animateBidsUp = this.animateBidsUp.bind(this);
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

  // This function is called from BidSelectionHeader when a
  // sorting option is chosen.
  handleSortingOptionChange(option) {
    this.setState((state, props) => ({
      selectedSortingOption: option,
      sortedBids: this.returnSortedBids(props, option)
    }));
    this.animateBidsUp();
  }

  returnSortedBids(props, option) {
    /* eslint-disable indent */

    switch (option) {
      case 'Best match': {
        // sort on 'time_to_pickup', if bids have similar pickup time, show
        // the lowest price first
        return props.bids.sort((a, b) => {
          //convert 'time_to_pickup' to minutes
          let timeToPickupMinutes_A = Math.ceil(a.time_to_pickup / 60000);
          let timeToPickupMinutes_B = Math.ceil(b.time_to_pickup / 60000);

          if (timeToPickupMinutes_A < timeToPickupMinutes_B) {
            return -1;
          } else if (timeToPickupMinutes_A > timeToPickupMinutes_B) {
            return 1;
          } else {
            //time to pickup in minutes is equal - compare by price
            return parseFloat(a.price) - parseFloat(b.price);
          }
        });
      }
      case 'Fastest pickup': {
        //sort on 'time_to_pickup'
        return props.bids.sort(
          (a, b) => parseFloat(a.time_to_pickup) - parseFloat(b.time_to_pickup)
        );
      }
      case 'Fastest delivery': {
        //sort on 'time_to_dropoff'
        return props.bids.sort(
          (a, b) =>
            parseFloat(a.time_to_dropoff) - parseFloat(b.time_to_dropoff)
        );
      }
      case 'Lowest cost': {
        //sort on 'price'
        return this.props.bids.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
      }
      default:
        return this.props.bids;
    }
    /* eslint-enable indent */
  }

  animateBidsUp (){
    setTimeout(() => this.setState({showBids: true}));
  }

  render() {
    const {
      bids,
      vehicles,
      stage,
      cancelSearch,
      chooseBid,
      vehicleOnMission,
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
            <h1>Matching you with autonomous vehicles</h1>
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
                  vehicles[bid.captain_id] && (
                    <MapItemBidPreview
                      key={bid.id}
                      mapItem={vehicles[bid.captain_id]}
                    />
                  )
              )}
            </div>
          </div>
        )}

        <div id="vehicle-bid-cards">
          {stage === 'choosing' && (
            <BidSelectionHeader
              {...this.props}
              handleSortingOptionChange={this.handleSortingOptionChange}
            />
          )}
          {this.state.sortedBids.map(
            bid =>
              vehicles[bid.captain_id] && (
                <VehicleBid
                  key={bid.id}
                  bid={bid}
                  vehicle={vehicles[bid.captain_id]}
                  shown={this.state.showBids}
                  chooseBid={chooseBid}
                />
              )
          )}
        </div>

        <div className="screen-background--dark">
          {stage === 'signing' &&
          vehicleOnMission && (
            <div className="modal-container">
              <div id="signing-box" className="modal-box">
                <h2>Initiating DAV Transaction</h2>
                <p>Signing secure smart contract between:</p>
                <MapItemCard
                  icon={vehicleOnMission.icon}
                  id={vehicleOnMission.id}
                  model={vehicleOnMission.model}
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
  vehicles: PropTypes.object.isRequired,
  vehicleOnMission: PropTypes.object,
  missionId: PropTypes.string,
  bids: PropTypes.array.isRequired,
  stage: PropTypes.string.isRequired,
  cancelSearch: PropTypes.func.isRequired,
  chooseBid: PropTypes.func.isRequired
};

export default SearchingScreen;
