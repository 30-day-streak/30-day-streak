import React, { Component } from 'react';
import axios from 'axios';
import ActiveChallengeDetails from './ActiveChallengeDetails';

export default class ActiveChallengePreview extends Component {

  state = {
    challengeDay: 0
  }

  render() {

    return (
      <div className="active-preview">
        <div className="preview-title">
          <h5>{this.props.challenge.id.title}</h5>
        </div>
        {/* <div className="preview-tracker">
          <span>Tracker</span>
        </div> */}
        {/* <div className="preview-streak">
          <span>Streak</span>
        </div> */}
        <ActiveChallengeDetails
          challenge={this.props.challenge}
          user={this.props.user}
          challengeDay={this.state.challengeDay}
          calculateChallengeDay={this.props.calculateChallengeDay}
          streakStatus={this.props.streakStatus}
        />
      </div>
    );
  }
}
