import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './BidSelectionHeader.css';
import sort_button from '../images/sort_button.svg';
import arrow_left from '../images/arrow-left.svg';
import x_button from '../images/x_button.svg';
import check from '../images/check.svg';

class BidSelectionHeader extends Component {
  constructor(props) {
    super(props);

    this.sortOptions = {
      bestMatch: 'Best match',
      fastestPickup: 'Fastest pickup',
      fastestDelivery: 'Fastest delivery',
      lowestCost: 'Lowest cost'
    };

    this.state = {
      sortOptionsOpen: false,
      sortOptionSelected: this.sortOptions.bestMatch
    };

    this.handleSortButtonClick = this.handleSortButtonClick.bind(this);
    this.handleCloseButtonClick = this.handleCloseButtonClick.bind(this);
    this.handleSortOptionClick = this.handleSortOptionClick.bind(this);
  }

  handleSortButtonClick() {
    this.setState({ sortOptionsOpen: !this.state.sortOptionsOpen });
  }

  handleCloseButtonClick() {
    this.setState({ sortOptionsOpen: !this.state.sortOptionsOpen });
  }

  handleSortOptionClick(e) {
    //call function in SearchingScreen, passing in
    //selected sort option

    this.setState({
      sortOptionSelected: e.target.title,
      sortOptionsOpen: !this.state.sortOptionsOpen
    });
  }

  render() {
    let { sortOptionsOpen, sortOptionSelected } = this.state;
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
            <li
              title={this.sortOptions.bestMatch}
              className={
                sortOptionSelected === this.sortOptions.bestMatch
                  ? 'sort-options__list--selected'
                  : ''
              }
              onClick={this.handleSortOptionClick}
            >
              Best match
              {sortOptionSelected === this.sortOptions.bestMatch ? (
                <img src={check} alt="checkmark" />
              ) : (
                <img
                  className="sort-options__checkmark--hide"
                  src={check}
                  alt="checkmark"
                />
              )}
            </li>
            <li
              title={this.sortOptions.fastestPickup}
              className={
                sortOptionSelected === this.sortOptions.fastestPickup
                  ? 'sort-options__list--selected'
                  : ''
              }
              onClick={this.handleSortOptionClick}
            >
              Fastest pickup
              {sortOptionSelected === this.sortOptions.fastestPickup ? (
                <img src={check} alt="checkmark" />
              ) : (
                <img
                  className="sort-options__checkmark--hide"
                  src={check}
                  alt="checkmark"
                />
              )}
            </li>
            <li
              title={this.sortOptions.fastestDelivery}
              className={
                sortOptionSelected === this.sortOptions.fastestDelivery
                  ? 'sort-options__list--selected'
                  : ''
              }
              onClick={this.handleSortOptionClick}
            >
              Fastest delivery
              {sortOptionSelected === this.sortOptions.fastestDelivery ? (
                <img src={check} alt="checkmark" />
              ) : (
                <img
                  className="sort-options__checkmark--hide"
                  src={check}
                  alt="checkmark"
                />
              )}
            </li>
            <li
              title={this.sortOptions.lowestCost}
              className={
                sortOptionSelected === 'lowestCost'
                  ? 'sort-options__list--selected'
                  : ''
              }
              onClick={this.handleSortOptionClick}
            >
              Lowest cost
              {sortOptionSelected === this.sortOptions.lowestCost ? (
                <img src={check} alt="checkmark" />
              ) : (
                <img
                  className="sort-options__checkmark--hide"
                  src={check}
                  alt="checkmark"
                />
              )}
            </li>
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
