import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from '../containers/LinkContainer.jsx';
import VehicleBid from './VehicleBid.jsx';
import VehicleBidPreview from './VehicleBidPreview.jsx';
import VehicleCard from './VehicleCard.jsx';
import UserCardContainer from '../containers/UserCardContainer.jsx';
import './SearchingScreen.css';
import radar from '../images/radar.png';
import sort_button from '../images/sort_button.svg';
import arrow_left from '../images/arrow-left.svg';
import x_button from '../images/x_button.svg';
// import check from '../images/check.svg';

class BidSelectionHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortOptionsOpen: false
    };

    this.handleSortButtonClick = this.handleSortButtonClick.bind(this);
    this.handleCloseButtonClick = this.handleCloseButtonClick.bind(this);
  }

  handleSortButtonClick() {
    console.log('sort button clicked');

    this.setState({ sortOptionsOpen: !this.state.sortOptionsOpen });
  }

  handleCloseButtonClick() {
    console.log('close button clicked');

    this.setState({ sortOptionsOpen: !this.state.sortOptionsOpen });
  }

  render() {
    let { sortOptionsOpen } = this.state;
    return (
      <div className="bid-selection-header-wrapper">
        <div
          className={
            'sort-options ' + (sortOptionsOpen ? 'sort-options--expand' : '')
          }
        >
          <div
            onClick={this.handleCloseButtonClick}
            className="sort-options__close-button"
          >
            <img src={x_button} alt="close button" />
          </div>
          <div className="sort-options__header">Sort by:</div>
          <ul className="sort-options__list">
            <li>Best match</li>
            <li>Fastest pickup</li>
            <li>Fastest delivery</li>
            <li>Lowest cost</li>
          </ul>
        </div>
        <div className="bid-selection-header">
          <div className="bid-selection-header__back-button">
            <img src={arrow_left} alt="back button" />
          </div>
          <div className="bid-selection-header__title">Bid Selection</div>
          <div
            onClick={this.handleSortButtonClick}
            className="bid-selection-header__sort-button"
          >
            <img src={sort_button} alt="sort button" />
          </div>
        </div>
      </div>
    );
  }
}

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
    console.log('props:  ', this.props);

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
        id="bid-selection"
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
                  vehicles[bid.vehicle_id] && (
                    <VehicleBidPreview
                      key={bid.id}
                      vehicle={vehicles[bid.vehicle_id]}
                    />
                  )
              )}
            </div>
          </div>
        )}

        <div id="vehicle-bid-cards">
          {stage === 'choosing' && <BidSelectionHeader />}
          {bids.map(
            bid =>
              vehicles[bid.vehicle_id] && (
                <VehicleBid
                  key={bid.id}
                  bid={bid}
                  vehicle={vehicles[bid.vehicle_id]}
                  shown={stage === 'choosing'}
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
                  <VehicleCard
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
  missionId: PropTypes.number,
  bids: PropTypes.array.isRequired,
  stage: PropTypes.string.isRequired,
  cancelSearch: PropTypes.func.isRequired,
  chooseBid: PropTypes.func.isRequired
};

export default SearchingScreen;
