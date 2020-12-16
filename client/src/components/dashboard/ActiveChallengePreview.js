import React, { Component } from 'react';
import axios from 'axios';
import ActiveChallengeDetails from './ActiveChallengeDetails';

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

  notifier = () => {
    const today = this.state.challengeDay
    const thisProjectsTracker = this.props.challenge.tracker
    const streakStatusData = this.props.streakStatus(this.props.challenge.tracker, today)
    console.log({ streakStatusData });

    console.log(`thisProjectTracker ${thisProjectsTracker}, today ${today}`);
    console.log({ streakStatusData });
    console.log(`tracker today`, thisProjectsTracker[today - 1]);
    console.log(`current streak`, streakStatusData.currentStreak);
    console.log(`this.props.challenge.subGoals7DayStreak`, this.props.challenge.subGoals7DayStreak);

    //7-day streak
    if(thisProjectsTracker[today - 1] === 1 &&
      streakStatusData.currentStreak === 7 &&
      this.props.challenge.subGoals7DayStreak === false)
console.log(`7 day streak`);
this.props.challenge.subGoals7DayStreak = true;
//select prize
//show notification

//21-day streak
if(thisProjectsTracker[today - 1] === 1 &&
  streakStatusData.currentStreak === 21 &&
  this.props.challenge.subGoals21DayStreak === false)
console.log(`21-day streak`);
//select prize
//show notification

//half-way
if(thisProjectsTracker[today - 1] === 1 &&
  today >=15 &&
  this.props.challenge.notification15Days === false)
  console.log(`half way`);
  //show a notification
  
  //nearly there
if(thisProjectsTracker[today - 1] === 1 &&
  today >=28 &&
  this.props.challenge.notification28Days === false)
  console.log(`nearly there`);
  //show notification
  
  //completion
  if(today >= 30){
    if(streakStatusData.daysCompleted ===30){
      // show notification - WELL DONE!!
    } else {
      // show notification - hey, not bad!
      // reset and try again?
    }
  }
  };
    
  componentDidMount() {
    const challengeDay = this.props.calculateChallengeDay(this.props.challenge.startDate);
    console.log(`props@preview`, this.props);
    this.setState({
      challengeDay: challengeDay,
    })

  }

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
            notifier={this.notifier}
          />
        )}
        <button onClick={this.toggleChallengeDetails}>Details</button>
      </div>
    );

  }
}
