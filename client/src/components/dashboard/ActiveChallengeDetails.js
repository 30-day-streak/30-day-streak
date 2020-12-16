import React, { Component } from 'react';
import FullTracker from './FullTracker';
import './ActiveChallengeDetails.css';

export default class ActiveChallengeDetails extends Component {
  render() {
    console.log('props in active challange details', this.props.challenge);
    return (
      <div className="activeContainer">
        <p className="progress">Progress</p>
        <div className="active-challenge-details-user-info-container">
          {/* <div className="tracker-component"> */}
          <FullTracker
            challenge={this.props.challenge}
            user={this.props.user}
            key={this.props.challenge.id}
          />
          {/* </div> */}
          <div className="active-challenge-details-user-info-text">
            <p> Your current streak: </p>
            <p> Your longest streak: </p>
            <p> Days to go: </p>
          </div>
          <div className="active-challenge-details-prize">
            <p>EYES ON THE PRIZE: <br/>{this.props.challenge.grandPrize}</p>
          </div>
        </div>
      </div>
    );
  }
}
