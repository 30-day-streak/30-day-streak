import React, { Component } from 'react';
import axios from 'axios';
import ActiveChallengeDetails from './ActiveChallengeDetails';

export default class ActiveChallengePreview extends Component {

  

  render() {
    if (!this.props.challenge.id.title) {
      window.location.reload()
    } 
    else {
    return (
      <div className="active-preview">
        <div className="preview-title">
          <h5>{this.props.challenge.id.title}</h5>
        </div>
        <p>{this.props.challenge.id.goal}</p>
        <p>{this.props.challenge.id.dailyTarget.description}</p>
        {/* <div className="preview-tracker">
          <span>Tracker</span>
        </div> */}
        {/* <div className="preview-streak">
          <span>Streak</span>
        </div> */}
        <ActiveChallengeDetails
          challenge={this.props.challenge}
          user={this.props.user}
        />
      </div>
    );
      }
  }
}
