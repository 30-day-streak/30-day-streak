import React, { Component } from 'react';
import axios from 'axios';
import ActiveChallengeDetails from './ActiveChallengeDetails';
import TrackerButton from './TrackerButton'

export default class ActiveChallengePreview extends Component {
  state = {
    challengeDay: 0,
    activeChallengeDetails: false,
  };

  toggleChallengeDetails = () => {
    this.setState((prevState) => ({
      activeChallengeDetails: !prevState.activeChallengeDetails,
    }));
  };

  render() {
    return (
      <div className="active-preview">
        <div className="preview-title">
          <h5>{this.props.challenge.id.title}</h5>
        </div>
        <p>{this.props.challenge.id.goal}</p>
        <p>
          {this.props.challenge.id.dailyTarget.description}{' '}
          {this.props.challenge.id.dailyTarget.number}{' '}
          {this.props.challenge.id.dailyTarget.unit}
        </p>
        <p>
          Today:
          </p>
        {this.state.activeChallengeDetails && (
          <ActiveChallengeDetails
            challenge={this.props.challenge}
            user={this.props.user}
            challengeDay={this.state.challengeDay}
            calculateChallengeDay={this.props.calculateChallengeDay}
            streakStatus={this.props.streakStatus}
          />
        )}
        <button onClick={this.toggleChallengeDetails}>Details</button>
      </div>
    );

  }
}
