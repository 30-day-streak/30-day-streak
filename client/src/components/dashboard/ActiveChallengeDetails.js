import React, { Component } from 'react';
import FullTracker from './FullTracker';
import './Dashboard.css';
import axios from 'axios';

export default class ActiveChallengeDetails extends Component {
  state = {
    refreshToggle: true,
  };

  refreshActiveChallengeDetails = () => {
    this.setState({ refreshToggle: !this.state.refreshToggle });
  };

  withdrawFromChallenge = async () => {
    try {
      const updatedUser = await axios.put(
        `/api/users/${this.props.challenge.id._id}/withdraw`
      );
      this.props.setUser(updatedUser.data);
      this.props.history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { currentStreak, longestStreak } = this.props.streakStatus(
      this.props.challenge.tracker,
      this.props.challengeDay
    );

    const daysLeft = 30 - this.props.challengeDay;

    return (
      <div className="activeContainer">
        <div className="active-challenge-details-user-info-container">
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
          <div className="active-challenge-details-user-info-text">
            <div className="days-left-and-prize">
              <div className="days-left">
                {' '}
                <h1>{daysLeft}</h1> days to go!{' '}
              </div>
              <div className="active-challenge-details-prize">
                <p>Eyes on the prize: </p>
                <div className="prize">
                  <b>{this.props.challenge.grandPrize}</b>
                </div>
              </div>
            </div>
            <div className="streak-info-details">
              <p>
                Current streak: <b>{currentStreak}</b>
              </p>
              <p>
                Longest streak: <b>{longestStreak}</b>
              </p>
            </div>
            <button
              className="button-dark loser-button"
              onClick={this.withdrawFromChallenge}
            >
              I GIVE UP{' '}
              <img
                src="./images/loserEmoji.png"
                alt="loser image"
                width="40px"
              />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
