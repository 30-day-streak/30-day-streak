import React, { Component } from 'react';
import axios from 'axios';
import ActiveChallengeDetails from './ActiveChallengeDetails';

export default class ActiveChallengePreview extends Component {
  state = {
    activeChallengeDetails: false,
  };

  toggleChallengeDetails = () => {
    this.setState((prevState) => ({
      activeChallengeDetails: !prevState.activeChallengeDetails,
    }));
  };

  render() {
    if (!this.props.challenge.id.title) {
      window.location.reload();
    } else {
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
            />
          )}          
          <button onClick={this.toggleChallengeDetails}>Details</button>
        </div>
      );
    }
  }
}
