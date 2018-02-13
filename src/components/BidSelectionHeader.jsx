import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './BidSelectionHeader.css';
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

BidSelectionHeader.propTypes = {
  vehicles: PropTypes.object.isRequired,
  vehicleOnMission: PropTypes.object,
  missionId: PropTypes.number,
  bids: PropTypes.array.isRequired,
  stage: PropTypes.string.isRequired,
  cancelSearch: PropTypes.func.isRequired,
  chooseBid: PropTypes.func.isRequired
};

export default BidSelectionHeader;
