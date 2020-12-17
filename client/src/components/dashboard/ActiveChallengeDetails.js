import React, { Component } from 'react';
import FullTracker from './FullTracker';
import './ActiveChallengeDetails.css';

export default class ActiveChallengeDetails extends Component {
  state = {
    refreshToggle: true,
  };

  refreshActiveChallengeDetails = () => {
    this.setState ({ refreshToggle: !this.state.refreshToggle });
  }

  render() {
    const { currentStreak, longestStreak } = this.props.streakStatus(
      this.props.challenge.tracker,
      this.props.challengeDay
    );

    const daysLeft = 30 - this.props.challengeDay;

    return (
      <div className="activeContainer">
        <p className="progress">Progress day {this.props.challengeDay}</p>
        <div className="active-challenge-details-user-info-container">
          {/* <div className="tracker-component"> */}
          <FullTracker
            challenge={this.props.challenge}
            user={this.props.user}
            key={this.props.challenge.id}
            challengeDay={this.props.challengeDay}
            calculateChallengeDay={this.props.calculateChallengeDay}
            refreshActiveChallengeDetails={this.refreshActiveChallengeDetails}
            notifier={this.props.notifier}
            streakStatus={this.props.streakStatus}
          />
          {/* </div> */}
          <div className="active-challenge-details-user-info-text">
            <p> {daysLeft} days to go!</p>
            <p>Current streak: {currentStreak}</p>
            <p>Longest streak: {longestStreak}</p>

            <div className="active-challenge-details-prize">
              <p>
                EYES ON THE PRIZE: <br />
                {this.props.challenge.grandPrize}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
