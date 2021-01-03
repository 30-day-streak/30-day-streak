import React, { Component } from 'react';
import axios from 'axios';
import ActiveChallengeDetails from './ActiveChallengeDetails';
import TrackerButton from './TrackerButton';
import './Dashboard.css';

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

  checkStreak = (challengeDay) => {
    let streak = false
    for (let i = 0; i < challengeDay; i++) {
      if (this.props.challenge.tracker[i] !== 1) return streak = false
      else streak = true;
    }
    return streak
  }

  notifyMilestone = () => {
    console.log('here')
    const streak7Achieved = this.checkStreak(7)
    const streak21Achieved = this.checkStreak(21)
    const streak30Achieved = this.checkStreak(30)

    console.log('7', streak7Achieved, '21', streak21Achieved)
    // if (this.state.challengeDay === 7 && streak7Achieved)
  }

  componentDidMount() {
    const challengeDay = this.props.calculateChallengeDay(
      this.props.challenge.startDate
    );
    this.setState({
      challengeDay: challengeDay,
    });
  }

  handleChange = async (event) => {
    try {
      const target = event.target;
      const value = target.checked;
      const name = target.id;
      let challengeTracker = this.props.challenge.tracker;
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
        let userId = this.props.user._id;
        const updatedUser = await axios.put(`/api/users/${userId}`, {
          challenges: this.props.user.challenges,
          rewards: this.props.user.rewards,
        });
        this.props.setUser(updatedUser.data);
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
      this.setState({
        challengeDay: challengeDay,
        user: this.props.user,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {

    this.notifyMilestone()


    const challengeDay = this.state.challengeDay;
    const todayIndex = challengeDay - 1;

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
          {!this.state.activeChallengeDetails && (
            <div className="awesome-button">
              <p>
                Click below to <br /> log today:
              </p>
              <TrackerButton
                index={todayIndex}
                user={this.props.user}
                handleChange={this.handleChange}
                challenge={this.props.challenge}
                challengeDay={this.state.challengeDay}
              />
            </div>
          )}
        </div>
        {this.state.activeChallengeDetails && (
          <ActiveChallengeDetails
            challenge={this.props.challenge}
            user={this.props.user}
            challengeDay={this.state.challengeDay}
            calculateChallengeDay={this.props.calculateChallengeDay}
            streakStatus={this.props.streakStatus}
            notifier={this.notifier}
            setUser={this.props.setUser}
          />
        )}
        {!this.state.activeChallengeDetails && (
          <button className="button-dark" onClick={this.toggleChallengeDetails}>
            SHOW DETAILS
          </button>
        )}
        {this.state.activeChallengeDetails && (
          <button className="button-dark" onClick={this.toggleChallengeDetails}>
            HIDE DETAILS
          </button>
        )}
      </div>
    );
  }
}