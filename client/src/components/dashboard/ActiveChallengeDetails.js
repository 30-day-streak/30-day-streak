import React, { Component } from 'react';
import FullTracker from './FullTracker';

export default class ActiveChallengeDetails extends Component {
  
  render() {
    console.log(`details`, this.props);
    const {currentStreak, longestStreak} =this.props.streakStatus(this.props.challenge.tracker, this.props.challengeDay)
    console.log(`current streak ${currentStreak}, Longest streak ${longestStreak}`);
    const daysLeft = 30 - this.props.challengeDay
    
    // console.log('props in active challange details', this.props.challenge)
    return (
      <div className="activeContainer">
        <FullTracker 
        challenge={this.props.challenge} 
        user={this.props.user} 
        key={this.props.challenge.id}
        challengeDay={this.props.challengeDay}
        calculateChallengeDay={this.props.calculateChallengeDay}
        streakStatus={this.props.streakStatus}/>
        <p>Challenge started on:</p>
        <p>Challenge ends on:</p>
        <p> {daysLeft} days to go!</p>
        <p>Current streak: {currentStreak}</p>
        <p>Longest streak: {longestStreak}</p>
      </div>
    );
  }
}
