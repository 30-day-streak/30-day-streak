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

  selectReward = () => {
    const rewards = this.props.user.rewards
    const chosenRewardIndex = Math.floor(Math.random() * rewards.length)
    return rewards[chosenRewardIndex];
  }

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
    if (thisProjectsTracker[today - 1] === 1 &&
      streakStatusData.currentStreak === 7 &&
      this.props.challenge.subGoals7DayStreak === false) {
      console.log(`7 day streak`);
      this.props.challenge.subGoals7DayStreak = true;
      let todaysReward = this.selectReward();
      return [7, todaysReward];
      //show notification
    }

    //half-way
    if (thisProjectsTracker[today - 1] === 1 &&
      today >= (15 || 16 || 17) &&
      this.props.challenge.notification15Days === false) {
      console.log(`half way`);
      this.props.challenge.notification15Days = true;
      return [7];
      //show a notification
    }

    //21-day streak
    if (thisProjectsTracker[today - 1] === 1 &&
      streakStatusData.currentStreak === 21 &&
      this.props.challenge.subGoals21DayStreak === false) {
      console.log(`21-day streak`);
      this.props.challenge.subGoals21DayStreak = true;
      let todaysReward = this.selectReward();
      return [21, todaysReward];
      //select prize
      //show notification
    }

    //nearly there
    if (thisProjectsTracker[today - 1] === 1 &&
      today === 28 &&
      this.props.challenge.notification28Days === false) {
      console.log(`nearly there`);
      this.props.challenge.notification15Days = true;
      return [28];
      //show notification
    }

    //completion
    if (today >= 30 && this.props.challenge.notificationComplete === false) {
      this.props.challenge.notificationComplete = true;
      if (streakStatusData.daysCompleted === 30) {
        return ["success"];
    } else{
      return["notQuite"];
    }
  };
}

  componentDidMount() {
    const challengeDay = this.props.calculateChallengeDay(this.props.challenge.startDate);
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
