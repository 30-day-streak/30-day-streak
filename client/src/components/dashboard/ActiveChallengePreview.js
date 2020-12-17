import React, { Component } from 'react';
import axios from 'axios';
import ActiveChallengeDetails from './ActiveChallengeDetails';
import TrackerButton from './TrackerButton';
import './ActiveChallengePreview.css';

export default class ActiveChallengePreview extends Component {
  state = {
    challengeDay: 0,
    activeChallengeDetails: false,
    user: '',
  };

  toggleChallengeDetails = () => {
    this.setState((prevState) => ({
      activeChallengeDetails: !prevState.activeChallengeDetails,
    }));
  };

  selectReward = () => {
    const rewards = this.props.user.rewards;
    const chosenRewardIndex = Math.floor(Math.random() * rewards.length);
    return rewards[chosenRewardIndex];
  };

  notifier = () => {
    const today = this.state.challengeDay;
    const thisProjectsTracker = this.props.challenge.tracker;
    const streakStatusData = this.props.streakStatus(
      this.props.challenge.tracker,
      today
    );
    // console.log({ streakStatusData });

    // console.log(`thisProjectTracker ${thisProjectsTracker}, today ${today}`);
    // console.log({ streakStatusData });
    // console.log(`tracker today`, thisProjectsTracker[today - 1]);
    // console.log(`current streak`, streakStatusData.currentStreak);
    // console.log(`this.props.challenge.subGoals7DayStreak`, this.props.challenge.subGoals7DayStreak);

    //7-day streak
    if (
      thisProjectsTracker[today - 1] === 1 &&
      streakStatusData.currentStreak === 7 &&
      this.props.challenge.subGoals7DayStreak === false
    ) {
      console.log(`7 day streak`);
      this.props.challenge.subGoals7DayStreak = true;
      let todaysReward = this.selectReward();
      return [7, todaysReward];
      //show notification
    }

    //half-way
    if (
      thisProjectsTracker[today - 1] === 1 &&
      today >= (15 || 16 || 17) &&
      this.props.challenge.notification15Days === false
    ) {
      console.log(`half way`);
      this.props.challenge.notification15Days = true;
      return [7];
      //show a notification
    }

    //21-day streak
    if (
      thisProjectsTracker[today - 1] === 1 &&
      streakStatusData.currentStreak === 21 &&
      this.props.challenge.subGoals21DayStreak === false
    ) {
      console.log(`21-day streak`);
      this.props.challenge.subGoals21DayStreak = true;
      let todaysReward = this.selectReward();
      return [21, todaysReward];
      //select prize
      //show notification
    }

    //nearly there
    if (
      thisProjectsTracker[today - 1] === 1 &&
      today === 28 &&
      this.props.challenge.notification28Days === false
    ) {
      console.log(`nearly there`);
      this.props.challenge.notification15Days = true;
      return [28];
      //show notification
    }

    //completion
    if (today >= 30 && this.props.challenge.notificationComplete === false) {
      this.props.challenge.notificationComplete = true;
      if (streakStatusData.daysCompleted === 30) {
        return ['success'];
      } else {
        return ['notQuite'];
      }
    }
  };

  withdrawFromChallenge = async () => {
    try {
      const updatedUser = await axios.put(`/api/users/${this.props.challenge.id._id}/withdraw`)
      this.props.setUser(updatedUser.data)
      console.log('updated user data', updatedUser.data);
      console.log(this.props.setUser);
      this.props.history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = async (event) => {
    try {
      const target = event.target;
      const value = target.checked;
      const name = target.id;
      // console.log('target', target, 'value', value, 'name', name);
      let challengeTracker = this.props.challenge.tracker;
      console.log('challenge tracker from one button', challengeTracker);
      let index = target.id;
      if (event.target.id < this.state.challengeDay) {
        if (challengeTracker[index] === 0) {
          challengeTracker[index]++;
        } else if (challengeTracker[index] === 1) {
          challengeTracker[index]++;
        } else {
          challengeTracker[index]--;
        }
        this.setState({
          [name]: value,
        });
        let userId = this.state.user._id;
        const updatedUser = await axios.put(`/api/users/${userId}`, {
          challenges: this.state.user.challenges,
          rewards: this.state.user.rewards,
        });
        // const refresh = this.props.refreshActiveChallengeDetails()
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount = async () => {
    try {
      const challengeDay = this.props.calculateChallengeDay(
        this.props.challenge.startDate
      );
      // console.log({challengeDay});
      // console.log('updated user from mount', updatedUser.data);
      this.setState({
        challengeDay: challengeDay,
        user: this.props.user,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // componentDidUpdate(prevProps) {
  //   console.log('prev props from active challenge preview', prevProps);
  // }

  render() {
    // console.log('user challenges at render', this.props.user.challenges);
    // console.log('challenge props from render', this.props.challenge)
    const challengeDay = this.state.challengeDay;
    const todayIndex = challengeDay - 1;
    // if (!this.props.challenge.id.title) {
    //   window.location.reload(false);
    // } else {
    // console.log('props from preview ');
    return (
      <div className="active-preview">
        <div className="active-preview-no-button">
          <div className="preview-challenge-info">
            <h5>{this.props.challenge.id.title}</h5>
            <p>{this.props.challenge.id.goal}</p>
            <p>
              {this.props.challenge.id.dailyTarget.description}
              {this.props.challenge.id.dailyTarget.number}
              {this.props.challenge.id.dailyTarget.unit}
            </p>
          </div>
          <div className="awesome-button">
            <p>
              Click below to <br /> log today:{' '}
            </p>
            <TrackerButton
              index={todayIndex}
              user={this.props.user}
              handleChange={this.handleChange}
              challenge={this.props.challenge}
              challengeDay={this.state.challengeDay}
            />
          </div>
        </div>
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
        {!this.state.activeChallengeDetails && (
          <button className="button-dark" onClick={this.toggleChallengeDetails}>
            show details
          </button>
        )}
        {this.state.activeChallengeDetails && (
          <button className="button-light" onClick={this.withdrawFromChallenge}>
            i give up, i'm a bit fat looser
          </button>
        )}
        {this.state.activeChallengeDetails && (
          <button className="button-dark" onClick={this.toggleChallengeDetails}>
            hide details
          </button>
        )}
      </div>
    );
  }
}
// }
